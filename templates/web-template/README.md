# web-template

the starting point for atrophy zero web projects. sveltekit + svelte 5, typescript,
pnpm, static-first. clone it, rename it, delete what the project doesnt need.

## start

```sh
make setup   # pnpm install + playwright chromium
make dev
```

pnpm only, the preinstall guard will stop a stray npm install before it eats the lockfile.

## commands

```sh
make dev      # vite dev server
make build    # static build to build/
make test     # vitest, then playwright
make lint     # prettier check, eslint, svelte-check
make format
```

## shape

- `src/lib` grouped by domain as it grows, no barrel files
- components are `PascalCase.svelte`, rune modules are `lowercase.svelte.ts`
- prerender is on globally (`+layout.ts`), flip per route when a project earns a server
- e2e specs live in `e2e/` as `*.e2e.ts`, unit tests sit next to what they test

## deploy

static output behind caddy is the default, notes for that plus the node-server and
go:embed shapes are in [deploy/](deploy/README.md).

## template versioning

this repo is versioned by [CHANGELOG.md](CHANGELOG.md). projects that started from an
older version pull changes by hand when they matter.
