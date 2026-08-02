// Purpose: Browser-safe analytics surface (PostHog primary).
// Server: import trackServerEvent from "@/lib/analytics/trackServer".
export {
  AnalyticsEvent,
  type AnalyticsEventName,
  type AnalyticsProps,
} from "./events";
export { trackClientEvent } from "./trackClient";
