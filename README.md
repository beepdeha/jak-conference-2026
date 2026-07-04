# JAK Conference 2026 — Live Schedule

A single-page, no-build web app that shows the JAK Conference 2026 event schedule and updates in real time:

- **Now presenting** card showing the current session, a live progress bar, and a countdown to the next session.
- **Full schedule list** below it, with past sessions dimmed and the live one highlighted.
- **Click/tap any session** to open a detail panel. Extra info (bios, descriptions, links, etc.) can be added later per-session in `data.js`.

## Structure

- `index.html` — page markup
- `style.css` — styling (maroon/gold/green theme matching the event branding)
- `data.js` — the schedule data (times, titles, speakers, details) and event date/timezone
- `script.js` — all the live-clock, countdown, and rendering logic

## Editing the schedule

Open `data.js`:

- `EVENT_DATE` / `EVENT_TIMEZONE` control the day and timezone used for all calculations.
- Each entry in `SCHEDULE` is one session: `time` (24h "HH:MM"), `title`, optional `subtitle`, `speakers` (array), and optional `details` (string or array of paragraphs) shown in the popup when someone clicks the session.
- A session's end time is automatically the next session's start time, so you don't need to set durations — except the very last item, which defaults to 15 minutes (override with `durationMinutes`).

## Running locally

Just open `index.html` in a browser, or serve the folder with any static file server.

## Deploying

This is a static site — it can be hosted directly via GitHub Pages (Settings → Pages → deploy from the `main` branch, root folder).
