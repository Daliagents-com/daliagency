/**
 * Single source of truth for absolute public URLs (SEO/GEO).
 * Prefer this over hardcoding hosts in pages or content builders.
 */
import { DALI_ORG } from "@/lib/seo/organizationIdentity";

export const siteUrl = DALI_ORG.url;

export function absoluteUrl(path = "/"): string {
  if (!path || path === "/") return siteUrl;
  return path.startsWith("http")
    ? path
    : `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
