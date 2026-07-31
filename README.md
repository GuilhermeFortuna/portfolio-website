<div align="center">

# ✦ Guilherme — Software & Applied AI Portfolio ✦

**Precise software emerging from fluid computational depth.**

A cinematic, high-performance engineering portfolio built with Next.js 16, React 19, Tailwind CSS v4, and custom WebGL shaders. Featuring fraud intelligence, quantitative execution systems, public-sector automation pipelines, and AI-first product engineering.

[![Next.js](https://img.shields.io/badge/Next.js-16.2-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![WebGL / Three.js](https://img.shields.io/badge/WebGL-Three.js%20%7C%20OGL-black?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![Vitest](https://img.shields.io/badge/Vitest-4.1-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)](https://vitest.dev/)

[Live Experience](#-getting-started) • [Featured Work](#-featured-projects) • [Architecture](#%EF%B8%8F-architecture--webgl-engine) • [Component Blueprint](#-visual--component-blueprint) • [Testing](#-testing--quality-assurance)

</div>

---

## 🌌 Overview

This repository houses the personal software engineering and applied AI portfolio of **Guilherme Fortuna**. The platform is designed as a single-page vertical experience assembled in [`src/app/page.tsx`](file:///home/gui/projects/portfolio-website/src/app/page.tsx). It presents complex technical case studies through a refined, dark-mode visual interface where real-time GLSL canvas shaders and fluid micro-animations seamlessly blend with structured product engineering narratives.

The site is built with a strict separation between **static semantic content**, **responsive section layouts**, and **managed WebGL visual effects**, ensuring optimal accessibility, frame rates, and maintainability.

---

## 💡 Key Engineering Features

- ⚡ **Centralized WebGL Manager (`WebGLManager`)**: Single arbiter governing context acquisition, viewport intersection observation, device-pixel-ratio caps, animation cost budgeting, frame pausing, and static fallbacks.
- ♿ **100% Accessible & Reduced-Motion Compliant**: Complete compliance with `prefers-reduced-motion: reduce`. Canvas elements and `requestAnimationFrame` loops automatically unmount and fall back to static CSS/SVG equivalents.
- 🎨 **Cinematic Graphic Shaders & Effects**: Custom GLSL line waves, liquid metallic chrome CTA buttons, interactive shape blur shaders, particle sparkles, scroll-triggered text reveals, and 3D dotted surface terrains.
- 🛠️ **Decoupled Architecture**: Content lives strictly in [`src/content`](file:///home/gui/projects/portfolio-website/src/content), section layouts in [`src/components/sections`](file:///home/gui/projects/portfolio-website/src/components/sections), and visual effects in [`src/components/effects`](file:///home/gui/projects/portfolio-website/src/components/effects).
- 📱 **Adaptive Performance Budgeting**: Automatically scales resolution based on hardware concurrency, limits pixel ratios, and halts background animation frames when out of viewport.
- 🧪 **Rigorous Quality Assurance**: Vitest unit and contract test suite covering site content, layout primitives, and interaction states.

---

## 🚀 Featured Projects

The portfolio showcases four key engineering projects across AI, quantitative finance, public sector infrastructure, and healthcare software:

| Project | Category | Overview |
| :--- | :--- | :--- |
| **01 Aegis** | Fraud Intelligence | Fraud intelligence and investigation software tailored for the high-throughput iGaming industry. |
| **02 Q** | Quantitative Systems | Quantitative research and execution engine spanning backtesting, strategy optimization, high-frequency data pipelines, and execution architecture. |
| **03 gosigapp** | Public-Sector Automation | Go backend pipeline handling SIGAP file validation, streaming processing, automatic retries, auditability, and submission. |
| **04 Nexo Dental** | Clinical Software | AI-first, multi-tenant SaaS for dental clinics integrating clinical workflows, CRM, automated scheduling, and premium UX engineering. |

---

## 🎨 Visual & Component Blueprint

The visual thesis of this site is **"Precise software emerging from fluid computational depth."** Every visual effect component is wrapped in a `ManagedWebGLEffect` shell and registered with the global `WebGLManager`.

```
        ┌─────────────────────────────────────────────────────────┐
        │                     WebGLManager                        │
        │  (Viewport Intersection / DPR Cap / Motion Preference)  │
        └────────────────────────────┬────────────────────────────┘
                                     │
           ┌─────────────────────────┼─────────────────────────┐
           ▼                         ▼                         ▼
  ┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
  │ Line Waves      │       │ Liquid Metal    │       │ Shape Blur      │
  │ (Hero Scene)    │       │ (Primary CTA)   │       │ (Project Card)  │
  └────────┬────────┘       └────────┬────────┘       └────────┬────────┘
           │                         │                         │
           └─────────────────────────┼─────────────────────────┘
                                     ▼
                   [ Static Fallback under Reduced Motion ]
```

### Locked Visual Components

| Order | Component | Module Location | Section | Visual Role |
| :---: | :--- | :--- | :--- | :--- |
| **01** | **Line Waves** | [`src/components/effects/line-waves.tsx`](file:///home/gui/projects/portfolio-website/src/components/effects/line-waves.tsx) | Hero | Atmospheric primary background establishing visual identity |
| **02** | **Liquid Metal Link** | [`src/components/ui/liquid-metal-link.tsx`](file:///home/gui/projects/portfolio-website/src/components/ui/liquid-metal-link.tsx) | Hero | Primary call-to-action button with metallic fluid shaders |
| **03** | **Scroll Reveal** | [`src/components/effects/scroll-reveal.tsx`](file:///home/gui/projects/portfolio-website/src/components/effects/scroll-reveal.tsx) | About | Scroll-triggered narrative typography reveal |
| **04** | **Logo Loop** | [`src/components/ui/logo-loop.tsx`](file:///home/gui/projects/portfolio-website/src/components/ui/logo-loop.tsx) | Process | Dynamic sequence loop displaying engineering phases |
| **05** | **Sparkles** | [`src/components/effects/sparkles.tsx`](file:///home/gui/projects/portfolio-website/src/components/effects/sparkles.tsx) | Selected Work | Particle transition and heading accent |
| **06** | **Shape Blur** | [`src/components/effects/shape-blur.tsx`](file:///home/gui/projects/portfolio-website/src/components/effects/shape-blur.tsx) | Selected Work | Interactive WebGL shader displacement on project cards |
| **07** | **Dotted Surface** | [`src/components/effects/dotted-surface.tsx`](file:///home/gui/projects/portfolio-website/src/components/effects/dotted-surface.tsx) | Contact | 3D wave plane closing atmospheric scene above footer |

---

## 🛠️ Tech Stack & Architecture

### Core Frameworks & Runtime
- **Framework**: [Next.js 16.2](https://nextjs.org/) (App Router, Server Components)
- **Library**: [React 19.2](https://react.dev/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Runtime**: Node.js LTS

### WebGL & Animation Engines
- **3D Renderers**: [Three.js](https://threejs.org/), [OGL](https://github.com/oamap/ogl)
- **Shaders**: [`@paper-design/shaders`](https://www.npmjs.com/package/@paper-design/shaders)
- **Particles**: [`@tsparticles/react`](https://particles.js.org/) & `@tsparticles/slim`
- **Timeline Motion**: [GSAP 3.15](https://greensock.com/gsap/)

### Styling & Design System
- **CSS Framework**: [Tailwind CSS v4](https://tailwindcss.com/)
- **PostCSS Integrations**: `@tailwindcss/postcss`
- **Class Utilities**: `clsx`, `tailwind-merge`

### Testing & Quality Assurance
- **Test Runner**: [Vitest 4](https://vitest.dev/)
- **DOM Environment**: `jsdom`
- **Testing Library**: `@testing-library/react` & `@testing-library/user-event`
- **Coverage**: `@vitest/coverage-v8`

---

## 📂 Project Structure

```
portfolio-website/
├── docs/                                 # Architecture specs & blueprint docs
│   ├── portfolio-component-blueprint.md  # Locked component set & visual direction
│   ├── component-provenance.md           # External component sources & adaptations
│   ├── content.md                        # Master content requirements
│   └── work-orders/                      # Executable work orders & task logs
├── public/                               # Static assets and favicons
├── src/
│   ├── app/                              # Next.js App Router root
│   │   ├── layout.tsx                    # Root layout with fonts & metadata
│   │   ├── page.tsx                      # Single-page homepage assembly
│   │   └── globals.css                   # Global Tailwind v4 styles & CSS variables
│   ├── components/
│   │   ├── effects/                      # Visual effect canvas components
│   │   │   ├── dotted-surface.tsx        # 3D dotted surface terrain
│   │   │   ├── line-waves.tsx            # GLSL line wave background
│   │   │   ├── scroll-reveal.tsx         # Typography reveal controller
│   │   │   ├── shape-blur.tsx            # Interactive WebGL shape blur shader
│   │   │   └── sparkles.tsx              # Particle sparkle ambient field
│   │   ├── layout/                       # Structural page primitives
│   │   │   ├── section-shell.tsx         # Semantic section wrapper & containers
│   │   │   ├── site-header.tsx           # Sticky navigation header
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
│   │   ├── site.ts                       # Site metadata, bio, nav & contact links
│   │   └── projects.ts                   # Featured project records & descriptions
│   ├── hooks/                            # Custom React hooks
│   │   ├── use-effect-activity.ts        # Hook for WebGL visibility tracking
│   │   └── use-motion-preference.ts      # Media query hook for prefers-reduced-motion
│   ├── lib/                              # Utility helpers
│   │   └── cn.ts                         # Class merging utility (clsx + tailwind-merge)
│   ├── test/                             # Vitest custom setup & render helpers
│   └── types/                            # TypeScript interfaces & content schemas
├── eslint.config.mjs                     # ESLint flat configuration
├── next.config.ts                        # Next.js compiler settings
├── postcss.config.mjs                    # PostCSS configuration
├── tsconfig.json                         # TypeScript configuration
└── vitest.config.ts                      # Vitest test suite configuration
```

---

## ⚡ Getting Started

### Prerequisites

Ensure you have the following installed on your environment:
- **Node.js**: `v18.x` or higher (LTS recommended)
- **pnpm**: `v11.x` or higher (the repository pins `pnpm@11.17.0` through the `packageManager` field; `corepack enable` will honour it)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/GuilhermeFortuna/portfolio-website.git
   cd portfolio-website
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Launch the development server:
   ```bash
   pnpm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## ⚙️ Building & Scripts

| Command | Action |
| :--- | :--- |
| `pnpm run dev` | Starts the Next.js local development server with HMR. |
| `pnpm run build` | Compiles the production build bundle. |
| `pnpm run start` | Serves the optimized production build locally. |
| `pnpm run lint` | Runs ESLint checks across the codebase. |
| `pnpm run typecheck` | Executes TypeScript type checking without emitting files (`tsc --noEmit`). |
| `pnpm run test` | Executes the Vitest unit test suite once. |
| `pnpm run test:coverage` | Generates text and HTML test coverage reports under `./coverage`. |

---

## ♿ Reduced Motion & Accessibility Architecture

Accessibility is a core architectural pillar of this portfolio. Every animated and canvas-based component strictly respects user accessibility preferences:

1. **Media Query Detection**: The custom `useMotionPreference` hook listens to `(prefers-reduced-motion: reduce)`.
2. **WebGL Context Guard**: When reduced motion is requested, `WebGLManager` refuses to allocate WebGL contexts or start `requestAnimationFrame` loops.
3. **Static Fallbacks**:
   - **Line Waves** $\rightarrow$ Static subtle gradient background.
   - **Liquid Metal CTA** $\rightarrow$ Static dark metallic chrome styling.
   - **Scroll Reveal** $\rightarrow$ Standard static paragraph text block.
   - **Logo Loop** $\rightarrow$ Frozen grid of wordmark badges.
   - **Sparkles** $\rightarrow$ Static ambient glow filter.
   - **Shape Blur** $\rightarrow$ Unmounted; clean static card surfaces are rendered instead.
   - **Dotted Surface** $\rightarrow$ Static 2D dot grid pattern.

> [!NOTE]
> Testing reduced motion locally: Set `prefers-reduced-motion: reduce` in your browser devtools rendering tab to observe instant static graceful fallbacks across all sections.

---

## 🧪 Testing & Quality Assurance

The codebase includes comprehensive unit and integration testing powered by **Vitest**, **React Testing Library**, and **jsdom**.

### Running Tests

```bash
# Run unit tests
pnpm run test

# Run tests with V8 coverage report
pnpm run test:coverage
```

### Testing Strategy & Mocking
- **Content Contracts**: Ensures all site and project copy structures conform to TypeScript schemas.
- **Semantic HTML & Accessibility**: Verifies header hierarchies (`h1`, `h2`, `h3`), landmark roles (`<main>`, `<header>`, `<footer>`), skip links, and ARIA attributes.
- **WebGL Boundary Mocking**: Third-party WebGL, GSAP, OGL, and particle runtimes are mocked during unit tests so tests focus on application logic, decision boundaries, and reduced-motion states without relying on GPU hardware.

---

## 📖 Documentation Reference

Detailed architectural decisions, component blueprints, and execution history are maintained in the [`docs/`](file:///home/gui/projects/portfolio-website/docs) directory:

- 📐 [`docs/portfolio-component-blueprint.md`](file:///home/gui/projects/portfolio-website/docs/portfolio-component-blueprint.md): Locked component specifications, section layout maps, and visual direction.
- 📜 [`docs/component-provenance.md`](file:///home/gui/projects/portfolio-website/docs/component-provenance.md): Origin, licenses, and custom adaptations of third-party shader/effect components.
- 📑 [`docs/content.md`](file:///home/gui/projects/portfolio-website/docs/content.md): Master copy specifications, tone of voice guidelines, and placeholder policies.
- 📋 [`docs/work-orders/wo/`](file:///home/gui/projects/portfolio-website/docs/work-orders/wo/): Executable Work Orders tracking incremental features and implementation steps.

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

*Designed & Developed with precision.*  
© 2026 Guilherme Fortuna. All rights reserved.

</div>
