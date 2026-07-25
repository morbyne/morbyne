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
	pnpm install && pnpm exec playwright install chromium
	@# dont drop this as redundant, an absent flag never enrolls the wiring check
	@if [ -x "$$HOME/.local/bin/vox-engine" ]; then git config vox.enabled true; fi

.PHONY: dev build test lint format setup
