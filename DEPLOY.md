# Deploying kinnd.eu

The site is fully static. `npm run build` writes plain files to `dist/`; any web server can serve them. No Node process runs in production.

Requirements on the build machine: Node 22.12+ and npm 9.6+.

## First time, on the server (Ubuntu/Debian + nginx)

```bash
# Node 22 (skip if already installed)
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs nginx

# Code
sudo mkdir -p /var/www/kinnd-web && sudo chown "$USER" /var/www/kinnd-web
git clone https://github.com/wurkagency/kinnd-web.git /var/www/kinnd-web
cd /var/www/kinnd-web
npm ci
npm run build

# nginx
sudo cp deploy/nginx.conf /etc/nginx/sites-available/kinnd.eu
sudo ln -s /etc/nginx/sites-available/kinnd.eu /etc/nginx/sites-enabled/kinnd.eu
sudo nginx -t && sudo systemctl reload nginx

# HTTPS (Let's Encrypt)
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d www.kinnd.eu -d kinnd.eu
```

## Every release

```bash
cd /var/www/kinnd-web
git pull --ff-only
npm ci
npm run build
```

nginx serves `dist/` directly, so there is nothing to restart.

## Check after a release

```bash
curl -sI https://www.kinnd.eu/ | head -1
curl -sI https://kinnd.eu/ | grep -i location
curl -s -o /dev/null -w "%{http_code}\n" https://www.kinnd.eu/does-not-exist/
curl -s https://www.kinnd.eu/sitemap-index.xml | head -3
```

Expect `200`, a redirect to `https://www.kinnd.eu/`, `404`, and the sitemap XML.

## Other hosts

Netlify, Vercel or Cloudflare Pages: build command `npm run build`, output directory `dist`, Node 22. `dist/404.html` is picked up as the not-found page automatically.
