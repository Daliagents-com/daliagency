// Purpose: Tour dwell constants shared by HeroProductMock without pulling @xyflow.
// Scope: Keep in sync with HeroAgentsOrgFlow handoff timeline + SETTLE_MS.
// Derived: 5×receive(320) + 6×work(560) + 5×pass(380) + settle(700) = 7560.

/** Parent tour must keep Agents view ≥ this long (one cycle + settle, no mid-cut). */
export const AGENTS_VIEW_MS = 7560;
