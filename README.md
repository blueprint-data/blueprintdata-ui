# blueprint-ui

Design System de Blueprint, distribuido como **shadcn registry**. Instalable en cualquier repo Next.js + shadcn en dos pasos.

---

## Usar en otro repo

### 1. Registrar el namespace

En el `components.json` del repo consumidor, agregá la clave `registries`:

```json
{
  "registries": {
    "@blueprint": "https://blueprint-data.github.io/blueprintdata-ui/r/{name}.json"
  }
}
```

> Si ya tiene otros registries, solo agregá la clave `@blueprint` sin borrar las demás.

### 2. Instalar

```bash
npx shadcn@latest add @blueprint/blueprint-core --overwrite
```

Esto instala automáticamente:

- `src/components/ui/button.tsx`
- `src/components/ui/input.tsx`
- `src/components/ui/textarea.tsx`
- `src/components/ui/card.tsx`
- `src/components/ui/blueprint-card.tsx`
- Tokens CSS (colores, radios, sombras, focus ring) en `globals.css`

### 3. Usar

```tsx
import { BlueprintCard } from "@/components/ui/blueprint-card"
import { Button } from "@/components/ui/button"

export function Example() {
  return (
    <BlueprintCard title="Revenue" description="Last 30 days" interactive>
      <Button>Ver detalle</Button>
    </BlueprintCard>
  )
}
```

---

## Componentes disponibles

| Componente | Descripción |
|---|---|
| `Button` | Variantes `default`, `outline`, `secondary`, `ghost`, `link` + sizes `pill`, `pill-lg` |
| `Input` | Input con tokens Blueprint (altura, radius, focus ring) |
| `Textarea` | Textarea con tokens Blueprint |
| `Card` | Card base con subcomponentes `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter` |
| `BlueprintCard` | Card clásica Blueprint con props `title`, `description`, `interactive` |

---

## Agent Skills (Claude Code)

Las skills enseñan al agente todo sobre el design system: tokens, clases, componentes, patrones y reglas. Con ellas, Claude implementa UI Blueprint correctamente sin adivinar nada.

### Instalar en tu proyecto

```bash
npx degit blueprint-data/blueprintdata-ui/.agents/skills .agents/skills
```

Descarga todas las skills disponibles a `.agents/skills/` de tu repo. Incluye:

- `blueprint-ui` — tokens, clases bp-*, componentes, dark mode, patrones de composición
- `vercel-react-best-practices` — performance, re-renders, async, bundling
- `vercel-composition-patterns` — compound components, context, React 19
- `tailwind-v4-shadcn` — setup production-ready Tailwind v4 + shadcn
- `tailwind-css-patterns` — layout, responsive, animaciones
- `accessibility` — WCAG, patrones a11y
- `frontend-design` — principios de diseño UI/UX
- `seo` — SEO técnico y on-page

> Requiere que el proyecto tenga Claude Code configurado. Las skills se activan automáticamente cuando el agente detecta el contexto relevante.

---

## Desarrollo en este repo

```bash
npm install
npm run dev        # preview local
npm run registry:build  # genera public/r/*.json
```

### Estructura

- `registry.json` → definición del registry (items, deps, CSS vars)
- `registry/new-york/ui/` → fuente de los componentes
- `public/r/` → output del build (servido por GitHub Pages)
- `docs/consumption.md` → guía extendida de consumo
