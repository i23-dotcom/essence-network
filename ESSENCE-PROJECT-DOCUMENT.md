# ESSENCE NETWORK — PROJECT DOCUMENT
## Version 2 — Real HLS Live Streaming Foundation
Date: 3 September 2026

### Objective
Build Essence Network as a digital-first TV platform that can evolve into a full OTT/TV network.

### V2 completed
- Responsive Essence Network web application.
- Live TV player using HLS.
- hls.js integration for browsers with Media Source Extensions.
- Native HLS fallback for compatible devices.
- Four channel entries: Essence TV, Essence News, Essence Music, Essence Kids.
- Channel switching.
- Live/connecting/error states.
- Reconnect button.
- TV Guide/EPG-style interface.
- Video-on-demand section.
- News section.
- Search overlay.
- Android/mobile-friendly layout.
- Original Essence Network visual identity.
- Configurable HLS stream in `js/app.js`.

### Current stream
The package includes a public HLS demonstration stream so the player can be tested immediately. It is NOT an Essence Network broadcast. Replace `CONFIG.defaultStream` with a stream for which Essence Network has the necessary rights.

### Technical architecture
Browser -> HLS manifest (.m3u8) -> CDN/origin -> video segments.
hls.js handles HLS playback where required; native HLS is used where supported.

### Production requirements
1. Obtain/produce licensed Essence content.
2. Set up an encoder or streaming origin.
3. Generate HLS playlists and segments.
4. Put the stream behind HTTPS and a suitable CDN.
5. Configure CORS for the web app.
6. Replace the demo URL with the Essence stream URL.
7. Add authentication/token protection if needed.
8. Add real EPG data.
9. Add analytics and monitoring.
10. Build Android and Android TV apps.

### V3 roadmap
- Real Essence Network streaming backend.
- Admin dashboard.
- Channel management.
- Programme scheduler.
- EPG API.
- VOD upload/management.
- Stream health monitoring.
- Multi-bitrate adaptive streaming.
- Catch-up TV.
- User accounts/favorites.
- Android APK and Android TV build.
- Advertising insertion architecture.

### Important legal note
The application is a technology prototype. Only stream content that Essence Network owns or is licensed to distribute. The included demo stream is for player testing.
