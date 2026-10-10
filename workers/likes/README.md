# Like counter (Cloudflare Worker)

Stores one total in Workers KV. Each visitor is identified by a salted SHA-256 of their IP
(never the raw IP); the marker expires after a day, and the browser also remembers the like, so
the heart cannot be pressed twice. Only the site's origins may POST.

## Deploy (once)

1. Create a free Cloudflare account and run, from this folder:

   ```sh
   npx wrangler login
   npx wrangler kv namespace create LIKES
   ```

   Put the printed `id` into `wrangler.toml`.
2. Set a random salt (kept secret; never commit it):

   ```sh
   npx wrangler secret put IP_SALT
   ```

3. Deploy and note the URL, e.g. `https://guyuy-likes.<account>.workers.dev`:

   ```sh
   npx wrangler deploy
   ```

4. Point the site at it: add a repository variable `LIKES_ENDPOINT` set to
   `https://guyuy-likes.<account>.workers.dev/likes` (GitHub → Settings → Secrets and variables →
   Actions → Variables), and the same value as `NEXT_PUBLIC_LIKES_ENDPOINT` in the Vercel project.

Without the variable the heart still works, but only remembers the like in the visitor's browser
and shows no total.
