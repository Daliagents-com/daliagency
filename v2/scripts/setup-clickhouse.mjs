#!/usr/bin/env node
/**
 * Provision ClickHouse Cloud for Dali product analytics, apply schema, push Vercel env.
 *
 * Auth (need one):
 *   export CLICKHOUSE_CLOUD_API_KEY=...
 *   export CLICKHOUSE_CLOUD_API_SECRET=...
 *   # or: clickhousectl cloud auth login --api-key X --api-secret Y
 *
 * Usage:
 *   node scripts/setup-clickhouse.mjs
 *   node scripts/setup-clickhouse.mjs --skip-vercel
 *   node scripts/setup-clickhouse.mjs --service-name dali-analytics --region eu-central-1
 *
 * What it does:
 *   1. Ensure cloud service exists (create if missing)
 *   2. Wait until running
 *   3. Apply src/lib/analytics/schema.sql
 *   4. Smoke-insert + SELECT
 *   5. Set CLICKHOUSE_* on Vercel project (production + preview)
 */
import { spawnSync } from "node:child_process";
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const schemaPath = resolve(root, "src/lib/analytics/schema.sql");

const args = new Set(process.argv.slice(2));
const skipVercel = args.has("--skip-vercel");
const dryRun = args.has("--dry-run");

function flagValue(name, fallback) {
  const idx = process.argv.indexOf(name);
  if (idx === -1 || !process.argv[idx + 1]) return fallback;
  return process.argv[idx + 1];
}

const serviceName = flagValue("--service-name", "dali-analytics");
const region = flagValue("--region", "eu-central-1");
const provider = flagValue("--provider", "aws");

function which(bin) {
  const r = spawnSync("which", [bin], { encoding: "utf8" });
  return r.status === 0 ? r.stdout.trim() : "";
}

const chctl =
  which("clickhousectl") ||
  which("chctl") ||
  `${process.env.HOME}/.local/bin/clickhousectl`;

if (!existsSync(chctl) && !which("clickhousectl")) {
  console.error(
    "clickhousectl not found. Install: curl -fsSL https://clickhouse.com/cli | sh",
  );
  process.exit(1);
}

function run(cmd, cmdArgs, opts = {}) {
  const r = spawnSync(cmd, cmdArgs, {
    encoding: "utf8",
    cwd: root,
    env: process.env,
    ...opts,
  });
  if (r.status !== 0 && !opts.allowFail) {
    const err = (r.stderr || r.stdout || "").trim();
    throw new Error(`${cmd} ${cmdArgs.join(" ")} failed:\n${err}`);
  }
  return {
    status: r.status ?? 1,
    stdout: (r.stdout || "").trim(),
    stderr: (r.stderr || "").trim(),
  };
}

function ch(...cmdArgs) {
  return run(chctl, ["cloud", ...cmdArgs, "--json"], { allowFail: true });
}

function parseJson(text, label) {
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(`Failed to parse JSON from ${label}:\n${text.slice(0, 500)}`);
  }
}

function ensureAuth() {
  const status = ch("auth", "status");
  if (status.status !== 0) {
    throw new Error(
      "Auth check failed. Set CLICKHOUSE_CLOUD_API_KEY + CLICKHOUSE_CLOUD_API_SECRET\n" +
        "Create keys: https://console.clickhouse.cloud/ → Organization → API Keys (Admin)\n" +
        status.stderr ||
        status.stdout,
    );
  }
  const rows = parseJson(status.stdout || "[]", "auth status");
  const api = Array.isArray(rows)
    ? rows.find((r) => r.type === "API key" || r.type === "Env vars")
    : null;
  const ok =
    process.env.CLICKHOUSE_CLOUD_API_KEY &&
    process.env.CLICKHOUSE_CLOUD_API_SECRET;
  if (!ok) {
    const active = rows.some(
      (r) =>
        (r.type === "API key" || r.type === "Env vars") &&
        String(r.status).toLowerCase().includes("config"),
    );
    // clickhousectl status wording varies; require env or successful org list
    const org = ch("org", "list");
    if (org.status !== 0) {
      console.error(org.stderr || org.stdout);
      throw new Error(
        "Need ClickHouse Cloud API key auth (OAuth is read-only).\n" +
          "1) console.clickhouse.cloud → API Keys → create Admin key\n" +
          "2) export CLICKHOUSE_CLOUD_API_KEY=...\n" +
          "   export CLICKHOUSE_CLOUD_API_SECRET=...\n" +
          "3) re-run: node scripts/setup-clickhouse.mjs",
      );
    }
  } else {
    const org = ch("org", "list");
    if (org.status !== 0) {
      throw new Error(
        `API key rejected:\n${org.stderr || org.stdout}`,
      );
    }
  }
  console.log("✓ ClickHouse Cloud auth OK");
}

