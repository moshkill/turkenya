#!/usr/bin/env bash
# Turkenya deploy script — run on the Linode server inside /root/turkenya
# Usage: bash scripts/deploy.sh
set -e

echo "==> Pulling latest from GitHub..."
git pull origin main

echo "==> Installing dependencies..."
npm install

echo "==> Applying database migrations..."
npx prisma migrate deploy || npx prisma db push

echo "==> Building production bundle..."
npm run build

echo "==> Restarting PM2 process..."
pm2 restart turkenya || pm2 start npm --name "turkenya" -- start -- -p 3000
pm2 save

echo "==> Done. Site live on port 3000 (Nginx fronts port 80)."
