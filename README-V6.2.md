# Essence Network V6.2 — Brand + Broadcast Polish

V6.2 keeps the V6 broadcast automation model while bringing the public site and Production Studio into the Essence Network visual system shown in the V6 channel-creator reference.

## Included
- Purple / blue / cyan Essence Network visual language.
- Refined Production Studio navigation, cards, controls, status badges and responsive layouts.
- Public TV experience with live channel selection, on-air synchronization and late-join seeking for scheduled items.
- VOD and News presentation with consistent branded cards.
- Fixed the public-player DOM mismatch that could stop playback UI updates.
- Hardened authentication with salted Node.js `scrypt`; legacy SHA-256 accounts are transparently upgraded after a successful login.
- Login-attempt throttling and safer default CORS behavior.
- Upload limit reduced to 250 MB for the web workspace.

## Production note
This remains a browser control plane, not a replacement for a professional encoder/transmitter. For a single origin stream per channel, connect the V6 automation state to FFmpeg, GStreamer, OBS, MediaMTX, SRS or another authorized media pipeline.
