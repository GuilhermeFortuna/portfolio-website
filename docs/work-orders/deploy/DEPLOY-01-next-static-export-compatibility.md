# DEPLOY-01 — Next Static Export Compatibility

## Status

See [`DEPLOY-STATUS.md`](DEPLOY-STATUS.md). Dispatch only while DEPLOY-01 is
`READY` and no VIZ worker is actively editing an overlapping file.

## Result to Produce

A Next.js application that retains the repository's normal server build for VIZ
review, while also producing a complete static export in `out/` when
`NEXT_OUTPUT=export` is set. Every generated route must be independently
servable; localized documents must have the correct language without relying on
request-time middleware or hydration.

## Prerequisites

- Record the dirty worktree before editing. Do not modify the Firebase dependency
  baseline from commit `4465540a`; DEPLOY-02 owns its validation and any exact
  pin adjustment.
- Re-read VIZ ownership. DEPLOY-01 may start only when no VIZ order is
  `IMPLEMENTING` in `src/app/layout.tsx` or `src/components/layout/**`.
- Preserve the existing VIZ runtime providers, font variables, metadata, route
  copy, route URLs, reduced-motion behavior, and normal `pnpm build` output.

## Files to Create, Move, Modify, or Delete

```text
next.config.ts
src/middleware.ts                                      # delete
src/lib/i18n.ts
src/lib/site-url.ts
src/lib/seo.ts
src/components/layout/root-document.tsx               # create shared root document
src/components/layout/language-switcher.tsx
src/app/layout.tsx                                    # delete after root split
src/app/(en)/layout.tsx                               # create
src/app/(en)/page.tsx                                 # move from src/app/page.tsx
src/app/(en)/work/{aegis,q,gosigapp,nexo-dental}/page.tsx
src/app/[lang]/layout.tsx
src/app/robots.ts
src/app/sitemap.ts
src/app/__tests__/{page,aegis-page,q-page,gosigapp-page,nexo-dental-page}.test.tsx
src/lib/__tests__/{i18n,seo}.test.ts
```

Moving a route into `(en)` must not change its public URL. Do not edit content,
case-study components, motion components, visual tokens, or media.

## Procedure

1. In `next.config.ts`, set `output` to `"export"` only when
   `process.env.NEXT_OUTPUT === "export"`; otherwise leave it undefined. Set
   `trailingSlash: true` only for the export build. Do not rename the output
   directory: Next's static output remains `out/`.
2. Create `root-document.tsx` as a server-safe shared document shell accepting
   an explicit `Locale` and `children`. It must render `<html lang>`, the
   existing Geist variables/body classes, `MotionRuntime`, `WebGLManager`, and
   `LanguageProvider` in the same runtime order as today.
3. Remove the top-level root layout and create two root-layout boundaries:
   `(en)/layout.tsx` supplies locale `en`; `[lang]/layout.tsx` validates the
   generated prefixed locale and supplies `pt-BR`. Each root layout renders
   `<html>` and `<body>` through the shared document. Keep `generateStaticParams`
   for every prefixed locale.
4. Move the unprefixed homepage and four English case-study pages under `(en)`.
   Update test imports only; do not change their routes, metadata, content, or
   component composition.
5. Delete `src/middleware.ts`, remove `localeHeader` from `i18n.ts`, and remove
   all `next/headers`, `NextRequest`, and `NextResponse` usage. Static export may
   not retain request-time cookies, headers, or redirects.
6. In `language-switcher.tsx`, remove `NEXT_LOCALE` cookie persistence. Continue
   deriving the target from `localizePathname` and navigating through the
   existing native Next router behavior. Crossing root layouts may perform a
   full document navigation; do not simulate middleware preference in client
   storage.
7. Make `robots.ts` and `sitemap.ts` build-time static by removing
   `force-dynamic`. Sitemap timestamps may be fixed at build time.
8. Update `getSiteUrl()` so `DEPLOY_ENV=staging` or `production` requires an
   explicit HTTPS `SITE_URL` or `NEXT_PUBLIC_SITE_URL`; throw a clear build error
   when it is missing/invalid. Preserve localhost fallback only for unlabelled
   local builds.
9. Add a narrow SEO helper that returns `noindex, nofollow` only when
   `DEPLOY_ENV=staging`. Apply it at both root layouts so every preview route
   inherits the policy. Staging canonical and alternate URLs still use the
   production `SITE_URL`.
10. Update tests for the route moves and the fixed static behavior. Add direct
    assertions for: no locale-header contract, explicit path localization,
    staging robots metadata, production/indexable metadata, and missing/invalid
    deployment URL errors.
11. Run the normal build first, then the static build. Inspect generated HTML;
    a successful command alone is insufficient.

## Forbidden Decisions

- Do not enable static export unconditionally; VIZ-006 still requires a normal
  `next build` followed by `next start` until its review contract changes.
- Do not add a client-side `Accept-Language` redirect, cookie replacement,
  flash-of-wrong-locale redirect, or Firebase i18n rewrite.
- Do not accept `<html lang="en">` in generated `/pt-BR/**` documents and rely
  on `useEffect` to repair it.
- Do not add `next/image` loaders; the repository currently uses no
  `next/image` component.
- Do not add Firebase configuration, dependencies, workflows, credentials, or
  cloud commands in this order.
- Do not rewrite unknown paths to the homepage.

## Automated Checks

```bash
pnpm test
pnpm lint
pnpm typecheck
pnpm build
rm -rf out && NEXT_OUTPUT=export DEPLOY_ENV=staging SITE_URL=https://example.invalid pnpm build
test -f out/index.html
test -f out/404.html
test -f out/work/aegis/index.html
test -f out/work/q/index.html
test -f out/work/gosigapp/index.html
test -f out/work/nexo-dental/index.html
test -f out/pt-BR/index.html
rg -n 'lang="pt-BR"' out/pt-BR/index.html
rg -n 'noindex' out/index.html out/pt-BR/index.html
! rg -n 'localhost:3000|x-locale|NEXT_LOCALE' out
git diff --check
```

`out/` is gitignored build output; removing it is permitted. Do not run a
recursive delete against any broader path.

## Manual Checks

- Run the normal production build with `next start`; verify `/`, one English
  case study, and `/pt-BR` load without hydration or console errors.
- Serve `out/` with a static file server and refresh every generated route above.
- Disable JavaScript on `/pt-BR`; confirm the document language and Portuguese
  content are correct before hydration.
- Switch EN → PT → EN from the homepage and one supported localized case study;
  confirm paths and section/hash behavior remain correct.

## Acceptance Checklist

- [ ] Normal `pnpm build` remains startable through `next start`.
- [ ] The environment-gated build produces `out/` with every expected route.
- [ ] No static-export unsupported request API remains.
- [ ] Every localized static document has the correct server-rendered `lang`.
- [ ] English public URLs and all existing route metadata remain unchanged.
- [ ] Staging output is `noindex, nofollow` and contains no localhost canonical.
- [ ] Locale switching works without a cookie or automatic language redirect.
- [ ] Full tests, lint, typecheck, both builds, HTML checks, and diff check pass.
- [ ] The committed Firebase dependency baseline is untouched.

## Handoff

Use the line's standard handoff. Include both build route tables, the exact list
of moved files, generated HTML evidence for `lang`/robots/canonical URLs, and the
normal `next start` browser result needed to show VIZ review was preserved.
