---
name: blueprint-ui
description: |
  Blueprint Design System — shadcn-based registry with custom BP tokens.

  Use when: implementing UI in any project that consumes the blueprint-ui registry,
  adding or styling components with bp-* classes, working with Blueprint CSS tokens,
  building forms, cards, or layouts with the Blueprint design language.

  Covers: registry installation, all CSS tokens (foundation/semantic/component),
  bp-* class system, Button/Card/BlueprintCard/Input/Textarea component APIs,
  dark mode via semantic tokens, and common composition patterns.

  Keywords: blueprint-ui, blueprint-card, bp-btn, bp-card, bp-input, bp-textarea,
  brand-primary, brand-secondary, semantic tokens, shadcn registry, @blueprint,
  blueprint-core, design system, blueprint components
---

# Blueprint UI — Design System Skill

Shadcn-based registry with a custom design token layer. All components use semantic
CSS variables — dark mode is automatic, no `dark:` variants needed for semantic colors.

## When to Apply

- Implementing UI in a project that has `@blueprint` in `components.json`
- Styling elements with Blueprint's bp-* CSS classes
- Choosing color tokens, border radius, shadows, or focus rings
- Building forms, cards, layouts with Blueprint design language
- Debugging why a Blueprint component looks wrong

---

## Installation (Registry Consumer)

### 1. Register the namespace

Add to `components.json` of the consuming repo:

```json
{
  "registries": {
    "@blueprint": "https://blueprint-data.github.io/blueprintdata-ui/r/{name}.json"
  }
}
```

### 2. Install the core package

```bash
npx shadcn@latest add @blueprint/blueprint-core --overwrite
```

This installs:
- `src/components/ui/button.tsx`
- `src/components/ui/input.tsx`
- `src/components/ui/textarea.tsx`
- `src/components/ui/card.tsx`
- `src/components/ui/blueprint-card.tsx`
- CSS tokens injected into `globals.css`

### 3. Verify globals.css has the tokens

After install, `globals.css` should contain the `:root` block with BP tokens.
If tokens are missing, re-run the install command with `--overwrite`.

---

## CSS Token System

Three layers. Always prefer semantic tokens over foundation tokens in component code.

### Foundation (brand palette — use for brand-specific styling only)

```css
--brand-primary-500: #5151f3;   /* Indigo — primary actions, focus rings */
--brand-primary-600: #4040d9;   /* Darker indigo — hover states */
--brand-secondary-500: #22eaed; /* Cyan — secondary actions, accents */
--brand-secondary-600: #00c7cb; /* Darker cyan — secondary hover */
```

### Semantic (use these in component code — auto-switch in dark mode)

```css
/* Backgrounds */
--semantic-bg-page: #fafafa;                      /* Page background */
--semantic-surface-default: rgba(255,255,255,0.94); /* Cards, panels */
--semantic-surface-muted: #f8fafc;                /* Subtle backgrounds */

/* Text */
--semantic-text-strong: #111827;   /* Headings, important labels */
--semantic-text-body: #374151;     /* Body copy, descriptions */

/* Borders */
--semantic-border-subtle: rgba(229,231,235,0.95); /* Card borders, dividers */
```

### Component (sizing, radius, shadows — for layout/structure)

```css
--component-radius-card: 1rem;      /* Card border-radius */
--component-radius-pill: 9999px;    /* Pill/badge border-radius */
--component-shadow-card: 0 1px 3px rgba(0,0,0,0.04);             /* Default card shadow */
--component-shadow-card-hover: 0 20px 40px -15px rgba(0,0,0,0.09); /* Hover card shadow */
--component-input-radius: 0.75rem;  /* Input/textarea border-radius */
--component-input-height: 3rem;     /* Input height */
--component-textarea-min-height: 7rem; /* Textarea minimum height */
--component-focus-ring: rgba(81,81,243,0.24); /* Focus ring color (changes in dark) */
```

**Dark mode**: semantic tokens switch automatically. Foundation tokens stay the same.
Never hardcode `#111827` or `#fafafa` — use the semantic variables.

---

## CSS Class System (bp-*)

Global utility classes defined in `globals.css`. Apply directly to HTML elements
or compose via `cn()` in React.

### Cards

```css
.bp-card           /* Base card: rounded, bordered, subtle shadow, surface bg */
.bp-card-interactive  /* Add hover lift: translateY(-4px) + deeper shadow */
```

Usage:
```tsx
<div className="bp-card p-6">Static card</div>
<div className="bp-card bp-card-interactive p-6">Hover me</div>
```

### Buttons

```css
.bp-btn            /* Base: flex, centered, gap, pill radius, font-weight 600, transitions */
.bp-btn-primary    /* Indigo fill + glow shadow */
.bp-btn-secondary  /* Cyan fill */
.bp-btn-outline    /* Indigo border, transparent bg */
```

Always combine base + variant: `bp-btn bp-btn-primary`.

### Inputs & Textareas

```css
.bp-input     /* Border, bg, radius, min-height 3rem, focus ring */
.bp-textarea  /* Border, bg, radius, min-height 7rem, focus ring */
```

Focus state is automatic: `border-color: --brand-primary-500`, ring via `--component-focus-ring`.

---

## Component API

### Button

