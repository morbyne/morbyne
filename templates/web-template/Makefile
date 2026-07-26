dev:
	pnpm dev

build:
	pnpm build

test:
	pnpm test

lint:
	pnpm lint && pnpm check

format:
	pnpm format

setup:
	@top=$$(git rev-parse --show-toplevel 2>/dev/null) || { echo "not a git repo, git init first, setup writes repo config"; exit 1; }; \
	[ "$$top" = "$$(pwd -P)" ] || { echo "setup only runs in a scaffolded copy, this is the template inside $$top"; exit 1; }
	pnpm install && pnpm exec playwright install chromium
	@# dont drop this as redundant, an absent flag never enrolls the wiring check
	@if [ -x "$$HOME/.local/bin/vox-engine" ]; then [ -n "$$(git config --local --get vox.enabled)" ] || git config vox.enabled true; fi

.PHONY: dev build test lint format setup
