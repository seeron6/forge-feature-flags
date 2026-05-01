# forge-feature-flags

Targeted rollouts, kill switches, and experiment scaffolding.

> A Forge framework. **Live preview**: https://cdn.jsdelivr.net/gh/seeron6/forge-feature-flags@main/preview/index.html

## What it is

Boolean and JSON-valued flags with cohort targeting, percentage rollouts, instant kill switches, and an experiment harness that records assignment + outcome.

## Features

- **Boolean flags** — Targeted on/off
- **JSON values** — Config-as-flag
- **% rollout** — Sticky-bucket assignment
- **Kill switch** — Sub-second propagation

## Stack

`go`, `redis`, `postgres`

## Layout

```
src/
└── index.ts          # Reference implementation
preview/
└── index.html        # Live preview surface (loaded by Forge sandbox)
forge.config.json     # Registry manifest (stripped at fork time)
forge.schema.json     # Config schema — drives the dashboard UI
```

## Forking

This repo is a GitHub template. Fork it through the Forge dashboard or directly via:

```
gh repo create your-org/your-feature-flags --template seeron6/forge-feature-flags --public
```

When you fork through Forge, the registry records the diff and links your fork
to the variant tree.

---

Forge is a living framework registry — every fork sharpens the next adoption.
Browse more at the registry: <https://github.com/seeron6/ForgeAI>.
