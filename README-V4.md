# Essence Network V4

Essence Network V4 separates the viewer-facing television site from the private Network Workspace.

## Public
- `/` — public viewer platform
- No admin login form or staff dashboard is rendered on the public site.
- Public APIs only expose enabled channels and published editorial content.

## Private workspace
- `/studio` — private Network Workspace login
- `/control-room` — same secure workspace, opens directly on Control Room
- Editorial Room
- Editing Room
- Control Room
- Channel Operations
- Programme Schedule
- Staff & Roles (admin)
- Network Settings (admin)

## Publishing workflow
Draft → Editing → Review → Approved → Published

Only content with `editorial_status=published` and `published=1` is returned to `/api/public`.

## Render environment
- NODE_VERSION=24.14.1
- JWT_SECRET=<strong random secret>
- ADMIN_EMAIL=<admin work email>
- ADMIN_PASSWORD=<strong initial password>

## Production storage
The Editing Room accepts direct device uploads, including video files. The starter server stores uploads under `/uploads`. For a production TV network, use durable object storage/CDN for large video assets rather than relying on an ephemeral application filesystem.

## Security note
The private workspace is protected by JWT authentication and role checks. The separate URL is an architectural separation, not a replacement for authentication.
