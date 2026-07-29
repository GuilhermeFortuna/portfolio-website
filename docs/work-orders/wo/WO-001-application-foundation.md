# WO-001 — Application Foundation

## Status

See [`WO-STATUS.md`](WO-STATUS.md). Dispatch only when the WO-001 row is `READY`.

## Result to Produce

A runnable Next.js repository with strict TypeScript, Tailwind CSS, ESLint, npm scripts, and no visual implementation beyond a plain diagnostic page.

## Prerequisites

None.

## Files to Create or Modify

```text
.gitignore
README.md
eslint.config.mjs
next-env.d.ts
next.config.ts
package.json
package-lock.json
postcss.config.mjs
tsconfig.json
src/app/globals.css
src/app/layout.tsx
src/app/page.tsx
```

Do not modify the governing documents or any other file under `docs/work-orders/`.

## Procedure

### 1. Inspect and protect the repository

Run:

```bash
git status --short
find . -maxdepth 2 -type f -not -path "./.git/*" | sort
```

Confirm `docs/` and `docs/work-orders/wo/` exist. Do not scaffold directly over the repository with a command that can replace them.

### 2. Generate a reference scaffold in a temporary directory

Create a temporary directory under `/tmp`, then run the current `create-next-app` with these choices:

- TypeScript: yes
- ESLint: yes
- Tailwind CSS: yes
- `src/` directory: yes
- App Router: yes
- Turbopack: use the generator default
- import alias: `@/*`
- package manager: npm

Use non-interactive flags when supported. Do not initialize another Git repository inside `portfolio-website`.

### 3. Copy only scaffold files

Copy the generated application/configuration files listed under “Files to Create or Modify” into this repository.

Do not copy:

- the temporary `.git/`
- `node_modules/`
- `.next/`
- generated README prose
- example public assets

Keep the generated dependency versions and committed `package-lock.json`.

### 4. Set exact scripts

`package.json` must expose:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit"
  }
}
```

Do not add test, format, deploy, or prepare scripts in this Work Order.

### 5. Set strict TypeScript

Confirm `tsconfig.json` contains:

```json
{
  "compilerOptions": {
    "strict": true,
    "noEmit": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

Keep other valid framework-generated compiler options.

### 6. Replace demo output with a diagnostic page

`src/app/page.tsx` must be a Server Component with no imports and this visible content:

```tsx
export default function Home() {
  return (
    <main>
      <h1>Portfolio prototype</h1>
      <p>Application foundation is ready.</p>
    </main>
  );
}
```

Remove all generator demo images, links, gradients, and cards.

### 7. Keep global CSS minimal

Keep the Tailwind import required by the generated version. Add only:

```css
* {
  box-sizing: border-box;
}

html {
  background: #06070a;
}

body {
  margin: 0;
}
```

WO-002 owns the final tokens and base styles.

### 8. Set minimal metadata

In `src/app/layout.tsx`:

- `lang="en"`
- title: `Portfolio`
- description: `Software engineering and applied AI portfolio.`
- no theme provider
- no analytics
- no extra client wrapper

### 9. Write operational README content

Replace the one-line README with:

- project name
- prerequisites: currently supported Node.js LTS and npm
- `npm install`
- `npm run dev`
- `npm run lint`
- `npm run typecheck`
- `npm run build`
- note that design requirements live in `docs/` and executable orders live in `docs/work-orders/wo/`

Do not add deployment instructions.

## Forbidden Changes

- No external visual component
- No animation dependency
- No icon library
- No shadcn setup
- No testing framework
- No `public/` assets
- No environment variables
- No deletion or relocation of existing documentation

## Automated Checks

Run in this order:

```bash
npm install
npm run lint
npm run typecheck
npm run build
```

## Manual Checks

- Start `npm run dev`.
- Load `/`.
- Confirm the two diagnostic lines render.
- Confirm the browser console contains no hydration error or uncaught exception.
- Confirm the pre-existing files under `docs/` are unchanged.

## Acceptance Checklist

- [ ] `package-lock.json` is committed-compatible and matches `package.json`.
- [ ] All five required npm scripts exist.
- [ ] Strict TypeScript is enabled.
- [ ] `@/*` resolves to `src/*`.
- [ ] The root page is a Server Component.
- [ ] No visual-effect dependency is installed.
- [ ] Lint passes.
- [ ] Type-check passes.
- [ ] Production build passes.
- [ ] Existing documentation remains intact.

## Handoff

Use the format in `docs/work-orders/wo/README.md`. Include the exact generated Next.js, React, Tailwind, and Node.js versions.
