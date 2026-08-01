// Purpose: Browser-safe analytics surface.
// Server handlers must import trackServerEvent from "@/lib/analytics/trackServer".
export {
  AnalyticsEvent,
  type AnalyticsEventName,
  type AnalyticsProps,
} from "./events";
export {
  trackClientEvent,
  getSessionId,
  getVisitorId,
} from "./trackClient";
