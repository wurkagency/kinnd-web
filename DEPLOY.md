# Deploying www.kinnd.eu (Plesk)

The site is fully static. `npm run build` writes plain files to `dist/`, and the release script copies them into the Plesk document root. No Node process runs in production.

Assumed on the server: Node 22, npm, git and rsync installed; SSL and the non-www to www 301 already set up in Plesk.

| | Path |
|---|---|
| Repository (build folder) | `/var/www/kinnd.eu/kinnd-web` |
| Document root (served) | `/var/www/kinnd.eu/httpdocs` |

The repository sits next to `httpdocs`, not inside it, so source files are never public.

## First time

SSH in as the vhost's system user, then:

```bash
cd /var/www/kinnd.eu
git clone https://github.com/wurkagency/kinnd-web.git kinnd-web
chmod +x kinnd-web/deploy/release.sh
kinnd-web/deploy/release.sh
```

The first run replaces everything in `httpdocs` (the Plesk placeholder page included) with the site. `.well-known/` is kept.

## Every release

```bash
/var/www/kinnd.eu/kinnd-web/deploy/release.sh
```

It pulls `main`, installs dependencies, builds and mirrors `dist/` into `httpdocs`. Nothing needs restarting.

## Check after a release

```bash
curl -sI https://www.kinnd.eu/ | head -1
curl -s -o /dev/null -w "%{http_code}\n" https://www.kinnd.eu/does-not-exist/
curl -s https://www.kinnd.eu/sitemap-index.xml | head -3
```

Expect `HTTP/2 200`, `404` and the sitemap XML.

## Server settings

`public/.htaccess` ships with the build and sets the 404 page, cache headers, security headers and compression. That covers Plesk's default Apache + nginx setup.

If the domain runs in nginx-only mode (Apache off), `.htaccess` is ignored. Add this under Plesk > Domains > kinnd.eu > Apache & nginx Settings > Additional nginx directives instead:

```nginx
error_page 404 /404.html;
location ~* ^/(_astro|fonts)/ {
    add_header Cache-Control "public, max-age=31536000, immutable";
}
```
