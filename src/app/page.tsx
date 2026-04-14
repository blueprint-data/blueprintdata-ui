import type { CSSProperties, ReactNode } from "react"

import { BlueprintCard } from "@/components/ui/blueprint-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

type ColorTokenCase = {
  name: string
  cssVar: `--${string}`
  role: string
  useWhen: string
  avoidWhen: string
  snippet: string
}

type ComponentCaseCardProps = {
  title: string
  summary: string
  useWhen: string[]
  avoidWhen: string[]
  snippet: string
  preview: ReactNode
}

const lightColorCases: ColorTokenCase[] = [
  {
    name: "Primary 500",
    cssVar: "--brand-primary-500",
    role: "Acción principal",
    useWhen: "Botones CTA, links clave y acciones de confirmación.",
    avoidWhen: "Textos largos o bloques completos (satura demasiado).",
    snippet: "<Button>Guardar cambios</Button>"
  },
  {
    name: "Primary 600",
    cssVar: "--brand-primary-600",
    role: "Énfasis en interacción",
    useWhen: "Hover/active del primario y estados de énfasis.",
    avoidWhen: "Fondo base de layout o cards neutras.",
    snippet: ".cta:hover { background: var(--brand-primary-600); }"
  },
  {
    name: "Secondary 500",
    cssVar: "--brand-secondary-500",
    role: "Acción complementaria",
    useWhen: "Acciones secundarias con peso visual fuerte.",
    avoidWhen: "Competir con el CTA principal en la misma jerarquía.",
    snippet: "<Button variant=\"secondary\">Previsualizar</Button>"
  },
  {
    name: "Secondary 600",
    cssVar: "--brand-secondary-600",
    role: "Hover secundario",
    useWhen: "Hover/active de componentes secundarios.",
    avoidWhen: "Estado default del secundario en reposo.",
    snippet: ".secondary:hover { color: var(--brand-secondary-600); }"
  },
  {
    name: "Page Background",
    cssVar: "--semantic-bg-page",
    role: "Fondo de aplicación",
    useWhen: "Contenedor raíz y layout principal.",
    avoidWhen: "Elementos que requieren elevación visual (cards, popovers).",
    snippet: "body { background: var(--semantic-bg-page); }"
  },
  {
    name: "Surface Default",
    cssVar: "--semantic-surface-default",
    role: "Superficie elevada",
    useWhen: "Cards, inputs y bloques con borde + sombra.",
    avoidWhen: "Fondos generales de página.",
    snippet: "<Card className=\"bg-[var(--semantic-surface-default)]\" />"
  },
  {
    name: "Surface Muted",
    cssVar: "--semantic-surface-muted",
    role: "Contenedor suave",
    useWhen: "Helper blocks, snippets, zonas de apoyo visual.",
    avoidWhen: "Elementos de llamada a la acción.",
    snippet: "<div className=\"bg-[var(--semantic-surface-muted)]\">Tip</div>"
  },
  {
    name: "Border Subtle",
    cssVar: "--semantic-border-subtle",
    role: "Borde por defecto",
    useWhen: "Separar componentes sin ruido visual.",
    avoidWhen: "Estados de error/foco, donde se necesita contraste más fuerte.",
    snippet: "border: 1px solid var(--semantic-border-subtle);"
  }
]

const darkColorCases: ColorTokenCase[] = [
  {
    name: "Dark Page",
    cssVar: "--semantic-bg-page",
    role: "Fondo en modo oscuro",
    useWhen: "Wrapper principal de pantallas dark.",
    avoidWhen: "Componentes internos que ya usan surface tokens.",
    snippet: "<main className=\"dark bg-[var(--semantic-bg-page)]\" />"
  },
  {
    name: "Dark Surface",
    cssVar: "--semantic-surface-default",
    role: "Superficie dark",
    useWhen: "Cards/form controls en dark mode.",
    avoidWhen: "Texto o íconos (no garantiza contraste de lectura).",
    snippet: "<Card className=\"dark bg-[var(--semantic-surface-default)]\" />"
  },
  {
    name: "Dark Border",
    cssVar: "--semantic-border-subtle",
    role: "Borde dark",
    useWhen: "Definir límites en superficies oscuras.",
    avoidWhen: "Indicadores de error o warning.",
    snippet: "border-color: var(--semantic-border-subtle);"
  },
  {
    name: "Focus Ring",
    cssVar: "--component-focus-ring",
    role: "Accesibilidad de foco",
    useWhen: "`:focus-visible` en inputs, textareas y botones.",
    avoidWhen: "Hover normal o estados decorativos.",
    snippet: "box-shadow: 0 0 0 3px var(--component-focus-ring);"
  }
]

