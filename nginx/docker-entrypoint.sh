#!/bin/sh
set -e

CERT_DIR=/etc/nginx/certs
FULLCHAIN="$CERT_DIR/fullchain.pem"
PRIVKEY="$CERT_DIR/privkey.pem"

mkdir -p "$CERT_DIR" /var/www/certbot

if [ ! -f "$FULLCHAIN" ] || [ ! -f "$PRIVKEY" ]; then
  echo "nginx: no TLS certs found — generating self-signed bootstrap cert (replace with Let's Encrypt for production)."
  openssl req -x509 -nodes -newkey rsa:2048 -days 30 \
    -keyout "$PRIVKEY" \
    -out "$FULLCHAIN" \
    -subj "/CN=localhost"
fi

exec /docker-entrypoint.sh nginx -g 'daemon off;'
