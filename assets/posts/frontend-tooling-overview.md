---
title: Frontend tooling overview
description: Frontend tooling overview
date: 01/24/2025
status: draft
---

# Frontend tooling overview

 <!-- https://svgl.app/ -->

|            | runtime | dev&nbsp;server | type&nbsp;checker | transpiler/compiler | parser | bundler | minifier | linter | formatter | test&nbsp;runner | package&nbsp;manager | CSS&nbsp;preprocessors | CSS&nbsp;postprocessors | CSS&nbsp;build&nbsp;system |
| ---------- | ------- | --------------- | ----------------- | ------------------- | ------ | ------- | -------- | ------ | --------- | ---------------- | -------------------- | ---------------------- | ----------------------- | -------------------------- |
| Node.js    | ✅      |                 |                   |                     |        |         |
| Deno       | ✅      | ✅              |                   |                     |        |         |          | ✅     | ✅        |
| Bun        | ✅      | ✅              |                   | ⚙️                  |        |         |          |        |           | ✅               | ✅                   |
| Vite       |         | ✅              |                   |                     |        | ⚙️      |
| Astro      |         | ✅              |
| Next.js    |         | ✅              |                   |                     |        | ⚙️      |
| TypeScript |         |                 | ✅                | ✅                  | ⚙️     |
| Flow       |         |                 | ✅                | ✅                  | ⚙️     |
| Acorn      |         |                 |                   |                     | ✅     |
| esprima    |         |                 |                   |                     | ✅     |
| Babel      |         |                 |                   | ✅                  | ✅     |
| Sucrase    |         |                 |                   | ✅                  | ⚙️     |
| SWC        |         |                 |                   | ✅                  | ✅     |         | ✅       |
| Turbopack  |         | ✅              |                   | ⚙️                  | ⚙️     | ✅      |
| esbuild    |         | ✅              |                   | ✅                  | ✅     | ✅      | ✅       |
| Rollup     |         |                 | 🔌                | ⚙️                  | ⚙️     | ✅      | 🔌       |
| Webpack    |         | ✅              | 🔌                | ⚙️                  | ⚙️     | ✅      | 🔌       |
| Rspack     |         |                 | 🔌                | ⚙️                  | ⚙️     | ✅      | ✅       |
| Parcel     |         |                 | 🔌                | ⚙️                  | ⚙️     | ✅      | 🔌       |
| Terser     |         |                 |                   |                     |        |         | ✅       |
| Eslint     |         |                 |                   |                     |        |         |          | ✅     | 🔌        |
| Oxc        |         |                 |                   |                     | ✅     |         | ✅       | ✅     | ✅        |
| Prettier   |         |                 |                   |                     |        |         |          |        | ✅        |
| Biome      |         |                 |                   |                     |        |         |          |        | ✅        |
| Jest       |         | ✅              |                   |                     |        |         |          |        |           | ✅               |
| Vitest     |         | ✅              |                   |                     |        |         |          |        |           | ✅               |
| Playwright |         | ✅              |                   |                     |        |         |          |        |           | ✅               |
| Cypress    |         | ✅              |                   |                     |        |         |          |        |           | ✅               |
| npm        |         |                 |                   |                     |        |         |          |        |           |                  | ✅                   |
| pnpm       |         |                 |                   |                     |        |         |          |        |           |                  | ✅                   |
| yarn       |         |                 |                   |                     |        |         |          |        |           |                  | ✅                   |
| Sass       |         |                 |                   |                     |        |         |          |        |           |                  |                      | ✅                     |
| Less       |         |                 |                   |                     |        |         |          |        |           |                  |                      | ✅                     |
| PostCSS    |         |                 |                   |                     |        |         |          |        |           |                  |                      |                        | ✅                      |
| Tailwind   |         |                 |                   |                     | ⚙️     |         |          |        |           |                  |                      |                        |                         | ✅                         |
