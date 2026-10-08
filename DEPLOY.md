# Deploying www.kinnd.eu (Plesk)

The site is fully static. `npm run build` writes plain files to `dist/`. No Node process runs in production.

Server: Plesk, Node 22, SSL and the non-www to www 301 already in place. Plesk Git pulls the repository into `/var/www/vhosts/kinnd.eu/httpdocs`.

## First time

1. In Plesk, go to **Domains > kinnd.eu > Hosting & DNS > Hosting**, set **Document root** to `httpdocs/dist`, and save.
   The source code in `httpdocs` is then never public; only the build is served.
2. Pull the repository with Plesk Git (**Git > Pull updates**).
3. SSH in as the domain's system user and build:

```bash
cd /var/www/vhosts/kinnd.eu/httpdocs
npm ci
npm run build
```

## Every release

1. Plesk: **Git > Pull updates**.
2. SSH:

```bash
cd /var/www/vhosts/kinnd.eu/httpdocs
npm ci
npm run build
```

Nothing needs restarting.

Optional: to build on every pull without SSH, paste the same commands into Plesk **Git > Repository settings > Enable additional deployment actions**:

```bash
npm ci
npm run build
```

## Check after a release

```bash
curl -sI https://www.kinnd.eu/ | head -1
curl -s -o /dev/null -w "%{http_code}\n" https://www.kinnd.eu/does-not-exist/
curl -s https://www.kinnd.eu/sitemap-index.xml | head -3
```

Expect `HTTP/2 200`, `404` and the sitemap XML.

## Server settings

`public/.htaccess` is copied into `dist/` on build. It sets the 404 page, cache headers, security headers and compression, which covers Plesk's default Apache + nginx setup.

It also redirects the short URLs used in the legal texts (`/privacy`, `/terms`, `/privatlivspolitik`, `/vilkaar`, `/priser`).

If the domain runs nginx only (Apache off), `.htaccess` is ignored. Add this under **Domains > kinnd.eu > Apache & nginx Settings > Additional nginx directives** instead:

```nginx
error_page 404 /404.html;
location ~* ^/(_astro|fonts)/ {
    add_header Cache-Control "public, max-age=31536000, immutable";
}
rewrite ^/privacy/?$ /legal/privacy/ permanent;
rewrite ^/terms/?$ /legal/terms/ permanent;
rewrite ^/privatlivspolitik/?$ /da/legal/privacy/ permanent;
rewrite ^/vilkaar/?$ /da/legal/terms/ permanent;
rewrite ^/priser/?$ /da/pricing/ permanent;
```
