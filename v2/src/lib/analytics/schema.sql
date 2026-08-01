-- Purpose: Base product-analytics table for Dali website custom events.
-- Run once in ClickHouse Cloud (or self-hosted) before enabling inserts.
--
-- Env mapping:
--   CLICKHOUSE_URL / CLICKHOUSE_HOST
--   CLICKHOUSE_USER / CLICKHOUSE_PASSWORD
--   CLICKHOUSE_DATABASE (default: default)
--   CLICKHOUSE_EVENTS_TABLE (default: web_events)

CREATE TABLE IF NOT EXISTS web_events
(
    event_time   DateTime64(3, 'UTC') DEFAULT now64(3),
    event_name   LowCardinality(String),
    session_id   String DEFAULT '',
    path         String DEFAULT '',
    locale       LowCardinality(String) DEFAULT '',
    source       LowCardinality(String) DEFAULT '',
    referrer     String DEFAULT '',
    props        String DEFAULT '{}',
    user_agent   String DEFAULT '',
    vercel_env   LowCardinality(String) DEFAULT '',
    vercel_region LowCardinality(String) DEFAULT ''
)
ENGINE = MergeTree
PARTITION BY toYYYYMM(event_time)
ORDER BY (event_name, event_time, session_id)
TTL event_time + INTERVAL 18 MONTH
SETTINGS index_granularity = 8192;

-- Useful starter queries:
--
-- SELECT event_name, count() AS n
-- FROM web_events
-- WHERE event_time > now() - INTERVAL 7 DAY
-- GROUP BY event_name
-- ORDER BY n DESC;
--
-- SELECT source, count() AS opens
-- FROM web_events
-- WHERE event_name = 'consultation_open'
--   AND event_time > now() - INTERVAL 30 DAY
-- GROUP BY source
-- ORDER BY opens DESC;
--
-- SELECT
--   countIf(event_name = 'consultation_open') AS opens,
--   countIf(event_name = 'consultation_submit') AS submits,
--   if(opens = 0, 0, submits / opens) AS submit_rate
-- FROM web_events
-- WHERE event_time > now() - INTERVAL 30 DAY;
