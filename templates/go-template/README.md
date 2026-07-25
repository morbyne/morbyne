# go-template

the starting point for atrophy go projects. copy it out, rename the module, delete what
the project doesnt need. the judgment lives in the rulebooks (`rulebooks/stacks/go/`),
this template carries the mechanical half: the toolchain shape, the linter set, and the
gate.

## start

```sh
cp -r ~/projects/morbyne/templates/go-template myproject && cd myproject
git init
make setup
go mod edit -module github.com/rxtted/myproject
grep -rl rxtted/app --include='*.go' . | xargs sed -i 's|rxtted/app|rxtted/myproject|'
make check
```

## commands

`make setup` wires the committed hooks, idempotently, and `make check` runs it for you.
it asks who's got gits one hooks slot first: chains through vox.projectHooks where vox holds
the slot globally, takes core.hooksPath only on a machine without vox. never point
core.hooksPath at project hooks by hand on a vox machine, that silences every voice gate
without a word.

the fast gate (fmt, vet, fix, tidy, lint, test, hygiene) runs on every commit, locally,
because thats where the work happens, main runs ahead and pushes are rare. ci re-runs the
same gate plus the race leg as the backstop.

## shape

- `cmd/app` is a thin main: handler, signal ctx, delegate. rename the dir with the project
- everything else under `internal/`, one domain concern per package
- ci gates fmt + vet + fix + tidy + lint + race on every push; govulncheck runs weekly
- the skeleton is daemon-flavoured (signal lifecycle). a cli strips the signal wiring; a
  wasm plugin replaces cmd/ with the host rim and drops the race leg. strip, dont rebuild