function SnippetBlock({ code }: { code: string }) {
  return (
    <pre className="mt-3 overflow-x-auto rounded-lg border border-[var(--semantic-border-subtle)] bg-[var(--semantic-surface-muted)] p-3 text-xs text-[var(--semantic-text-body)]">
      <code>{code}</code>
    </pre>
  )
}

function ColorTokenCaseCard({ token }: { token: ColorTokenCase }) {
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

      <h3 className="text-sm font-semibold text-[var(--semantic-text-strong)]">{token.name}</h3>
      <p className="text-xs text-[var(--semantic-text-body)]">{token.role}</p>

      <div className="mt-3 space-y-2 text-xs text-[var(--semantic-text-body)]">
        <p>
          <span className="font-semibold text-emerald-700 dark:text-emerald-300">Usar cuando:</span> {token.useWhen}
        </p>
        <p>
          <span className="font-semibold text-rose-700 dark:text-rose-300">Evitar:</span> {token.avoidWhen}
        </p>
      </div>

      <SnippetBlock code={token.snippet} />
    </article>
  )
}

function ComponentCaseCard({ title, summary, useWhen, avoidWhen, snippet, preview }: ComponentCaseCardProps) {
  return (
    <Card className="h-full">
      <CardHeader className="space-y-2">
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{summary}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="rounded-xl border border-[var(--semantic-border-subtle)] bg-[var(--semantic-surface-default)] p-4">
          {preview}
        </div>

        <div className="space-y-3 text-sm">
          <div>
            <p className="font-semibold text-emerald-700 dark:text-emerald-300">Usar cuando</p>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-[var(--semantic-text-body)]">
              {useWhen.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-semibold text-rose-700 dark:text-rose-300">No usar para</p>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-[var(--semantic-text-body)]">
              {avoidWhen.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <SnippetBlock code={snippet} />
      </CardContent>
    </Card>
  )
}

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-7xl space-y-12 px-4 py-10 md:px-8">
      <header className="space-y-4">
        <p className="inline-flex items-center rounded-full border border-[var(--semantic-border-subtle)] bg-[var(--semantic-surface-default)] px-3 py-1 text-xs font-medium text-[var(--semantic-text-body)]">
          Blueprint UI · Design System Playground
        </p>

        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Casos de uso del Design System</h1>
          <p className="max-w-3xl text-[var(--semantic-text-body)]">
            Cada bloque está armado con la misma estructura: <strong>preview</strong> + <strong>cuándo usar</strong> +
            <strong> cuándo evitar</strong> + <strong>snippet</strong>. Así podés validar diseño y tomar decisiones de
            implementación sin adivinar.
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
              2) Ajustá decisiones de uso mirando esta vitrina
            </p>
            <p>
              3) Publicá artifacts con <code>npm run registry:build</code>
            </p>
          </CardContent>
        </Card>
      </header>

      <section aria-labelledby="token-light-title" className="space-y-5">
        <div>
          <h2 id="token-light-title" className="text-2xl font-semibold tracking-tight">
            Tokens · Light (con criterio de uso)
          </h2>
          <p className="text-sm text-[var(--semantic-text-body)]">
            Cada token muestra su intención semántica y una regla clara para aplicarlo.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {lightColorCases.map((token) => (
            <ColorTokenCaseCard key={token.cssVar} token={token} />
          ))}
        </div>
      </section>

      <section aria-labelledby="token-dark-title" className="space-y-5">
        <div>
          <h2 id="token-dark-title" className="text-2xl font-semibold tracking-tight">
            Tokens · Dark (con criterio de uso)
          </h2>
          <p className="text-sm text-[var(--semantic-text-body)]">
            Contenedor aislado con <code>.dark</code> para validar contraste y foco en modo oscuro.
          </p>
        </div>

        <div
          className="dark rounded-2xl border border-[var(--semantic-border-subtle)] p-6 text-[var(--semantic-text-strong)]"
          style={{ backgroundColor: "var(--semantic-bg-page)" }}
        >
          <div className="mb-4">
            <p className="text-sm text-[var(--semantic-text-body)]">
              Si este bloque se entiende y mantiene contraste, tus tokens dark están bien calibrados.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {darkColorCases.map((token) => (
              <ColorTokenCaseCard key={`dark-${token.cssVar}`} token={token} />
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="components-title" className="space-y-5">
        <div>
          <h2 id="components-title" className="text-2xl font-semibold tracking-tight">
            Componentes · casos de uso
          </h2>
          <p className="text-sm text-[var(--semantic-text-body)]">
            Acá no sólo ves el componente: también queda explícita la decisión de diseño que lo justifica.
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <ComponentCaseCard
            title="Button · primary"
            summary="CTA principal del flujo"
            useWhen={[
              "Existe una única acción clave (guardar, confirmar, finalizar).",
              "Querés guiar la atención visual al próximo paso.",
              "La pantalla necesita jerarquía clara de acciones."
            ]}
            avoidWhen={[
              "Hay más de una acción igual de importante en el mismo bloque.",
              "La acción es destructiva (preferí variante destructiva).",
              "Es una acción secundaria de bajo impacto."
            ]}
            snippet="<Button>Guardar cambios</Button>"
            preview={
              <div className="flex flex-wrap gap-3">
                <Button>Guardar cambios</Button>
                <Button disabled>Procesando...</Button>
              </div>
            }
          />

          <ComponentCaseCard
            title="Button · secondary / outline"
            summary="Acciones complementarias sin romper jerarquía"
            useWhen={[
              "La acción acompaña al CTA principal (ej: previsualizar, cancelar).",
              "Necesitás mantener visibilidad sin competir con primary.",
              "El usuario puede deshacer o volver atrás."
            ]}
            avoidWhen={[
              "Querés forzar un paso principal del flujo.",
              "La acción requiere alerta alta (error/destructive).",
              "Necesitás botón ícono sin label y sin aria-label."
            ]}
            snippet={'<Button variant="secondary">Previsualizar</Button>\n<Button variant="outline">Cancelar</Button>'}
            preview={
              <div className="flex flex-wrap gap-3">
                <Button variant="secondary">Previsualizar</Button>
                <Button variant="outline">Cancelar</Button>
              </div>
            }
          />

          <ComponentCaseCard
            title="Input"
            summary="Captura de dato breve y estructurado"
            useWhen={[
              "Necesitás una sola línea (email, nombre, código, búsqueda).",
              "Querés feedback de estado (focus, disabled, error).",
              "La validación puede expresarse con helper text corto."
            ]}
            avoidWhen={[
              "La entrada es larga o multi-línea (usar Textarea).",
              "No hay label ni contexto semántico.",
              "Dependés solo del color para indicar error."
            ]}
            snippet={'<label htmlFor="email">Email</label>\n<Input id="email" type="email" aria-invalid />'}
            preview={
              <div className="space-y-3">
                <label htmlFor="showcase-email" className="text-sm font-medium text-[var(--semantic-text-strong)]">
                  Email
                </label>
                <Input id="showcase-email" type="email" placeholder="nombre@empresa.com" />
                <Input aria-invalid defaultValue="usuario@" aria-describedby="showcase-email-error" />
                <p id="showcase-email-error" className="text-xs text-rose-600 dark:text-rose-300">
                  Formato inválido: falta dominio.
                </p>
              </div>
            }
          />

          <ComponentCaseCard
            title="Textarea"
            summary="Contenido descriptivo o feedback extenso"
            useWhen={[
              "El usuario necesita explicar contexto o detalle.",
              "La respuesta puede superar una línea de texto.",
              "Querés mantener consistencia visual con Input."
            ]}
            avoidWhen={[
              "El dato tiene formato fijo de una línea (usar Input).",
              "Querés instrucciones largas dentro del placeholder.",
              "No podés ofrecer estado disabled/focus accesible."
            ]}
            snippet={'<Textarea\n  id="notes"\n  placeholder="Contanos el contexto..."\n/>'}
            preview={
              <div className="space-y-3">
                <label htmlFor="showcase-notes" className="text-sm font-medium text-[var(--semantic-text-strong)]">
                  Notas
                </label>
                <Textarea id="showcase-notes" placeholder="Escribí una descripción funcional..." />
              </div>
            }
          />

          <ComponentCaseCard
            title="Card + BlueprintCard"
            summary="Agrupar información por contexto funcional"
            useWhen={[
              "Querés encapsular contenido de una métrica, módulo o resumen.",
              "Necesitás separar visualmente bloques del dashboard.",
              "La interacción hover ayuda a indicar navegabilidad."
            ]}
            avoidWhen={[
              "Sólo querés un contenedor neutro sin jerarquía ni título.",
              "El bloque no tiene contenido suficiente para justificarse.",
              "Usás demasiadas cards en mobile sin priorización."
            ]}
            snippet={'<BlueprintCard title="Revenue" description="Last 30 days" interactive>\n  <p>+24.8%</p>\n</BlueprintCard>'}
            preview={
              <BlueprintCard title="Revenue" description="Last 30 days" interactive>
                <p className="text-sm text-[var(--semantic-text-body)]">+24.8% vs mes anterior</p>
              </BlueprintCard>
            }
          />
        </div>
      </section>

      <section aria-labelledby="registry-title">
        <Card>
          <CardHeader>
            <CardTitle id="registry-title">Registry endpoints</CardTitle>
            <CardDescription>Artifacts distribuidos para consumo externo</CardDescription>
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
