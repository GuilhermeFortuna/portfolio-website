<div align="center">

# ✦ Guilherme — Software & Applied AI Portfolio ✦

**Precise software emerging from fluid computational depth.**

A cinematic, high-performance engineering portfolio built with Next.js 16, React 19, Tailwind CSS v4, and custom WebGL shaders. Featuring iGaming fraud intelligence, quantitative execution systems, public-sector automation pipelines, and AI-first clinical product engineering.

[![Next.js](https://img.shields.io/badge/Next.js-16.2-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![WebGL / Three.js](https://img.shields.io/badge/WebGL-Three.js%20%7C%20OGL-black?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![Vitest](https://img.shields.io/badge/Vitest-4.1-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)](https://vitest.dev/)
[![i18n](https://img.shields.io/badge/i18n-EN%20%7C%20PT--BR-purple?style=for-the-badge)](https://nextjs.org/docs/app/building-your-application/routing/internationalization)

[Overview](#-overview) • [Key Features](#-key-engineering-highlights) • [Featured Work](#-featured-projects) • [Architecture](#%EF%B8%8F-visual--component-blueprint) • [Tech Stack](#%EF%B8%8F-tech-stack--architecture-matrix) • [i18n Engine](#-internationalization-i18n-architecture) • [Testing](#-testing--quality-assurance)

</div>

---

## 🌌 Overview

This repository houses the personal software engineering and applied AI portfolio of **Guilherme Fortuna**. Assembled as a single-page vertical experience in [`src/app/page.tsx`](file:///home/gui/projects/portfolio-website/src/app/page.tsx) alongside dedicated deep-dive case studies under [`src/app/work/`](file:///home/gui/projects/portfolio-website/src/app/work/), the platform presents complex technical case studies through a refined, dark-mode visual interface. Real-time GLSL canvas shaders and fluid micro-animations seamlessly blend with structured product engineering narratives.

The platform is designed with a strict separation between **static semantic content**, **responsive section layouts**, **internationalization (i18n) routing**, and **managed WebGL visual effects**, ensuring optimal accessibility, 60 FPS frame rates, and production maintainability.

---

## 💡 Key Engineering Highlights

- ⚡ **Centralized WebGL Subsystem (`WebGLManager`)**: A single arbiter governing GPU context acquisition, viewport intersection observation, device-pixel-ratio (DPR) caps, animation cost budgeting, frame pausing, and zero-JS static fallbacks.
- 🌐 **Multilingual i18n Subpath Engine**: Built-in bilingual support for **English (`en`)** and **Brazilian Portuguese (`pt-BR`)** with subpath routing (`/pt-BR`), cookie locale persistence, SEO hreflang tags, and document BCP-47 language synchronization.
- 🎬 **Persistent Aperture Stage Choreography**: Project showcase powered by a sticky 16:9 view aperture with animated panel choreography, responsive layout transitions, and interactive visual switching.
- 📖 **Deep Architectural Case Studies**: Dedicated case study routes for major flagship systems (**Aegis** and **Q Quantitative Systems**) detailing operational topologies, real-world metrics, and technical benchmarks.
- ♿ **100% WCAG & Reduced-Motion Compliant**: Complete compliance with `prefers-reduced-motion: reduce`. Canvas elements and `requestAnimationFrame` loops automatically unmount, rendering high-contrast static CSS/SVG fallbacks.
- 🎨 **Cinematic WebGL Shader Suite**: Custom GLSL line waves, liquid metallic chrome CTA buttons, interactive shape blur shaders, particle sparkles, scroll-triggered text reveals, and 3D dotted surface terrains.
- 🧪 **Enterprise QA & Contract Testing**: 132 Vitest unit and integration tests covering content schemas, layout primitives, motion runtimes, SEO headers, and i18n routing.

---

## 🚀 Featured Projects

The portfolio showcases four key engineering systems across AI, quantitative finance, public sector infrastructure, and clinical healthcare software:

| Project | Category | Key Highlights & Architecture | Deep Dive |
| :--- | :--- | :--- | :---: |
| **01 Aegis** | Fraud Intelligence | Enterprise fraud detection platform for high-throughput iGaming. Real-time graph neural networks, player risk scoring, anomaly detection pipelines, and automated dispute resolution. | [`/work/aegis`](file:///home/gui/projects/portfolio-website/src/app/work/aegis/page.tsx) |
| **02 Q** | Quantitative Systems | Institutional-grade quantitative research & execution engine. Event-driven backtesting, high-frequency order routing, risk management limits, and latency-optimized telemetry. | [`/work/q`](file:///home/gui/projects/portfolio-website/src/app/work/q/page.tsx) |
| **03 gosigapp** | Public-Sector Automation | Go backend pipeline handling public-sector SIGAP file validation, streaming processing, automatic retries, audit logs, and government submission. | Featured Showcase |
| **04 Nexo Dental** | Clinical SaaS | AI-first multi-tenant SaaS for dental clinics integrating clinical chart workflows, CRM, automated scheduling, and high-converting UX engineering. | Featured Showcase |

---

## 🎨 Visual & Component Blueprint

The core visual design philosophy is **"Precise software emerging from fluid computational depth."** Every visual shader component is encapsulated in a `ManagedWebGLEffect` shell and registered with the global `WebGLManager`.

```
                        ┌─────────────────────────────────────────────────────────┐
                        │                     WebGLManager                        │
                        │  (Viewport Intersection / DPR Cap / Motion Preference)  │
                        └────────────────────────────┬────────────────────────────┘
                                                     │
           ┌─────────────────────────┬───────────────┴───────────────┬─────────────────────────┐
           ▼                         ▼                               ▼                         ▼
  ┌─────────────────┐       ┌─────────────────┐             ┌─────────────────┐       ┌─────────────────┐
  │ Line Waves      │       │ Liquid Metal    │             │ Shape Blur      │       │ Dotted Surface  │
  │ (Hero Scene)    │       │ (Primary CTA)   │             │ (Project Card)  │       │ (Footer Scene)  │
  └────────┬────────┘       └────────┬────────┘             └────────┬────────┘       └────────┬────────┘
           │                         │                               │                         │
           └─────────────────────────┴───────────────┬───────────────┴─────────────────────────┘
                                                     ▼
                                   [ Static Fallback under Reduced Motion ]
```

### Locked Visual Components

| Order | Component | Module Location | Section | Visual & Architectural Role |
| :---: | :--- | :--- | :--- | :--- |
| **01** | **Line Waves** | [`src/components/effects/line-waves.tsx`](file:///home/gui/projects/portfolio-website/src/components/effects/line-waves.tsx) | Hero | Atmospheric primary background establishing visual identity |
| **02** | **Liquid Metal Link** | [`src/components/ui/liquid-metal-link.tsx`](file:///home/gui/projects/portfolio-website/src/components/ui/liquid-metal-link.tsx) | Hero | Primary call-to-action button with metallic fluid shaders |
| **03** | **Scroll Reveal** | [`src/components/effects/scroll-reveal.tsx`](file:///home/gui/projects/portfolio-website/src/components/effects/scroll-reveal.tsx) | About | Scroll-triggered narrative typography reveal |
| **04** | **Logo Loop** | [`src/components/ui/logo-loop.tsx`](file:///home/gui/projects/portfolio-website/src/components/ui/logo-loop.tsx) | Process | Dynamic sequence loop displaying engineering phases |
| **05** | **Sparkles** | [`src/components/effects/sparkles.tsx`](file:///home/gui/projects/portfolio-website/src/components/effects/sparkles.tsx) | Selected Work | Particle transition and heading accent |
| **06** | **Shape Blur** | [`src/components/effects/shape-blur.tsx`](file:///home/gui/projects/portfolio-website/src/components/effects/shape-blur.tsx) | Selected Work | Interactive WebGL shader displacement on project cards |
| **07** | **Dotted Surface** | [`src/components/effects/dotted-surface.tsx`](file:///home/gui/projects/portfolio-website/src/components/effects/dotted-surface.tsx) | Contact | 3D wave plane closing atmospheric scene above footer |

---

## 🛠️ Tech Stack & Architecture Matrix

| Domain | Technology | Description |
| :--- | :--- | :--- |
| **Core Framework** | [Next.js 16.2](https://nextjs.org/) | App Router, Server Components, Route Handlers, Metadata API |
| **UI Library** | [React 19.2](https://react.dev/) | React 19 Concurrent Features, Hooks, Server Action Readiness |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) | Strict type checking, interface schemas, contract definitions |
| **Graphics & 3D** | [Three.js](https://threejs.org/) / [OGL](https://github.com/oamap/ogl) | WebGL rendering pipeline, custom shaders, mesh geometries |
| **Shaders & Particles** | `@paper-design/shaders` / `@tsparticles` | GLSL post-processing effects and ambient particle fields |
| **Animation Engine** | [GSAP 3.15](https://greensock.com/gsap/) / Motion | Timeline orchestration, scroll triggers, aperture choreography |
| **Styling & Design** | [Tailwind CSS v4](https://tailwindcss.com/) | Next-generation utility-first styling with `@tailwindcss/postcss` |
| **Localization** | Custom i18n Subpath Engine | English & Portuguese (pt-BR) subpath routing and document sync |
| **Testing Suite** | [Vitest 4.1](https://vitest.dev/) / Testing Library | High-speed unit testing, JSDOM environment, contract validation |

---

## 📂 Project Structure

```
portfolio-website/
├── docs/                                 # Architecture specs & blueprint docs
│   ├── portfolio-component-blueprint.md  # Locked component set & visual direction
│   ├── component-provenance.md           # External component sources & adaptations
│   ├── content.md                        # Master content requirements
│   ├── aegis-case-study-content.md       # Aegis case study specification
│   ├── q-case-study-content.md           # Q quantitative case study specification
│   └── work-orders/                      # Executable work orders & task logs
├── public/                               # Static media, icons, & OG images
├── src/
│   ├── app/                              # Next.js App Router root
│   │   ├── [lang]/                       # Localized route group (/en, /pt-BR)
│   │   │   ├── page.tsx                  # Localized single-page homepage assembly
│   │   │   └── work/[slug]/              # Localized case study pages
│   │   ├── work/                         # English default case study routes
│   │   │   ├── aegis/page.tsx            # Aegis case study route
│   │   │   └── q/page.tsx                # Q Quantitative case study route
│   │   ├── layout.tsx                    # Root layout with fonts & metadata
│   │   ├── page.tsx                      # Root homepage delegator
│   │   └── globals.css                   # Global Tailwind v4 styles & CSS variables
│   ├── components/
│   │   ├── effects/                      # Visual effect canvas components
│   │   │   ├── dotted-surface.tsx        # 3D dotted surface terrain
│   │   │   ├── line-waves.tsx            # GLSL line wave background
│   │   │   ├── scroll-reveal.tsx         # Typography reveal controller
│   │   │   ├── shape-blur.tsx            # Interactive WebGL shape blur shader
│   │   │   └── sparkles.tsx              # Particle sparkle ambient field
│   │   ├── layout/                       # Structural page primitives
│   │   │   ├── language-switcher.tsx     # Dynamic EN / PT-BR language switcher
│   │   │   ├── section-shell.tsx         # Semantic section wrapper & containers
│   │   │   ├── site-header.tsx           # Sticky navigation header with locale controls
│   │   │   └── site-footer.tsx           # Footer with back-to-top trigger
│   │   ├── sections/                     # Homepage semantic sections
│   │   │   ├── hero-section.tsx          # Hero landing section
│   │   │   ├── selected-work-section.tsx # Showcase container section
│   │   │   ├── project-showcase.tsx      # Interactive project selector & detail viewer
│   │   │   ├── process-section.tsx       # Engineering sequence section
│   │   │   ├── about-section.tsx         # Professional biography section
│   │   │   └── contact-section.tsx       # Contact manifesto & direct links
│   │   ├── ui/                           # Reusable UI controls
│   │   │   ├── liquid-metal-link.tsx     # Custom metallic shader link button
│   │   │   └── logo-loop.tsx             # Infinite wordmark sequence loop
│   │   └── webgl/                        # WebGL Manager subsystem
│   │       ├── webgl-manager.tsx         # Global GPU context & lifecycle coordinator
│   │       └── managed-webgl-effect.tsx  # HOC wrapper for safe canvas mounting
│   ├── content/                          # Static site copy & project records
│   │   ├── case-studies/                 # Detailed case study content modules
│   │   │   ├── aegis.ts                  # Aegis case study data
│   │   │   └── q.ts                      # Q Quantitative case study data
│   │   ├── site.ts                       # Site metadata, bio, nav & contact links
│   │   └── projects.ts                   # Featured project records & descriptions
│   ├── hooks/                            # Custom React hooks
│   │   ├── use-effect-activity.ts        # Hook for WebGL visibility tracking
│   │   └── use-motion-preference.ts      # Media query hook for prefers-reduced-motion
│   ├── lib/                              # Core utilities & engines
│   │   ├── cn.ts                         # Class merging utility (clsx + tailwind-merge)
│   │   ├── i18n.ts                       # Locale configuration & subpath utility helpers
│   │   └── seo.ts                        # OpenGraph & JSON-LD metadata generation
│   ├── test/                             # Vitest custom setup & render helpers
│   └── types/                            # TypeScript interfaces & content schemas
├── eslint.config.mjs                     # ESLint flat configuration
├── next.config.ts                        # Next.js compiler settings
├── pnpm-lock.yaml                        # Locked dependency graph
├── postcss.config.mjs                    # PostCSS configuration
├── tsconfig.json                         # TypeScript configuration
└── vitest.config.ts                      # Vitest test suite configuration
```

---

## 🌐 Internationalization (i18n) Architecture

The portfolio implements a lightweight, zero-dependency subpath internationalization engine:

- **Locales Supported**: English (`en` — default, unprefixed) and Brazilian Portuguese (`pt-BR` — prefixed `/pt-BR`).
- **Routing Pattern**:
  - `https://domain.com/` $\rightarrow$ English Experience
  - `https://domain.com/pt-BR` $\rightarrow$ Brazilian Portuguese Experience
  - `https://domain.com/work/aegis` $\rightarrow$ English Aegis Case Study
  - `https://domain.com/pt-BR/work/aegis` $\rightarrow$ Portuguese Aegis Case Study
- **Cookie Persistence**: Preference is remembered via the `NEXT_LOCALE` cookie.
- **Language Switcher**: [`src/components/layout/language-switcher.tsx`](file:///home/gui/projects/portfolio-website/src/components/layout/language-switcher.tsx) permits instant locale switching while preserving current section position and subpath context.

---

## ⚡ Getting Started

### Prerequisites

- **Node.js**: `v18.x` or higher (LTS recommended)
- **pnpm**: `v11.x` or higher (pinned to `pnpm@11.17.0` via `packageManager`)

### Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/GuilhermeFortuna/portfolio-website.git
   cd portfolio-website
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Launch local development server**:
   ```bash
   pnpm run dev
   ```

4. **Open in browser**:
   Navigate to [http://localhost:3000](http://localhost:3000).

---

## ⚙️ Available Scripts

| Command | Description |
| :--- | :--- |
| `pnpm run dev` | Starts Next.js development server with hot-module reloading. |
| `pnpm run build` | Compiles optimized production build. |
| `pnpm run start` | Runs local server with compiled production build. |
| `pnpm run lint` | Runs ESLint analysis across the repository. |
| `pnpm run typecheck` | Executes TypeScript type safety checks (`tsc --noEmit`). |
| `pnpm run test` | Runs the Vitest test suite (132 tests). |
| `pnpm run test:coverage` | Generates HTML and text test coverage reports (`./coverage`). |

---

## ♿ Reduced Motion & Accessibility Architecture

Accessibility is built directly into the render lifecycle:

1. **Media Query Hook**: `useMotionPreference` tracks `(prefers-reduced-motion: reduce)`.
2. **Context Guard**: `WebGLManager` aborts WebGL context creation and disables animation frames when reduced motion is toggled.
3. **Static Graceful Fallbacks**:

| Shader / Visual Effect | Standard WebGL Render | Reduced-Motion Fallback |
| :--- | :--- | :--- |
| **Line Waves** | Animated GLSL wave mesh | Static subtle dark gradient |
| **Liquid Metal CTA** | Real-time liquid chrome shader | High-contrast metallic border |
| **Scroll Reveal** | Scroll-bound opacity transform | Clean static text typography |
| **Logo Loop** | Infinite scrolling badges | Static accessible badge grid |
| **Sparkles** | Particle field animation | Static radial ambient glow |
| **Shape Blur** | Interactive WebGL displacement | Clean static surface container |
| **Dotted Surface** | 3D wave plane geometry | Static 2D dot matrix pattern |

---

## 🧪 Testing & Quality Assurance

Comprehensive unit and integration testing powered by **Vitest**, **React Testing Library**, and **jsdom**.

### Test Suite Execution

```bash
# Run Vitest test suite once
pnpm run test

# Run tests with V8 coverage report
pnpm run test:coverage
```

### QA Pillars
- **Schema Contracts**: Ensures all site and case study copy conform to strict TypeScript interfaces.
- **Semantic HTML**: Validates single `<h1>` hierarchy, ARIA roles, landmark elements (`<main>`, `<header>`, `<footer>`), and accessible skip links.
- **Hardware Isolation**: WebGL, Three.js, GSAP, and particle runtimes are mocked out during test runs so execution remains fast, deterministic, and hardware-independent.

---

## 📖 Documentation Reference

Detailed specifications, design blueprints, and execution logs are maintained in [`docs/`](file:///home/gui/projects/portfolio-website/docs):

- 📐 [`docs/portfolio-component-blueprint.md`](file:///home/gui/projects/portfolio-website/docs/portfolio-component-blueprint.md): Locked component specifications, section layout maps, and visual direction.
- 📜 [`docs/component-provenance.md`](file:///home/gui/projects/portfolio-website/docs/component-provenance.md): Origin, licenses, and custom adaptations of shader/effect components.
- 📑 [`docs/content.md`](file:///home/gui/projects/portfolio-website/docs/content.md): Master copy specifications, tone of voice guidelines, and placeholder policies.
- 🛡️ [`docs/aegis-case-study-content.md`](file:///home/gui/projects/portfolio-website/docs/aegis-case-study-content.md): Detailed Aegis fraud intelligence case study specification.
- 📈 [`docs/q-case-study-content.md`](file:///home/gui/projects/portfolio-website/docs/q-case-study-content.md): Detailed Q quantitative execution engine specification.
- 📋 [`docs/work-orders/`](file:///home/gui/projects/portfolio-website/docs/work-orders/): Executable Work Orders tracking feature rollouts.

---

## 👤 Author & Contact

**Guilherme Fortuna**  
*Software Engineer · AI, Product Systems, Data & Infrastructure*

- 📧 **Email**: [guilhermefortuna1000@gmail.com](mailto:guilhermefortuna1000@gmail.com)
- 🐙 **GitHub**: [@GuilhermeFortuna](https://github.com/GuilhermeFortuna)
- 💼 **LinkedIn**: [Guilherme Fortuna dos Santos](https://www.linkedin.com/in/guilherme-fortuna-dos-santos/)
- ⏱️ **WakaTime**: [@GuilhermeFortuna](https://wakatime.com/@GuilhermeFortuna)

---

<div align="center">

*Designed & Engineered with precision.*  
© 2026 Guilherme Fortuna. All rights reserved.

</div>
