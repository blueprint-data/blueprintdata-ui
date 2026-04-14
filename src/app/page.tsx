import type { CSSProperties } from "react"

import { BlueprintCard } from "@/components/ui/blueprint-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

type ColorToken = {
  name: string
  cssVar: `--${string}`
  description: string
}

const lightTokens: ColorToken[] = [
  { name: "Primary 500", cssVar: "--brand-primary-500", description: "Color principal de marca" },
  { name: "Primary 600", cssVar: "--brand-primary-600", description: "Hover / énfasis principal" },
  { name: "Secondary 500", cssVar: "--brand-secondary-500", description: "Color secundario de marca" },
  { name: "Secondary 600", cssVar: "--brand-secondary-600", description: "Hover / énfasis secundario" },
  { name: "Page Background", cssVar: "--semantic-bg-page", description: "Fondo base de pantalla" },
  { name: "Surface Default", cssVar: "--semantic-surface-default", description: "Superficie de cards y fields" },
  { name: "Surface Muted", cssVar: "--semantic-surface-muted", description: "Bloques suaves / alternativos" },
  { name: "Border Subtle", cssVar: "--semantic-border-subtle", description: "Borde por defecto" }
]

const darkTokens: ColorToken[] = [
  { name: "Dark Page", cssVar: "--semantic-bg-page", description: "Fondo en modo oscuro" },
  { name: "Dark Surface", cssVar: "--semantic-surface-default", description: "Superficie en modo oscuro" },
  { name: "Dark Surface Muted", cssVar: "--semantic-surface-muted", description: "Bloques secundarios" },
  { name: "Dark Border", cssVar: "--semantic-border-subtle", description: "Borde en modo oscuro" },
  { name: "Focus Ring", cssVar: "--component-focus-ring", description: "Resaltado de foco" }
]

