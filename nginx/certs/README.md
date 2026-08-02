# TLS certificates for the nginx container
#
# On first `docker compose up`, missing certs are auto-generated as a short-lived
# self-signed pair (browsers will warn). For production, replace with Let's Encrypt.

## Let's Encrypt (webroot)

1. Point DNS at the VPS and set `NUXT_PUBLIC_SITE_URL=https://your.domain`.
2. Ensure `nginx/www-certbot` exists (Compose mounts it at `/var/www/certbot`).
3. Issue a cert (certbot on the host or a one-off container), writing into this directory as:
   - `fullchain.pem`
   - `privkey.pem`
4. Reload nginx: `docker compose exec nginx nginx -s reload`

Example with host certbot (Debian):

```bash
sudo certbot certonly --webroot -w "$(pwd)/nginx/www-certbot" -d your.domain
sudo cp /etc/letsencrypt/live/your.domain/fullchain.pem nginx/certs/fullchain.pem
sudo cp /etc/letsencrypt/live/your.domain/privkey.pem nginx/certs/privkey.pem
docker compose exec nginx nginx -s reload
```

Do not commit real certificates — `nginx/certs/*` is gitignored.
