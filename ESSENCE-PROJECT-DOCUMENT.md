# ESSENCE NETWORK — PROJECT DOCUMENT
## Version 2.1 — HLS + Browser Admin Dashboard
Date: 3 September 2026

### Current milestone
Essence Network v2.1 adds a browser-based content management dashboard to the HLS web TV foundation.

### Completed
- Responsive digital TV website
- HLS live player with hls.js + native HLS fallback
- Channel switching and reconnect
- Four demo channel slots
- TV Guide
- VOD
- News
- Search
- Admin dashboard
- Add/edit/delete channels
- Add/edit/delete TV Guide programmes
- Add/edit/delete videos
- Add/edit/delete news stories
- HLS URL management
- Reset demo content
- Browser localStorage persistence
- Correct lowercase `css/` and `js/` project paths

### Admin dashboard location
Open the public website and tap **ADMIN**.

### Important limitation
This admin dashboard is a prototype. It stores content in the browser's localStorage and does NOT provide secure multi-user authentication or a shared database. Changes made on one browser/device do not automatically appear on another device.

### V3 production CMS
Next we should replace localStorage with:
- authenticated admin accounts
- database/API
- image/file storage
- shared channel configuration
- real EPG API
- VOD storage
- stream health monitoring
- role-based permissions
- audit log

### Streaming
The included HLS URL is a public demonstration stream for testing. Replace it with an Essence-owned/licensed `.m3u8` stream before public broadcasting.

### Roadmap
V2.1 Admin dashboard -> V3 Production CMS + streaming backend -> V4 Android APK -> V5 Android TV/Google TV -> V6 full OTT platform.
