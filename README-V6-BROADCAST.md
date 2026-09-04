# Essence Network V6 — Broadcast Automation

This version changes the studio from a collection of management screens into a web broadcast-planning and playout control layer.

## What you can do

1. Log in at `/studio`.
2. Open **Broadcast Automation**.
3. Choose a channel.
4. Choose a published VOD/video, or enter a live HLS/stream URL.
5. Set exact Start and End times.
6. Add the item to the channel rundown.
7. Use **TAKE TO AIR** for an immediate manual override.
8. Use **Return to schedule** to hand the channel back to automation.
9. Open the public website `/` and select the channel. The public player follows the server clock and automatically plays the item that is on-air.

## Broadcast model

- `broadcast_items` is the channel's timed rundown.
- `broadcast_override` is the immediate master-control take.
- The public `/api/public/on-air` endpoint exposes only the current on-air state for enabled channels.
- Scheduled VOD items are time-synchronised: a viewer joining late starts at the correct elapsed position.
- Live items use HLS/stream playback.
- When an item ends, the public client polls and moves to the next scheduled item.

## Important production distinction

This is a functional **web playout automation layer**. It does not turn a browser into a professional SDI/NDI switcher, hardware encoder, or broadcast transmitter. For a true single encoded channel stream that every viewer receives from one origin, connect this control layer to an FFmpeg/GStreamer/OBS/MediaMTX/SRS or other authorized media pipeline. The V6 control plane is designed so that the selected on-air source can be fed into that pipeline later.

## Deployment

- Node: 24.14.1
- better-sqlite3: 13.0.3
- Build: `npm install`
- Start: `npm start`
- Keep `JWT_SECRET`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD` configured in Render.
