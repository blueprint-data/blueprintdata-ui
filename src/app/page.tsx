export default function Home() {
  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "3rem 1rem" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Blueprint UI Registry</h1>
      <p style={{ marginBottom: "1rem", color: "var(--semantic-text-body)" }}>
        Este repo distribuye la base del design system para todos los proyectos vía shadcn registry.
      </p>
      <div className="bp-card" style={{ padding: "1rem" }}>
        <p>
          1) Ejecutá <code>npm run registry:build</code>
        </p>
        <p>
          2) Publicá este proyecto y consumí <code>/r/blueprint-core.json</code>
        </p>
        <p>
          3) En cada repo: <code>npx shadcn@latest add @blueprint/blueprint-core --overwrite</code>
        </p>
      </div>
    </main>
  )
}
