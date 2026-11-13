# Port Monitor implementation plan

## Scope
Build the uploaded Port Monitor brief into the existing TanStack Start app without replacing existing authentication or adding an unconfigured live-data claim. The preview will use clearly labelled, coherent demo AIS, historical, port, corridor, and prediction data.

## Work
1. Replace the blank home screen with a dark maritime command center, semantic design tokens, compact workspace navigation, KPI summaries, and operational panels.
2. Add an interactive global map and reusable vessel/port data model. Display demo vessels, ports, corridors, category filters, search, selected-vessel details, and map controls with proper OpenStreetMap attribution.
3. Build a Time Machine workspace with PAST / LIVE / FUTURE modes, historical playback, speed controls, date/time selection, future horizon controls, synchronized telemetry, geodesic prediction, confidence/limitations, and unavailable-data messaging.
4. Add functional workspaces for vessel and port intelligence, corridors, weather/risk, compare, analytics, methodology, and settings, using the same shared demo data and selected-vessel context.
5. Add unique page metadata, test core prediction/data rules, and verify the primary dashboard and Time Machine flows in the running preview.

## Technical approach
Use TanStack file-based routes, shared client-side workspace components, typed demo services, a transparent prediction utility, Leaflet loaded only in the browser, and semantic Tailwind v4 tokens in `src/styles.css`. No private API credentials or real AIS/weather feeds are configured; label simulated information as demo data.
