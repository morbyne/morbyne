# changelog

the template is versioned by these entries. existing projects pull changes by hand when
they matter, this file says what changed and why.

## 2

- lint now gates the well-evidenced generated-code tells: no non-null assertions, no
  double assertions, restricted legacy imports (moment, request, node-fetch, dotenv),
  vitest rules (no focused/conditional tests, banned weak matchers, describe depth) and
  playwright rules (no waitForTimeout, no networkidle, no focused tests) via the two
  official plugins.
- ci actions are SHA-pinned to current releases with the version in a comment. tag refs
  are a supply-chain vector, pin new actions the same way.
- type-aware promise rules on src (`no-floating-promises`, `no-misused-promises`), the
  swallowed-rejection class. empty and rethrow-only catches were already covered by the
  recommended set, and strict TS makes catch variables `unknown`.
- `no-deprecated` on src: anything the installed packages mark `@deprecated` is an error,
  the dependency's own types are the denylist.

## 1

- initial shape. sveltekit + svelte 5 (runes forced), typescript strict, adapter-static
  with prerender on, pnpm pinned with the only-allow guard, eslint + prettier with the
  svelte plugins, vitest + playwright wired through make, two-job ci, deploy notes.
