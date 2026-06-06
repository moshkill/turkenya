#!/usr/bin/env bash
# Turkenya deploy script — run on the Linode server inside /root/turkenya
# Usage: bash scripts/deploy.sh
set -e

echo "==> Discarding local changes to tracked files (e.g. package-lock)..."
git checkout -- . 2>/dev/null || true

echo "==> Pulling latest from GitHub..."
git pull origin main

echo "==> Installing dependencies..."
npm install

echo "==> Ensuring enough swap so the build can't OOM..."
if [ "$(free -m | awk '/Swap:/{print $2}')" -lt 1500 ]; then
  if [ ! -f /swapfile2 ]; then
    fallocate -l 2G /swapfile2 && chmod 600 /swapfile2 && mkswap /swapfile2 && swapon /swapfile2
    grep -q '/swapfile2' /etc/fstab || echo '/swapfile2 none swap sw 0 0' >> /etc/fstab
    echo "    added 2G swap (/swapfile2)"
  else
    swapon /swapfile2 2>/dev/null || true
  fi
fi

echo "==> Applying database migrations..."
npx prisma migrate deploy || npx prisma db push

echo "==> Building production bundle..."
npm run build

echo "==> Restarting PM2 process..."
pm2 restart turkenya || pm2 start npm --name "turkenya" -- start -- -p 3000
pm2 save

echo "==> Done. Site live on port 3000 (Nginx fronts port 80)."