function listServices() {
  const r = ch("service", "list");
  if (r.status !== 0) {
    throw new Error(`service list failed:\n${r.stderr || r.stdout}`);
  }
  const data = parseJson(r.stdout || "[]", "service list");
  return Array.isArray(data) ? data : data.services || data.result || [];
}

function ensureService() {
  const services = listServices();
  let svc = services.find(
    (s) =>
      s.name === serviceName ||
      s.serviceName === serviceName ||
      (s.name || "").includes("dali"),
  );

  if (svc) {
    console.log(`✓ Using existing service: ${svc.name || svc.serviceName} (${svc.id || svc.serviceId})`);
    return { service: svc, password: null, created: false };
  }

  if (dryRun) {
    console.log(`[dry-run] would create service ${serviceName}`);
    process.exit(0);
  }

  console.log(`Creating service ${serviceName} (${provider}/${region})...`);
  const created = ch(
    "service",
    "create",
    "--name",
    serviceName,
    "--provider",
    provider,
    "--region",
    region,
    "--idle-scaling",
    "true",
    "--ip-allow",
    "0.0.0.0/0",
    "--min-replica-memory-gb",
    "8",
    "--max-replica-memory-gb",
    "8",
    "--num-replicas",
    "1",
  );

  if (created.status !== 0) {
    throw new Error(`service create failed:\n${created.stderr || created.stdout}`);
  }

  const payload = parseJson(created.stdout || "{}", "service create");
  const password =
    payload.password ||
    payload.defaultPassword ||
    payload.credentials?.password ||
    null;
  const id = payload.id || payload.serviceId || payload.service?.id;
  if (!id) {
    throw new Error(`create response missing id:\n${created.stdout}`);
  }
  if (password) {
    console.log("✓ Service created (save password from output if needed)");
  } else {
    console.log("✓ Service created (password not in response — will reset)");
  }

  return {
    service: { id, name: serviceName, ...payload },
    password,
    created: true,
  };
}

function waitRunning(serviceId, timeoutMs = 10 * 60 * 1000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const r = ch("service", "get", serviceId);
    if (r.status === 0) {
      const s = parseJson(r.stdout || "{}", "service get");
      const state = (s.state || s.status || s.serviceState || "").toLowerCase();
      console.log(`  state: ${state || "unknown"}`);
      if (state === "running" || state === "idle" || state === "awake") {
        return s;
      }
      if (state.includes("fail") || state.includes("terminat")) {
        throw new Error(`Service entered bad state: ${state}`);
      }
    }
    spawnSync("sleep", ["8"]);
  }
  throw new Error("Timed out waiting for service to run");
}

function extractHost(service) {
  return (
    service.endpoints?.https?.host ||
    service.endpoints?.https?.hostname ||
    service.host ||
    service.httpsEndpoint?.host ||
    (Array.isArray(service.endpoints)
      ? service.endpoints.find((e) => e.protocol === "https" || e.type === "https")
          ?.host
      : null) ||
    null
  );
}

function resetPassword(serviceId) {
  const r = ch("service", "reset-password", serviceId);
  if (r.status !== 0) {
    throw new Error(`reset-password failed:\n${r.stderr || r.stdout}`);
  }
  const payload = parseJson(r.stdout || "{}", "reset-password");
  const password =
    payload.password ||
    payload.defaultPassword ||
    payload.credentials?.password;
  if (!password) {
    throw new Error(`No password in reset response:\n${r.stdout}`);
  }
  return password;
}

function applySchema(serviceId, password) {
  if (!existsSync(schemaPath)) {
    throw new Error(`Missing schema: ${schemaPath}`);
  }
  const sql = readFileSync(schemaPath, "utf8")
    // Strip pure comment-only lines for cleaner multi-statement handling
    .split("\n")
    .filter((line) => !line.trim().startsWith("--"))
    .join("\n");

  // Take first statement (CREATE TABLE)
  const createStmt = sql
    .split(";")
    .map((s) => s.trim())
    .filter(Boolean)
    .find((s) => /CREATE\s+TABLE/i.test(s));

  if (!createStmt) {
    throw new Error("No CREATE TABLE found in schema.sql");
  }

  const r = ch(
    "service",
    "query",
    serviceId,
    "--password",
    password,
    "--query",
    createStmt,
  );
  if (r.status !== 0) {
    // If table exists, query endpoint might error differently - try SHOW TABLES
    console.warn("CREATE via query API failed, detail:", r.stderr || r.stdout);
    throw new Error(`schema apply failed:\n${r.stderr || r.stdout}`);
  }
  console.log("✓ Schema applied (web_events)");
}