```tsx
import { Button } from "@/components/ui/button"

// Variants
<Button variant="default">Primary</Button>      // bp-btn-primary (default)
<Button variant="outline">Outline</Button>      // bp-btn-outline
<Button variant="secondary">Secondary</Button>  // bp-btn-secondary (cyan)
<Button variant="destructive">Delete</Button>   // red, use for destructive actions
<Button variant="ghost">Ghost</Button>          // no border, hover bg only
<Button variant="link">Link</Button>            // underline, no bg

// Sizes
<Button size="default">Default</Button>   // h-10 px-5
<Button size="sm">Small</Button>          // h-8 px-3
<Button size="lg">Large</Button>          // h-10 px-6
<Button size="pill">Pill</Button>         // h-10 px-6 rounded-full
<Button size="pill-lg">Pill LG</Button>   // h-14 px-8 text-base rounded-full
<Button size="icon">Icon</Button>         // size-9, square

// asChild — render as different element (link, anchor, etc.)
<Button asChild><a href="/dashboard">Go</a></Button>
```

### Card

Low-level primitive. Compose manually with sub-components.

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>Revenue</CardTitle>
    <CardDescription>Last 30 days</CardDescription>
  </CardHeader>
  <CardContent>
    <p>$12,400</p>
  </CardContent>
  <CardFooter>
    <Button variant="outline">View details</Button>
  </CardFooter>
</Card>
```

`Card` applies `bp-card` + semantic text color automatically.

### BlueprintCard (preferred high-level card)

Wraps Card with `title`, `description`, and `interactive` prop as shorthand.

```tsx
import { BlueprintCard } from "@/components/ui/blueprint-card"

// Static card
<BlueprintCard title="Revenue" description="Last 30 days">
  <p>$12,400</p>
</BlueprintCard>

// Interactive (hover lift)
<BlueprintCard title="Plan" description="Pro tier" interactive>
  <Button>Upgrade</Button>
</BlueprintCard>

// No header (full padding via contentClassName)
<BlueprintCard>
  <p>Content only</p>
</BlueprintCard>
```

Props: `title`, `description`, `interactive` (boolean), `className`, `headerClassName`, `contentClassName`, `children`.

### Input

```tsx
import { Input } from "@/components/ui/input"

<Input type="text" placeholder="Enter name..." />
<Input type="email" placeholder="you@example.com" />
<Input type="password" placeholder="Password" aria-invalid={hasError} />
```

Full width by default (`w-full`). `aria-invalid` adds red border automatically.

### Textarea

```tsx
import { Textarea } from "@/components/ui/textarea"

<Textarea placeholder="Describe the issue..." />
<Textarea rows={5} placeholder="Long description..." />
```

`field-sizing-content` applied — auto-grows with content.

---

## Dark Mode

Semantic tokens switch automatically. **No dark: variants needed for semantic colors.**

```tsx
// WRONG — don't do this for semantic colors
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">

// CORRECT — semantic tokens auto-switch
<div style={{ background: 'var(--semantic-bg-page)', color: 'var(--semantic-text-strong)' }}>

// Or use bp-* classes which already use semantic tokens
<div className="bp-card">Always correct in light and dark</div>
```

Dark mode is toggled via the `.dark` class on `<html>`. Pair with a ThemeProvider
that sets `document.documentElement.classList.toggle('dark', isDark)`.

---

## Common Patterns

### Form with label + input

```tsx
<div className="flex flex-col gap-1.5">
  <label className="text-sm font-medium" style={{ color: 'var(--semantic-text-strong)' }}>
    Email
  </label>
  <Input type="email" placeholder="you@example.com" />
  <p className="text-xs" style={{ color: 'var(--semantic-text-body)' }}>
    We'll never share your email.
  </p>
</div>
```

### CTA card

```tsx
<BlueprintCard title="Ready to ship?" description="Start your free trial today." interactive>
  <div className="flex gap-3 mt-4">
    <Button size="pill-lg">Get started</Button>
    <Button size="pill-lg" variant="outline">Learn more</Button>
  </div>
</BlueprintCard>
```

### Grid of cards

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => (
    <BlueprintCard key={item.id} title={item.name} description={item.meta} interactive>
      {item.content}
    </BlueprintCard>
  ))}
</div>
```

### Page section background

```tsx
<section style={{ background: 'var(--semantic-bg-page)' }}>
  <div className="max-w-6xl mx-auto px-4 py-16">
    {/* content */}
  </div>
</section>
```

### Inline style vs className

Prefer `className` with bp-* classes. Use inline `style={{ ... }}` only for
CSS variables that aren't covered by utility classes.

```tsx
// OK — bp-* class handles everything
<div className="bp-card bp-card-interactive p-6">

// OK — semantic variable not available as class
<p style={{ color: 'var(--semantic-text-body)' }}>

// AVOID — hardcoded colors break dark mode
<p style={{ color: '#374151' }}>
```

---

## Critical Rules

### DO
- Use `var(--semantic-*)` tokens for text, backgrounds, borders in custom code
- Use `BlueprintCard` for most card needs; drop to `Card` only for fine-grained control
- Combine `bp-btn` + `bp-btn-*` when writing raw HTML buttons (not using the Button component)
- Use `Button asChild` to render links as buttons without losing BP styles
- Pass `interactive` to `BlueprintCard` when the card is clickable/hoverable

### DON'T
- Don't add `dark:` variants for colors that already use semantic BP tokens
- Don't hardcode `#5151f3` or other brand hex values — use CSS variables
- Don't use `tailwind.config.ts` to define BP colors — they live in `globals.css`
- Don't use foundation tokens (`--brand-primary-500`) directly in component text/bg unless intentional brand emphasis
- Don't skip `--overwrite` on install — it ensures globals.css is updated

---

## Registry URL

```
https://blueprint-data.github.io/blueprintdata-ui/r/{name}.json
```

Namespace: `@blueprint`
Core package: `@blueprint/blueprint-core`
