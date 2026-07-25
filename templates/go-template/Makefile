.PHONY: setup check test lint fmt hygiene

setup:
	@# probe the path the hooks resolve, never PATH or the global config. PATH
	@# needs a login profile containers dont run, and a collaborator carrying
	@# their own global hooks isn't on a vox machine
	@top=$$(git rev-parse --show-toplevel 2>/dev/null) || { echo "not a git repo, git init first, setup writes repo config"; exit 1; }; \
	[ "$$top" = "$$(pwd -P)" ] || { echo "setup only runs in a scaffolded copy, this is the template inside $$top"; exit 1; }; \
	if [ -x "$$HOME/.local/bin/vox-engine" ]; then \
		git config vox.projectHooks .githooks; \
		git config --local --get vox.enabled >/dev/null || git config vox.enabled true; \
		if [ "$$(git config --local --get core.hooksPath)" = ".githooks" ]; then \
			git config --unset core.hooksPath; \
		fi; \
	else \
		git config core.hooksPath .githooks; \
	fi

check: setup fmt hygiene
	go vet ./...
	go fix -diff ./...
	go mod tidy -diff
	golangci-lint run
	go test -race ./...

test:
	go test ./...

lint:
	golangci-lint run

fmt:
	go tool gofumpt -w .

hygiene:
	@bad=$$(git ls-files | while read -r f; do [ -x "$$f" ] && head -c4 "$$f" 2>/dev/null | grep -q ELF && echo "$$f"; done; true); if [ -n "$$bad" ]; then echo "$$bad"; echo "tracked binaries, drop them"; exit 1; fi
	@stray=$$(git ls-files '*.go' | grep -vE '^(cmd|internal)/' || true); if [ -n "$$stray" ]; then echo "$$stray"; echo "go files outside cmd/ and internal/"; exit 1; fi
	@if [ -f Dockerfile ]; then v=$$(sed -n 's/^go //p' go.mod); grep -q "golang:$$v" Dockerfile || { echo "dockerfile builder image doesnt match go.mod ($$v)"; exit 1; }; fi