function smokeTest(serviceId, password) {
  const insert = `
INSERT INTO web_events (event_name, session_id, path, locale, source, props, vercel_env)
VALUES ('setup_smoke', 'setup', '/setup', 'en', 'setup-script', '{}', 'setup')
`.trim();

  const ins = ch(
    "service",
    "query",
    serviceId,
    "--password",
    password,
    "--query",
    insert,
  );
  if (ins.status !== 0) {
    throw new Error(`smoke insert failed:\n${ins.stderr || ins.stdout}`);
  }

  const sel = ch(
    "service",
    "query",
    serviceId,
    "--password",
    password,
    "--query",
    "SELECT event_name, count() AS n FROM web_events GROUP BY event_name ORDER BY n DESC LIMIT 10",
  );
  if (sel.status !== 0) {
    throw new Error(`smoke select failed:\n${sel.stderr || sel.stdout}`);
  }
  console.log("✓ Smoke query OK");
  if (sel.stdout) console.log(sel.stdout.slice(0, 400));
}

function setVercelEnv(url, password) {
  if (skipVercel) {
    console.log("Skipping Vercel env (--skip-vercel)");
    return;
  }
  if (!which("vercel")) {
    console.warn("vercel CLI not found — print env for manual add:");
    printEnv(url, password);
    return;
  }

  const pairs = [
    ["CLICKHOUSE_URL", url],
    ["CLICKHOUSE_USER", "default"],
    ["CLICKHOUSE_PASSWORD", password],
    ["CLICKHOUSE_DATABASE", "default"],
    ["CLICKHOUSE_EVENTS_TABLE", "web_events"],
  ];

  for (const [key, value] of pairs) {
    // Remove existing to allow overwrite (vercel env add is interactive / fails if exists)
    run("vercel", ["env", "rm", key, "production", "--yes"], { allowFail: true });
    run("vercel", ["env", "rm", key, "preview", "--yes"], { allowFail: true });

    for (const env of ["production", "preview"]) {
      const r = spawnSync(
        "vercel",
        ["env", "add", key, env, "--sensitive"],
        {
          input: `${value}\n`,
          encoding: "utf8",
          cwd: root,
          env: process.env,
        },
      );
      if (r.status !== 0) {
        // fallback without --sensitive for older CLI
        const r2 = spawnSync(
          "vercel",
          ["env", "add", key, env],
          {
            input: `${value}\n`,
            encoding: "utf8",
            cwd: root,
            env: process.env,
          },
        );
        if (r2.status !== 0) {
          console.error(
            `Failed to set ${key} for ${env}:`,
            (r2.stderr || r2.stdout || r.stderr || "").slice(0, 300),
          );
          continue;
        }
      }
      console.log(`✓ Vercel env ${key} → ${env}`);
    }
  }
}

function printEnv(url, password) {
  console.log("\n--- Add to Vercel (Settings → Environment Variables) ---");
  console.log(`CLICKHOUSE_URL=${url}`);
  console.log("CLICKHOUSE_USER=default");
  console.log(`CLICKHOUSE_PASSWORD=${password}`);
  console.log("CLICKHOUSE_DATABASE=default");
  console.log("CLICKHOUSE_EVENTS_TABLE=web_events");
  console.log("-------------------------------------------------------\n");
}

async function main() {
  console.log("Dali ClickHouse setup\n");
  ensureAuth();

  const { service, password: createdPassword } = ensureService();
  const serviceId = service.id || service.serviceId;
  const running = waitRunning(serviceId);
  const host = extractHost(running) || extractHost(service);
  if (!host) {
    throw new Error(
      `Could not resolve HTTPS host from service. Dump:\n${JSON.stringify(running, null, 2).slice(0, 800)}`,
    );
  }
  const url = host.startsWith("http") ? host : `https://${host}:8443`;

  let password = createdPassword || process.env.CLICKHOUSE_PASSWORD || "";
  if (!password) {
    console.log("Resetting default password to capture credentials...");
    password = resetPassword(serviceId);
  }

  applySchema(serviceId, password);
  smokeTest(serviceId, password);
  setVercelEnv(url, password);

  // Local convenience file (gitignored via .env.*)
  const localEnv = [
    `CLICKHOUSE_URL=${url}`,
    "CLICKHOUSE_USER=default",
    `CLICKHOUSE_PASSWORD=${password}`,
    "CLICKHOUSE_DATABASE=default",
    "CLICKHOUSE_EVENTS_TABLE=web_events",
    "",
  ].join("\n");
  const { writeFileSync } = await import("node:fs");
  writeFileSync(resolve(root, ".env.clickhouse.local"), localEnv, { mode: 0o600 });
  console.log("✓ Wrote .env.clickhouse.local (gitignored pattern .env.*)");

  printEnv(url, password);
  console.log("Next: vercel --prod  (or redeploy) so runtime picks up env.");
  console.log("Done.");
}

main().catch((err) => {
  console.error("\n" + (err instanceof Error ? err.message : err));
  process.exit(1);
});
