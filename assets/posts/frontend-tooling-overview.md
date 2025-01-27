---
title: Frontend tooling overview
description: Frontend tooling overview
date: 01/24/2025
status: draft
---

# Frontend tooling overview

 <!-- https://svgl.app/ -->
 <!-- Ajouter les SSG ? -->

|                | JS&nbsp;engine | JS&nbsp;runtime | dev&nbsp;server | type&nbsp;checker | compiler/transpiler | parser | bundler | minifier | linter | formatter | test&nbsp;runner | package&nbsp;manager | CSS&nbsp;preprocessor | CSS&nbsp;postprocessor | CSS&nbsp;build&nbsp;system |
| -------------- | -------------- | --------------- | --------------- | ----------------- | ------------------- | ------ | ------- | -------- | ------ | --------- | ---------------- | -------------------- | --------------------- | ---------------------- | -------------------------- |
| v8             | ✅             |                 |                 |                   |                     |        |         |
| SpiderMonkey   | ✅             |                 |                 |                   |                     |        |         |
| JavaScriptCore | ✅             |                 |                 |                   |                     |        |         |
| Node.js        |                | ✅              |                 |                   |                     |        |         |
| Deno           |                | ✅              | ✅              |                   |                     |        |         |          | ✅     | ✅        |
| Bun            |                | ✅              | ✅              |                   | ⚙️                  |        |         |          |        |           | ✅               | ✅                   |
| WinterJS       |                | ✅              |                 |                   |                     |        |         |          |        |           |
| Vite           |                |                 | ✅              |                   |                     |        | ⚙️      |
| Astro          |                |                 | ✅              |
| Next.js        |                |                 | ✅              |                   |                     |        | ⚙️      |
| TypeScript     |                |                 |                 | ✅                | ✅                  | ⚙️     |
| Flow           |                |                 |                 | ✅                | ✅                  | ⚙️     |
| Acorn          |                |                 |                 |                   |                     | ✅     |
| esprima        |                |                 |                 |                   |                     | ✅     |
| Babel          |                |                 |                 |                   | ✅                  | ✅     |
| Sucrase        |                |                 |                 |                   | ✅                  | ⚙️     |
| SWC            |                |                 |                 |                   | ✅                  | ⚙️     |         | ✅       |
| Turbopack      |                |                 | ✅              |                   | ⚙️                  | ⚙️     | ✅      |
| esbuild        |                |                 | ✅              |                   | ✅                  | ⚙️     | ✅      | ✅       |
| Lightning CSS  |                |                 |                 |                   | ✅                  | ✅     |         | ✅       |
| Rollup         |                |                 |                 | 🔌                | ⚙️                  | ⚙️     | ✅      | 🔌       |
| Webpack        |                |                 | ✅              | 🔌                | ⚙️                  | ⚙️     | ✅      | 🔌       |
| Rspack         |                |                 |                 | 🔌                | ⚙️                  | ⚙️     | ✅      | ✅       |
| Parcel         |                |                 |                 | 🔌                | ⚙️                  | ⚙️     | ✅      | 🔌       |
| Terser         |                |                 |                 |                   |                     |        |         | ✅       |
| Eslint         |                |                 |                 |                   |                     |        |         |          | ✅     | 🔌        |
| Oxc            |                |                 |                 |                   |                     | ✅     |         | ✅       | ✅     | ✅        |
| Prettier       |                |                 |                 |                   |                     |        |         |          |        | ✅        |
| Biome          |                |                 |                 |                   |                     |        |         |          |        | ✅        |
| Jest           |                |                 | ✅              |                   |                     |        |         |          |        |           | ✅               |
| Vitest         |                |                 | ✅              |                   |                     |        |         |          |        |           | ✅               |
| Playwright     |                |                 | ✅              |                   |                     |        |         |          |        |           | ✅               |
| Cypress        |                |                 | ✅              |                   |                     |        |         |          |        |           | ✅               |
| npm            |                |                 |                 |                   |                     |        |         |          |        |           |                  | ✅                   |
| pnpm           |                |                 |                 |                   |                     |        |         |          |        |           |                  | ✅                   |
| yarn           |                |                 |                 |                   |                     |        |         |          |        |           |                  | ✅                   |
| Sass           |                |                 |                 |                   |                     |        |         |          |        |           |                  |                      | ✅                    |
| Less           |                |                 |                 |                   |                     |        |         |          |        |           |                  |                      | ✅                    |
| PostCSS        |                |                 |                 |                   |                     |        |         |          |        |           |                  |                      |                       | ✅                     |
| Tailwind       |                |                 |                 |                   |                     | ⚙️     |         |          |        |           |                  |                      |                       |                        | ✅                         |

