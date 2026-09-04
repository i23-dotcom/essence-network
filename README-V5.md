# Essence Network V5 — TV Production & Broadcast Platform

V5 separates the public viewer experience from a private Network Studio and adds operational tools for a small TV network.

## Private workspaces

Open the staff workspace at `/studio`. `/control-room` opens the same protected workspace directly on Production Control.

The public site does not display the staff login or staff navigation.

## Production areas

- **Newsroom** — editorial stories and publish workflow.
- **Editing Room** — direct device uploads for video/audio/images/subtitles/playlists and VOD workflow.
- **Studio** — studio sessions, director and floor-manager assignments.
- **Rundown** — programme running order with Ready / Next / On Air / Done / Hold states.
- **Production Control** — channel operating state and programme/source coordination.
- **Master Control** — scheduled/live/backup/emergency playout modes.
- **Live Sources** — camera, remote, playback and encoder playback URLs.
- **Graphics** — lower-third and other broadcast graphic records.
- **Schedule** — EPG/programme schedule.
- **Channels** — channel and HLS/M3U8 playback endpoint management.
- **Staff** — role-based accounts.

## Important live-TV architecture note

A browser dashboard cannot itself turn an RTMP/SRT professional camera feed into a scalable TV broadcast. For a real channel, use an encoder/camera workflow that feeds a media server or streaming platform, which then produces a browser-playable HLS or WebRTC playback feed. V5 manages those sources, programme state and channel playout metadata.

For production, use durable media/object storage and a CDN for uploaded VOD files. Render local disk should not be treated as permanent storage for a growing video archive unless persistent storage is configured.

## Recommended first deployment

1. Deploy the project to Render.
2. Set `NODE_VERSION=24.14.1`.
3. Set `JWT_SECRET`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD`.
4. Sign in at `/studio`.
5. Create your channels and real licensed playback URLs.
6. Create staff accounts with the least privilege needed.
7. Register live sources and their browser-playable preview URLs.
8. Build a programme schedule.
9. Create a rundown for a programme.
10. Upload a test video from a phone in Editing Room.
11. Move the content through editorial workflow.
12. Configure Production Control and Master Control.
13. Test the complete path before going on air.

V5 is an operations/control application; it does not replace professional cameras, audio consoles, switchers, encoders, media servers, playout automation, or a broadcast CDN.