function ColorTokenCard({ token }: { token: ColorToken }) {
  const colorStyle: CSSProperties = {
    backgroundColor: `var(${token.cssVar})`
  }

  return (
    <article className="bp-card p-4">
      <div
        className="mb-3 h-16 w-full rounded-md border border-[var(--semantic-border-subtle)]"
        style={colorStyle}
        aria-hidden="true"
      />
      <p className="text-sm font-semibold text-[var(--semantic-text-strong)]">{token.name}</p>
      <p className="text-xs text-[var(--semantic-text-body)]">{token.description}</p>
      <code className="mt-2 inline-block rounded bg-[var(--semantic-surface-muted)] px-2 py-1 text-xs text-[var(--semantic-text-body)]">
        {token.cssVar}
      </code>
    </article>
  )
}

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-7xl space-y-12 px-4 py-10 md:px-8">
      <header className="space-y-4">
        <p className="inline-flex items-center rounded-full border border-[var(--semantic-border-subtle)] bg-[var(--semantic-surface-default)] px-3 py-1 text-xs font-medium text-[var(--semantic-text-body)]">
          Blueprint UI · Design System Showcase
        </p>

        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Tu Design System</h1>
          <p className="max-w-3xl text-[var(--semantic-text-body)]">
            Esta home ahora funciona como vitrina del sistema de diseño: tokens, colores, componentes y estados
            interactivos. Pasá el mouse, hacé foco y probá estados para validar paridad visual antes de publicar el
            registry.
          </p>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Workflow rápido</CardTitle>
            <CardDescription>Preview local + distribución por registry</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-[var(--semantic-text-body)]">
            <p>
              1) Levantá preview local con <code>npm run dev</code>
            </p>
            <p>
              2) Regenerá artifacts con <code>npm run registry:build</code>
            </p>
            <p>
              3) Consumí componentes desde <code>/r/blueprint-core.json</code>
            </p>
          </CardContent>
        </Card>
      </header>

      <section aria-labelledby="token-light-title" className="space-y-5">
        <div>
          <h2 id="token-light-title" className="text-2xl font-semibold tracking-tight">
            Tokens · Light
          </h2>
          <p className="text-sm text-[var(--semantic-text-body)]">
            Paleta principal, superficies y bordes usados por los componentes core.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {lightTokens.map((token) => (
            <ColorTokenCard key={token.cssVar} token={token} />
          ))}
        </div>
      </section>

      <section aria-labelledby="token-dark-title" className="space-y-5">
        <div>
          <h2 id="token-dark-title" className="text-2xl font-semibold tracking-tight">
            Tokens · Dark Preview
          </h2>
          <p className="text-sm text-[var(--semantic-text-body)]">
            Contenedor aislado con clase <code>.dark</code> para validar contraste y legibilidad.
          </p>
        </div>

        <div className="dark rounded-2xl border border-[var(--semantic-border-subtle)] p-6 text-[var(--semantic-text-strong)]" style={{ backgroundColor: "var(--semantic-bg-page)" }}>
          <div className="mb-4">
            <p className="text-sm text-[var(--semantic-text-body)]">
              Sección en modo oscuro: validá superficies, bordes y foco sin cambiar todo el layout.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {darkTokens.map((token) => (
              <ColorTokenCard key={`dark-${token.cssVar}`} token={token} />
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="components-title" className="space-y-5">
        <div>
          <h2 id="components-title" className="text-2xl font-semibold tracking-tight">
            Componentes core
          </h2>
          <p className="text-sm text-[var(--semantic-text-body)]">
            Botones, campos y cards con estados base del Design System.
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <BlueprintCard title="Buttons · variants" description="Default, secondary, outline, disabled">
            <div className="flex flex-wrap gap-3">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button disabled>Disabled</Button>
            </div>
          </BlueprintCard>

          <BlueprintCard title="Buttons · sizes" description="Escalas listas para usar">
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button>Default</Button>
              <Button size="pill">Pill</Button>
              <Button size="pill-lg">Pill Large</Button>
              <Button size="icon" aria-label="Abrir acciones rápidas">
                →
              </Button>
            </div>
          </BlueprintCard>
        </div>
      </section>

      <section aria-labelledby="forms-title" className="space-y-5">
        <div>
          <h2 id="forms-title" className="text-2xl font-semibold tracking-tight">
            Form controls
          </h2>
          <p className="text-sm text-[var(--semantic-text-body)]">Probá foco, disabled y error semántico.</p>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <BlueprintCard title="Input" description="Estados de campo">
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="demo-email" className="text-sm font-medium text-[var(--semantic-text-strong)]">
                  Email
                </label>
                <Input id="demo-email" type="email" placeholder="nombre@empresa.com" aria-describedby="demo-email-hint" />
                <p id="demo-email-hint" className="text-xs text-[var(--semantic-text-body)]">
                  Tip: usá tab para ver focus ring.
                </p>
              </div>

              <div className="space-y-2">
                <label htmlFor="demo-email-disabled" className="text-sm font-medium text-[var(--semantic-text-strong)]">
                  Email (disabled)
                </label>
                <Input id="demo-email-disabled" type="email" defaultValue="readonly@blueprint.io" disabled />
              </div>

              <div className="space-y-2">
                <label htmlFor="demo-email-invalid" className="text-sm font-medium text-[var(--semantic-text-strong)]">
                  Email (error)
                </label>
                <Input
                  id="demo-email-invalid"
                  defaultValue="usuario@"
                  aria-invalid
                  aria-describedby="demo-email-error"
                />
                <p id="demo-email-error" className="text-xs text-rose-600 dark:text-rose-300">
                  Formato inválido: falta dominio.
                </p>
              </div>
            </div>
          </BlueprintCard>

          <BlueprintCard title="Textarea" description="Campo multi-línea">
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="demo-message" className="text-sm font-medium text-[var(--semantic-text-strong)]">
                  Mensaje
                </label>
                <Textarea id="demo-message" placeholder="Escribí una descripción funcional..." />
              </div>

              <div className="space-y-2">
                <label htmlFor="demo-message-disabled" className="text-sm font-medium text-[var(--semantic-text-strong)]">
                  Mensaje (disabled)
                </label>
                <Textarea id="demo-message-disabled" defaultValue="No editable" disabled />
              </div>
            </div>
          </BlueprintCard>
        </div>
      </section>

      <section aria-labelledby="cards-title" className="space-y-5">
        <div>
          <h2 id="cards-title" className="text-2xl font-semibold tracking-tight">
            Cards
          </h2>
          <p className="text-sm text-[var(--semantic-text-body)]">Card base y BlueprintCard interactiva.</p>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <Card className="bp-card-interactive">
            <CardHeader>
              <CardTitle>Card base</CardTitle>
              <CardDescription>Composición manual con slots</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-[var(--semantic-text-body)]">
                Esta variante usa los slots nativos: header, content y footer según necesidad.
              </p>
              <Button size="sm" variant="outline">
                Ver detalles
              </Button>
            </CardContent>
          </Card>

          <BlueprintCard title="BlueprintCard" description="Versión clásica con hover" interactive>
            <p className="text-sm text-[var(--semantic-text-body)]">
              Reutilizable para métricas, resumen de módulos y bloques de dashboard.
            </p>
          </BlueprintCard>
        </div>
      </section>

      <section aria-labelledby="registry-title">
        <Card>
          <CardHeader>
            <CardTitle id="registry-title">Registry endpoints</CardTitle>
            <CardDescription>Acceso directo a los artifacts distribuidos</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>
              <a className="underline" href="/r/registry.json">
                /r/registry.json
              </a>
            </p>
            <p>
              <a className="underline" href="/r/blueprint-core.json">
                /r/blueprint-core.json
              </a>
            </p>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
