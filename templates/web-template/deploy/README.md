# deploy notes

three shapes, pick per project. static is the default, the other two are earned.

## static behind caddy (default)

`make build` writes `build/`. rsync it to the box and point a vhost at it:

```
example.com {
	root * /srv/example.com
	encode gzip
	file_server
	try_files {path} /index.html
}
```

drop the `try_files` line if the site is fully prerendered with no client routing.

## node server (adapter-node, earned)

swap `@sveltejs/adapter-static` for `@sveltejs/adapter-node` in `vite.config.ts`, build,
ship `build/` + `package.json` + the lockfile, `pnpm install --prod` on the box.

systemd unit, memory-capped because adapter-node heap growth is a known thing and a
restart is the accepted answer:

```ini
[Unit]
Description=example web
After=network.target

[Service]
WorkingDirectory=/srv/example
Environment=PORT=3000
Environment=ORIGIN=https://example.com
ExecStart=/usr/bin/node build
Restart=always
MemoryMax=300M

[Install]
WantedBy=multi-user.target
```

caddy in front:

```
example.com {
	reverse_proxy localhost:3000
}
```

gotchas, all of them learned the hard way by other people so we dont have to:

- `ORIGIN` must be set or form actions fail csrf checks. behind the proxy you can use
  `PROTOCOL_HEADER=x-forwarded-proto` + `HOST_HEADER=x-forwarded-host` instead, but only
  behind a proxy you trust, those headers are spoofable from outside
- `PORT` defaults to 3000, set it explicitly anyway
- websockets need the upgrade headers forwarded, caddy does this by default, nginx doesnt

## go:embed (tool surface beside a daemon)

build static, embed the output in the binary:

```go
//go:embed all:build
var site embed.FS

sub, _ := fs.Sub(site, "build")
http.Handle("/", http.FileServer(http.FS(sub)))
```

one binary, nothing else to deploy.
