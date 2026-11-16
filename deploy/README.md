# Likes service deployment

The website remains a static export served by Caddy. A dependency-free Node.js 24 service handles
`/api/likes` on the same origin. SQLite (including the cookie signing secret) lives in the named
`mortyyjt-likes_likes-data` volume, outside `/srv/mortyyjt.site`. Do not delete that volume on upgrades.
No IP address is used as an identity. One signed anonymous browser cookie gives one permanent like;
clearing site data, cookie expiry (400 days), or switching browsers creates a new visitor. The old
Cloudflare Worker was not restored; the counter starts at zero.

## One-time server setup

1. Install `likes-compose.yaml` as root-owned `/etc/mortyyjt-likes/compose.yaml`, and
   `likes-deploy.sh` as root-owned executable `/usr/local/sbin/mortyyjt-likes-deploy`.
   The external network `deploy_default` is the existing Caddy stack's network. The service exposes
   no host port. The static site's rsync key and its confinement remain unchanged.
2. Generate a dedicated ed25519 deployment key locally in a temporary private directory. Put the
   private key directly into this repository's `LIKES_DEPLOY_KEY` Actions secret; never print it.
   Append the public key to the server's `ubuntu` authorized_keys with:

   ```text
   command="sudo /usr/local/sbin/mortyyjt-likes-deploy \"$SSH_ORIGINAL_COMMAND\"",restrict ssh-ed25519 <public-key>
   ```

   Grant only this root-owned command through sudoers if the deployment account lacks sudo.
   Remove the temporary private key after installing the Actions secret. The script validates
   the command, accepts a compressed Docker image on stdin and uses fixed mounts and settings.
3. Add this handler BEFORE the static handler in the `mortyyjt.site` block in the LeapAshore
   repository's `deploy/Caddyfile`:

   ```caddyfile
   handle /api/* {
       reverse_proxy mortyyjt-likes:3001
   }
   handle {
       # Existing try_files and file_server belong here.
   }
   ```

   Keep root, encoding and asset cache headers at site level, so the existing 404 handler
   still sees the correct document root. Preserve the www redirect and LeapAshore configuration. Validate the
   Caddy configuration and reload it only after the first service container is healthy.

## Release and rollback

The main-branch workflow builds the likes Docker image, streams it to the restricted command,
waits for the healthcheck and checks the public endpoint, then rsyncs the static export. It publishes only to the owner's server. The first release needs one bootstrap image before the Caddy reload.
GitHub-hosted runners build Linux images. For a manual Apple Silicon build, use `--platform linux/amd64`.
The deployment command automatically restores the previous image version if the new one fails its
healthcheck. For a deliberate rollback, stream the previous built image using its commit SHA;
keep the same volume. Back up SQLite using its online backup API, not a live copy of just the DB
file (WAL may contain recent likes). Future schema migrations must remain backward-compatible.

The owner handles any cleanup of the former GitHub Pages site and its dedicated publishing
credentials. The current workflow never uses `PAGES_DEPLOY_KEY`. Do not infer or create additional
deployment projects from old notes; the only supported production target is this server.

## Local checks

```sh
SITE_ORIGIN=http://127.0.0.1:3001 LIKES_DB=/tmp/guyuy-likes.sqlite node services/likes/main.ts
npm test
```

The static export itself cannot answer API requests: use a same-origin reverse proxy for a full
local browser test. POST requires an exact matching Origin and a signed cookie established by GET;
without cookies it returns 409 and never increments. Responses are not cached. Storage failure is
503, never a successful local-only like. The frontend serializes initialization/writes across tabs
with Web Locks where available and re-reads state on focus. The database's unique visitor key is
the final deduplication guard. This is anonymous convenience deduplication, not bot-proof voting.
