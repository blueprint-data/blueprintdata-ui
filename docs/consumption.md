# Blueprint UI – consumo en otros repos

Guía práctica para instalar la base del design system en cualquier repo de la organización.

## 0) Checklist: ¿está listo para subir?

En `blueprint-ui` verificá:

- Existe `registry.json`
- Existe `registry/new-york/ui/*`
- Existe `public/r/blueprint-core.json` luego del build
- El comando de build está en `package.json`: `registry:build`

Build:

```bash
npm install
npm run registry:build
```

## 1) Publicar el registry

Publicá este repo (Vercel/Cloudflare) y asegurate que los JSON queden accesibles:

- `https://blueprint-data.github.io/blueprintdata-ui/r/registry.json`
- `https://blueprint-data.github.io/blueprintdata-ui/r/blueprint-core.json`

Si todavía no inicializaste git en `blueprint-ui`:

```bash
git init
git add .
git commit -m "chore: bootstrap blueprint ui registry"
```

## 2) Configurar un repo consumidor

En el repo consumidor, abrí `components.json` y agregá:

```json
{
  "registries": {
    "@blueprint": "https://blueprint-data.github.io/blueprintdata-ui/r/{name}.json"
  }
}
```

> Si ya hay otros registries, solo agregá la clave `@blueprint` sin borrar las demás.

## 3) Instalar la base

```bash
npx shadcn@latest add @blueprint/blueprint-core --overwrite
```

Esto instala:

- `src/components/ui/button.tsx`
- `src/components/ui/input.tsx`
- `src/components/ui/textarea.tsx`
- `src/components/ui/card.tsx`
- `src/components/ui/blueprint-card.tsx` (card clásica de Blueprint)
- Variables/tokens y reglas CSS en `src/app/globals.css`

Uso rápido de la card clásica:

```tsx
import { BlueprintCard } from "@/components/ui/blueprint-card"

export function Example() {
  return (
    <BlueprintCard title="Revenue" description="Last 30 days" interactive>
      <p className="text-sm text-[var(--semantic-text-body)]">+24.8%</p>
    </BlueprintCard>
  )
}
```

## 4) Prueba local rápida (sin deploy)

Desde `blueprint-ui`, levantar estático del `public/`:

```bash
python3 -m http.server 4010 --directory public
```

Y en otro repo, instalar por URL directa:

```bash
npx shadcn@latest add http://127.0.0.1:4010/r/blueprint-core.json --overwrite
```

## Público o privado: ¿qué conviene?

### Recomendación para organización

- **Repo Git privado** ✅ (código y evolución interna)
- **Endpoint `/r/*.json` público de solo lectura** ✅ (adopción simple en todos los repos)

### Cuándo hacerlo totalmente privado

Si necesitás que nadie externo pueda instalar los componentes, podés proteger el endpoint y configurar auth en `components.json` con headers/token. Es más seguro, pero agrega fricción operativa.

## Troubleshooting

- Error `Couldn't find tsconfig.json`: agregá `tsconfig.json` al repo consumidor.
- Error con paths `@/`: verificá `aliases` en `components.json`.
- No aparece `/r/blueprint-core.json`: ejecutá `npm run registry:build` antes de deploy.