## JavaScript Engine

> Low-level software responsible of the compilation and execution of JavaScript (and WebAssembly) code. Their main use is through web browsers and JavaScript runtimes relying on them to execute JavaScript code.

Examples: [v8](https://v8.dev/), [SpiderMonkey](https://spidermonkey.dev/), [JavaScriptCore](https://developer.apple.com/documentation/javascriptcore)

See more: [Wikipedia](https://fr.wikipedia.org/wiki/Moteur_JavaScript), [MDN](https://developer.mozilla.org/en-US/docs/Glossary/Engine/JavaScript)

## JavaScript Runtime

> JavaScript execution environment providing APIs for I/O operations (networking, file-system access, multithreading, RTC) based on a event-driven, asynchronous architecture.

Uses internally: [JavaScript Engine](#javascript-engine)

Examples: [Node.js](https://nodejs.org/), [Deno](https://deno.com/), [Bun](https://bun.sh/), [WinterJS](https://github.com/wasmerio/winterjs)

## Development server

> Local server providing development features like hot reloading, error reporting, and asset transformation facilitating code changes without needing a full production build.

Modern "meta-frameworks" and build tools (e.g. Vite, Next.js, Astro...) are, at core, development servers using [compilers](#compiler--transpiler) and/or [bundlers](#bundler) internally.

Examples: [Vite](https://vite.dev/), [Next.js](https://nextjs.org/), [Astro](https://astro.build/)

## Type checker

> Tool that statically validates that values conform to expected data-types in order to catch type-errors early.

Examples: [tsc (TypeScript compiler)](https://github.com/microsoft/TypeScript), [Flow](https://github.com/facebook/flow)

## Compiler / Transpiler

> Tool transforming code from one language to another, or from a superset to a subset of a language (e.g. TS -> JS, JSX -> JS, ESNext -> ES5, Sass -> CSS...).

Compilers are central parts of most modern frontend tools as they allow out-of-the-box usage of features like static typing (e.g. TypeScript) or higher-level syntax (e.g. JSX).

Examples: [TypeScript](https://www.typescriptlang.org/), [Babel](https://babeljs.io/), [SWC](https://swc.rs/)

## Parser

> Tool taking source code as input and converting it into a structured representation, typically an Abstract Syntax Tree (AST), for further processing like compilation or interpretation.

Parsers are (directly or indirectly) building blocks of almost all other tools listed here: [compilers](#compiler--transpiler) parse code to transform it, [type checkers](#type-checker) parse code to validate it, [bundlers](#bundler) parse code to [tree-shake](/posts/tree-shaking-101.html) it, etc...

Examples: [Acorn](https://github.com/acornjs/acorn), [esprima](https://esprima.org/)

## Bundler

> Tool taking multiple entry files (code or other static assets), resolving their dependencies, and combining them into optimized output files for efficient execution in a browser or runtime environment.

Modern "meta-frameworks" and build tools (e.g. Vite, Next.js, Astro...) use bundlers internally to allow out-of-the-box optimization and usage of a lot of different assets (e.g. TypeScript files, CSS modules, images, JSON files...).

Bundlers are also extensively used for the compilation and packaging of libraries.

Examples: [Webpack](https://webpack.js.org/), [Rollup](https://rollupjs.org/), [esbuild](https://esbuild.github.io/), [Parcel](https://parceljs.org/)

## Minifier

> Tool optimizing code by shrinking variable names, removing useless whitespaces / line-breaks / comments, dropping unused code, in order to make it smaller.

Examples: [Terser](https://terser.org/), [Lightning CSS](https://github.com/parcel-bundler/lightningcss)

## Linter

## Formatter

## Test runner

## Package manager

## CSS preprocessor

## CSS postprocessor

## CSS build system
