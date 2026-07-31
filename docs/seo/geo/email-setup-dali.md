# Domain email for Dali (`hello@dali.agents.ge`)

**Date:** 2026-08-01  
**Goal:** business email for GoodFirms / Clutch / directories (not Gmail).

## Architecture (chosen)

```
Internet → MX dali.agents.ge → ImprovMX → forward → dav.hakobyan100@gmail.com
```

Free inbound forwarding. You read/write in Gmail; externally it is `*@dali.agents.ge`.

## Done (DNS on Vercel)

Domain `agents.ge` uses Vercel nameservers. Records added:

| Host | Type | Value |
| --- | --- | --- |
| `dali` | MX 10 | `mx1.improvmx.com` |
| `dali` | MX 20 | `mx2.improvmx.com` |
| `dali` | TXT | `v=spf1 include:spf.improvmx.com ~all` |

Verified live:

```bash
dig +short MX dali.agents.ge @8.8.8.8
# 10 mx1.improvmx.com.
# 20 mx2.improvmx.com.
```

Commands used:

```bash
vercel dns add agents.ge dali MX mx1.improvmx.com 10
vercel dns add agents.ge dali MX mx2.improvmx.com 20
vercel dns add agents.ge dali TXT "v=spf1 include:spf.improvmx.com ~all"
```

## ImprovMX account (done 2026-08-01)

- Account: `dav.hakobyan100@gmail.com` (activated; confirm was in **Spam**)
- Domain: `dali.agents.ge` - **Active**
- DNS in ImprovMX: MX + SPF all green (Vercel nameservers)
- Alias: catch-all `*@dali.agents.ge` → `dav.hakobyan100@gmail.com`
  - covers `hello@`, `contact@`, `dav@` without separate rows

Credentials: local only `~/.config/dali/improvmx-credentials.txt` (not in git).  
App: https://app.improvmx.com/login

## After aliases work

1. Test: send mail from another address to `hello@dali.agents.ge` → should land in Gmail
2. Optional **Send as** in Gmail: Settings → Accounts → Send mail as → ImprovMX SMTP (paid on free may be limited; inbound is enough for GoodFirms signup codes)
3. GoodFirms register with `hello@dali.agents.ge` - **done 2026-08-01**
4. Update Clutch sales email to `hello@dali.agents.ge` - **done 2026-08-01**
5. Public site mailto / Footer - **done 2026-08-01** (`daliContactEmail`)

## Not chosen (why)

| Option | Why not now |
| --- | --- |
| Google Workspace | Paid; domain has old `gv-` CNAME verify only, no MX |
| Full mailbox Zoho | Heavier; free tier OK later if you want real IMAP |
| Cloudflare Email Routing | Needs Cloudflare nameservers (would move off Vercel NS) |
| Forward Email | Free tier blocks `.ge`; paid upgrade only - abandoned |
| 21st.dev email | Wrong product inbox - not for Dali |

## Status

- [x] DNS MX + SPF for `dali.agents.ge`
- [x] ImprovMX account activated (email link was in Spam)
- [x] Domain Active + catch-all alias → Gmail
- [x] Receive test: from `david@21st.dev` → `hello@dali.agents.ge` → landed in Gmail **Spam** at 1:33 AM 2026-08-01 (subject `[Dali test] ImprovMX hello@ receive`)
- [x] Use `hello@` on GoodFirms / Clutch / site CTAs (Footer + contact.ts) - 2026-08-01
- [ ] Optional: Not spam + filter for *@dali.agents.ge so OTP codes not lost in Spam
