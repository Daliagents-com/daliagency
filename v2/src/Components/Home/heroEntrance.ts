// Purpose: Single source of truth for homepage hero entrance + logo flight timing.
// Scope: Constants only. DaliAnimation, Card entrance, FlyingBrandLogo must import from here.

/** Delay before logo stroke and mock entrance start (ms). */
export const HERO_ENTRANCE_DELAY_MS = 100;

/**
 * Shared entrance duration (ms).
 * Mock rise window - keep short enough to feel locked with the logo draw.
 */
export const HERO_ENTRANCE_DURATION_MS = 1200;

/** Framer-friendly seconds. */
export const HERO_ENTRANCE_DELAY_S = HERO_ENTRANCE_DELAY_MS / 1000;
export const HERO_ENTRANCE_DURATION_S = HERO_ENTRANCE_DURATION_MS / 1000;

/** Smooth decelerate - same curve for mock transform entrance. */
export const HERO_ENTRANCE_EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Hand-draw wall time after entrance delay (ms).
 * DaliAnimation derives TIME_SCALE from this × last replay frame t.
 * Was 2624 (scale 8); snappier pen without losing the hand-draw read.
 */
export const DALI_HAND_DRAW_MS = 1000;

/**
 * Hold logo in hero phase until hand-draw can finish.
 * delay + replay duration ≈ wall clock lock.
 */
export const LOGO_FLIGHT_LOCK_MS =
  HERO_ENTRANCE_DELAY_MS + DALI_HAND_DRAW_MS;

/** Scroll progress (0-1 on logo track) when flight may start. */
export const LOGO_FLIGHT_START = 0.08;

/** Scroll progress when flight must land in nav. */
export const LOGO_FLIGHT_END = 0.42;
