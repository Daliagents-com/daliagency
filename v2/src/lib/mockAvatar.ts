// Purpose: DiceBear mock avatars for product UI shells (people + logo placeholders).
// Style: lorelei — illustrated faces. Seed locks a stable face per entity.

export const MOCK_AVATAR_STYLE = "lorelei" as const;

/** Stable SVG avatar URL. Same seed always returns the same face. */
export function mockAvatarUrl(seed: string): string {
  // Always HTTPS so img loads on production and avoids http→https redirect.
  return `https://api.dicebear.com/10.x/${MOCK_AVATAR_STYLE}/svg?seed=${encodeURIComponent(
    seed,
  )}`;
}
