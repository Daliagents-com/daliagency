// Purpose: Services bento composer mock (type → send → reply).
// Engine: Framer animate via createMockPlayer (no GSAP).
"use client";

import {
  IN_OUT,
  OUT,
  SNAP,
  SOFT,
  createMockPlayer,
  useMockLoop,
  type MockPlayer,
} from "../motionShared";
import styles from "../../DesignSprints.module.css";

const TYPE_PROMPT = "Draft a follow-up for Maya";
const TYPE_REPLY =
  "Hi Maya - following up on the demo. Happy to share next steps.";

function buildComposer(root: HTMLElement): MockPlayer | null {
  const typeEl = root.querySelector<HTMLElement>("[data-type]");
  const replyEl = root.querySelector<HTMLElement>("[data-reply]");
  const replyWrap = root.querySelector<HTMLElement>("[data-replywrap]");
  const tools = Array.from(root.querySelectorAll<HTMLElement>("[data-tool]"));
  const caret = root.querySelector<HTMLElement>("[data-caret]");
  const send = root.querySelector<HTMLElement>("[data-send]");
  if (!typeEl || !replyEl || !replyWrap) return null;

  const typeTo = async (
    el: HTMLElement,
    full: string,
    seconds: number,
    ctx: Parameters<Parameters<typeof createMockPlayer>[0]>[0],
  ) => {
    el.textContent = "";
    const state = { i: 0 };
    await ctx.animate(
      state,
      { i: full.length },
      {
        duration: seconds,
        ease: OUT,
        onUpdate: () => {
          el.textContent = full.slice(0, Math.round(state.i));
        },
      },
    );
  };

  const reset = () => {
    typeEl.textContent = "";
    typeEl.style.opacity = "1";
    replyEl.textContent = "";
    replyWrap.style.opacity = "0";
    replyWrap.style.transform = "translateY(10px) scale(0.97)";
    tools.forEach((t) => {
      t.style.opacity = "0";
      t.style.transform = "translateY(8px) scale(0.96)";
    });
    if (caret) caret.style.opacity = "1";
    if (send) {
      send.style.transform = "scale(1)";
      send.style.backgroundColor = "rgba(255,255,255,0.1)";
    }
  };

  const finish = () => {
    typeEl.textContent = "";
    typeEl.style.opacity = "1";
    replyEl.textContent = TYPE_REPLY;
    replyWrap.style.opacity = "1";
    replyWrap.style.transform = "translateY(0) scale(1)";
    tools.forEach((t) => {
      t.style.opacity = "1";
      t.style.transform = "translateY(0) scale(1)";
    });
    if (caret) caret.style.opacity = "0.35";
    if (send) {
      send.style.transform = "scale(1)";
      send.style.backgroundColor = "rgba(255,255,255,0.1)";
    }
  };

  return createMockPlayer(
    async (ctx) => {
      await ctx.sleep(0.2);
      await typeTo(typeEl, TYPE_PROMPT, 1.1, ctx);
      await ctx.sleep(0.1);
      if (caret)
        await ctx.animate(caret, { opacity: 0 }, { duration: 0.12, ease: SOFT });
      if (send) {
        await ctx.animate(
          send,
          { scale: 0.86, backgroundColor: "#1E3A8A" },
          { duration: 0.14, ease: IN_OUT },
        );
        await ctx.animate(
          send,
          { scale: 1, backgroundColor: "rgba(255,255,255,0.12)" },
          { duration: 0.32, ease: SNAP },
        );
      }
      await ctx.animate(typeEl, { opacity: 0 }, { duration: 0.14, ease: SOFT });
      typeEl.textContent = "";
      typeEl.style.opacity = "1";
      if (caret)
        await ctx.animate(caret, { opacity: 1 }, { duration: 0.18, ease: SOFT });
      await ctx.animate(
        replyWrap,
        { opacity: 1, y: 0, scale: 1 },
        { duration: 0.45, ease: OUT },
      );
      await typeTo(replyEl, TYPE_REPLY, 1.3, ctx);
      for (const tool of tools) {
        await ctx.animate(
          tool,
          { opacity: 1, y: 0, scale: 1 },
          { duration: 0.35, ease: OUT },
        );
      }
      if (caret)
        await ctx.animate(
          caret,
          { opacity: 0.35 },
          { duration: 0.3, ease: SOFT },
        );
    },
    { reset, finish },
  );
}

export function MockComposer({ delay }: { delay: number }) {
  const ref = useMockLoop(buildComposer, delay);

  return (
    <div ref={ref} className={styles.mock} data-mock="composer">
      <div className={styles.chat}>
        <div data-replywrap className={styles.replyBubble}>
          <p data-reply className={styles.replyText} />
        </div>
        <div className={styles.tools}>
          {["CRM", "KB", "Rules"].map((t) => (
            <span key={t} data-tool className={styles.tool}>
              {t}
            </span>
          ))}
        </div>
        <div className={styles.composer}>
          <span className={styles.typeField}>
            <span data-type />
            <i data-caret className={styles.caret} />
          </span>
          <em data-send className={styles.send} aria-hidden="true">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path
                d="M5 8V2M5 2L2 5M5 2l3 3"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </em>
        </div>
      </div>
    </div>
  );
}
