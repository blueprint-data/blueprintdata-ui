# blueprint-ui

Base de Design System replicable para la organización, distribuida con **shadcn registry**.

## Quick start

```bash
npm install
npm run dev
```

## Build del registry

```bash
npm run registry:build
```

Salida esperada: `public/r/blueprint-core.json`.

## Estructura clave

- `registry.json` → índice del registry
- `registry/new-york/ui/*` → componentes distribuibles
- `src/app/globals.css` → tokens y clases base
- `docs/consumption.md` → cómo consumir en otros repos

Incluye primitives base (`button`, `input`, `textarea`, `card`) y `blueprint-card` (card clásica de Blueprint).
