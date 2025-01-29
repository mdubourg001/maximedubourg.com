---
title: Frontend tooling overview
description: Frontend tooling overview
date: 01/24/2025
status: draft
---

# Frontend tooling overview

 <!-- Ajouter les SSG ? -->

<button class="px-3 py-1 text-white bg-black rounded-md shadow gap-x-2" onclick="document.querySelector('#tooling-dialog').showModal()">See tooling table</button>

<dialog id="tooling-dialog"></dialog>

## JavaScript Engine

Low-level software responsible of the compilation and execution of JavaScript (and WebAssembly) code. Their main use is through web browsers and JavaScript runtimes relying on them to execute JavaScript code.

Examples: [v8](https://v8.dev/), [SpiderMonkey](https://spidermonkey.dev/), [JavaScriptCore](https://developer.apple.com/documentation/javascriptcore)

See more: [Wikipedia](https://fr.wikipedia.org/wiki/Moteur_JavaScript), [MDN](https://developer.mozilla.org/en-US/docs/Glossary/Engine/JavaScript)

## JavaScript Runtime

JavaScript execution environment providing APIs for I/O operations (networking, file-system access, multithreading, RTC) based on a event-driven, asynchronous architecture.

Uses internally: [JavaScript Engine](#javascript-engine)

Examples: [Node.js](https://nodejs.org/), [Deno](https://deno.com/), [Bun](https://bun.sh/), [WinterJS](https://github.com/wasmerio/winterjs)

## Development server

Local server providing development features like hot reloading, error reporting, and asset transformation facilitating code changes without needing a full production build.

Modern "meta-frameworks" and build tools (e.g. Vite, Next.js, Astro...) are, at core, development servers using [compilers](#compiler--transpiler) and/or [bundlers](#bundler) internally.

Examples: [Vite](https://vite.dev/), [Next.js](https://nextjs.org/), [Astro](https://astro.build/)

## Type checker

Tool that statically validates that values conform to expected data-types in order to catch type-errors early.

Examples: [tsc (TypeScript compiler)](https://github.com/microsoft/TypeScript), [Flow](https://github.com/facebook/flow)

## Compiler / Transpiler

Tool transforming code from one language to another, or from a superset to a subset of a language (e.g. TS -> JS, JSX -> JS, ESNext -> ES5, Sass -> CSS...).

Compilers are central parts of most modern frontend tools as they allow out-of-the-box usage of features like static typing (e.g. TypeScript) or higher-level syntax (e.g. JSX).

Examples: [TypeScript](https://www.typescriptlang.org/), [Babel](https://babeljs.io/), [SWC](https://swc.rs/)

## Parser

Tool taking source code as input and converting it into a structured representation, typically an Abstract Syntax Tree (AST), for further processing like compilation or interpretation.

Parsers are (directly or indirectly) building blocks of almost all other tools listed here: [compilers](#compiler--transpiler) parse code to transform it, [type checkers](#type-checker) parse code to validate it, [bundlers](#bundler) parse code to [tree-shake](/posts/tree-shaking-101.html) it, etc...

Examples: [Acorn](https://github.com/acornjs/acorn), [esprima](https://esprima.org/)

## Bundler

Tool taking multiple entry files (code or other static assets), resolving their dependencies, and combining them into optimized output files for efficient execution in a browser or runtime environment.

Modern "meta-frameworks" and build tools (e.g. Vite, Next.js, Astro...) use bundlers internally to allow out-of-the-box optimization and usage of a lot of different assets (e.g. TypeScript files, CSS modules, images, JSON files...).

Bundlers are also extensively used for the compilation and packaging of libraries.

Examples: [Webpack](https://webpack.js.org/), [Rollup](https://rollupjs.org/), [esbuild](https://esbuild.github.io/), [Parcel](https://parceljs.org/)

## Minifier

Tool optimizing code by shrinking variable names, removing useless whitespaces / line-breaks / comments and dropping unused code.

Examples: [Terser](https://terser.org/), [Lightning CSS](https://github.com/parcel-bundler/lightningcss)

## Linter

Tool statically analyzing code to find problematic patterns or code that doesn't adhere to configured style guidelines.

Examples: [Eslint](https://eslint.org/), [oxlint](https://oxc.rs/docs/guide/usage/linter.html)

## Formatter

Tool automatically formatting code according to a set of rules, typically to enforce a consistent style across a codebase.

Examples: [Prettier](https://prettier.io/), [Oxc](https://oxc.rs), [Biome](https://biomejs.dev/)

## Test runner

Tool executing tests and reporting results, typically providing features like test isolation, parallelization, and code coverage.

Examples: [Jest](https://jestjs.io/), [Vitest](https://vitest.dev/), [Playwright](https://playwright.dev/), [Cypress](https://www.cypress.io/)

## Package manager

Tool allowing the management (installation, uninstallation, update) of dependencies in JavaScript projects. They provide features like versioning, dependency resolution, and version locking through lockfiles.

Package managers rely on registries to fetch packages and their metadata: the most known and used registry is the [npm registry](https://www.npmjs.com/).

Examples: [npm](https://www.npmjs.com/), [pnpm](https://pnpm.io/), [yarn](https://yarnpkg.com/)

## CSS preprocessor

## CSS postprocessor

## CSS build system

<style>
  #tooling-dialog {
    margin: auto;
    padding: 10px;

    table {
      border-radius: 5px;
      max-width: 80vw;
      max-height: 80vh;
      position: relative;
      outline: 1px solid;
      margin-bottom: 0;

      thead {
        position: sticky;
        top: 0;

        th {
          outline: 1px solid;
        }
      }

      tr > :first-child {
        position: sticky;
        left: 0;
        outline: 1px solid;
        background-color: white;
      }
    }
  }
</style>

<script type="application/javascript">
  const CATEGORIES = [{
    name: 'JS\xa0Engine',
    key: 'jsEngine',
  }, {
    name: 'JS\xa0Runtime',
    key: 'jsRuntime',
  }, {
    name: 'Dev\xa0Server',
    key: 'devServer',
  }, {
    name: 'Type\xa0Checker',
    key: 'typeChecker',
  }, {
    name: 'Compiler\xa0/\xa0Transpiler',
    key: 'compilerTranspiler',
  }, {
    name: 'Parser',
    key: 'parser',
  }, {
    name: 'Bundler',
    key: 'bundler',
  }, {
    name: 'Minifier',
    key: 'minifier',
  }, {
    name: 'Linter',
    key: 'linter',
  }, {
    name: 'Formatter',
    key: 'formatter',
  }, {
    name: 'Test\xa0Runner',
    key: 'testRunner',
  }, {
    name: 'Package\xa0Manager',
    key: 'packageManager',
  }, {
    name: 'CSS\xa0Preprocessor',
    key: 'cssPreprocessor',
  }, {
    name: 'CSS\xa0Postprocessor',
    key: 'cssPostprocessor',
  }, {
    name: 'CSS\xa0Build\xa0System',
    key: 'cssBuildSystem',
  }];

  const TOOLS = [{
    name: 'v8',
    jsEngine: true,
    picto: 'https://v8.dev/_img/v8.svg'
  }, {
    name: 'SpiderMonkey',
    jsEngine: true,
    picto: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/SpiderMonkey_Logo.png'
  }, {
    name: 'JavaScriptCore',
    jsEngine: true,
    picto: 'https://docs.webkit.org/assets/WebKit.svg'
  }, {
    name: 'Node.js',
    jsRuntime: true,
    picto: "https://svgl.app/library/nodejs.svg",
  }, {
    name: 'Deno',
    jsRuntime: true,
    devServer: true,
    typeChecker: true,
    linter: true,
    formatter: true,
    testRunner: true,
    packageManager: true,
    picto: "https://svgl.app/library/deno.svg",
  }, {
    name: 'Bun',
    jsRuntime: true,
    devServer: true,
    compilerTranspiler: true,
    bundler: true,
    linter: true,
    formatter: true,
    testRunner: true,
    packageManager: true,
    picto: "https://svgl.app/library/bun.svg",
  }, {
    name: 'WinterJS',
    jsRuntime: true,
    bundler: true,
    picto: '❄️'
  }, {
    name: 'Vite',
    devServer: true,
    bundler: true,
    picto: "https://svgl.app/library/vitejs.svg",
  }, {
    name: 'Astro',
    devServer: true,
    picto: "https://svgl.app/library/astro.svg",
  }, {
    name: 'Next.js',
    devServer: true,
    bundler: true,
    picto: "https://svgl.app/library/nextjs_icon_dark.svg",
  }, {
    name: 'TypeScript',
    typeChecker: true,
    compilerTranspiler: true,
    picto: "https://svgl.app/library/typescript.svg",
  }, {
    name: 'Flow',
    typeChecker: true,
    compilerTranspiler: true,
    picto: 'https://images.seeklogo.com/logo-png/27/2/flow-logo-png_seeklogo-273174.png'
  }, {
    name: 'Acorn',
    parser: true,
    picto: 'https://avatars.githubusercontent.com/u/34631683?s=48&v=4'
  }, {
    name: 'esprima',
    parser: true,
    picto: 'https://avatars.githubusercontent.com/u/70142?s=48&v=4'
  }, {
    name: 'Babel',
    compilerTranspiler: true,
    parser: true,
    picto: "https://svgl.app/library/babel.svg",
  }, {
    name: 'Sucrase',
    compilerTranspiler: true,
    parser: true,
    picto: '🧁'
  }, {
    name: 'SWC',
    compilerTranspiler: true,
    parser: true,
    minifier: true,
    picto: "https://svgl.app/library/swc.svg",
  }, {
    name: 'Turbopack',
    devServer: true,
    bundler: true,
    compilerTranspiler: true,
    picto: "https://svgl.app/library/turbopack.svg",
  }, {
    name: 'esbuild',
    devServer: true,
    bundler: true,
    compilerTranspiler: true,
    minifier: true,
    picto: "https://svgl.app/library/esbuild.svg",
  }, {
    name: 'Lightning\xa0CSS',
    minifier: true,
    linter: true,
    formatter: true,
    picto: "⚡️",
  }, {
    name: 'Rollup',
    bundler: true,
    compiler: true,
    parser: true,
    picto: "https://rollupjs.org/rollup-logo.svg",
  }, {
    name: 'Webpack',
    devServer: true,
    bundler: true,
    compiler: true,
    parser: true,
    picto: "https://raw.githubusercontent.com/webpack/media/master/logo/icon-square-big.png",
  }, {
    name: 'Rspack',
    bundler: true,
    compiler: true,
    parser: true,
    minifier: true,
    picto: "https://assets.rspack.dev/rspack/rspack-logo.svg",
  }, {
    name: 'Parcel',
    bundler: true,
    compiler: true,
    parser: true,
    picto: "https://svgl.app/library/parcel.svg",
  }, {
    name: 'Terser',
    minifier: true,
    picto: "https://terser.org/img/terser-square-logo.svg",
  }, {
    name: 'Eslint',
    linter: true,
    picto: "https://fr.eslint.org/icon-512.png",
  }, {
    name: 'Oxc',
    parser: true,
    minifier: true,
    linter: true,
    formatter: true,
    picto: "https://svgl.app/library/oxc.svg",
  }, {
    name: 'Prettier',
    formatter: true,
    picto: "https://prettier.io/icon.png",
  }, {
    name: 'Biome',
    formatter: true,
    picto: "https://avatars.githubusercontent.com/u/140182603?s=48&v=4",
  }, {
    name: 'Jest',
    devServer: true,
    testRunner: true,
    picto: "https://svgl.app/library/jest.svg",
  }, {
    name: 'Vitest',
    devServer: true,
    testRunner: true,
    picto: "https://svgl.app/library/vitest.svg",
  }, {
    name: 'Playwright',
    devServer: true,
    testRunner: true,
    picto: "https://svgl.app/library/playwright.svg",
  }, {
    name: 'Cypress',
    devServer: true,
    testRunner: true,
    picto: "https://svgl.app/library/cypress.svg", 
  }, {
    name: 'npm',
    packageManager: true,
    picto: "https://svgl.app/library/npm.svg",
  }, {
    name: 'pnpm',
    packageManager: true,
    picto: "https://svgl.app/library/pnpm.svg",
  }, {
    name: 'yarn',
    packageManager: true,
    picto: "https://svgl.app/library/yarn.svg",
  }, {
    name: 'Sass',
    cssPreprocessor: true,
    picto: "https://svgl.app/library/sass.svg",
  }, {
    name: 'PostCSS',
    cssPostprocessor: true,
    picto: "https://svgl.app/library/postcss.svg",
  }, {
    name: 'Tailwind',
    cssBuildSystem: true,
    picto: "https://svgl.app/library/tailwindcss.svg",
  }];

  const dialog = document.querySelector('#tooling-dialog');
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');
  const headerRow = document.createElement('tr');

  const emptyTh = document.createElement('th');
  headerRow.appendChild(emptyTh);

  for (const category of CATEGORIES) {
    const th = document.createElement('th');
    th.textContent = category.name;
    headerRow.appendChild(th);
  }

  thead.appendChild(headerRow);

  for (const tool of TOOLS) {
    const row = document.createElement('tr');

    const toolCell = document.createElement('td');
    toolCell.classList.add('md:flex', 'gap-x-2', 'items-center', 'pr-4');
    const name = document.createElement('span');
    name.classList.add('hidden', 'md:inline-block');

    if (tool.picto) {
      let picto;
      
      if (tool.picto.startsWith('http')) {
        picto = document.createElement('img');
        picto.src = tool.picto;
      } else {
        picto = document.createElement('span');
        picto.textContent = tool.picto;
      }

      picto.classList.add('border-0', 'w-6', 'h-6');
      toolCell.appendChild(picto);
    }

    name.textContent = tool.name;
    toolCell.appendChild(name);
    row.appendChild(toolCell);

    for (const category of CATEGORIES) {
      const cell = document.createElement('td');
      cell.textContent = tool[category.key] ? '✅' : '';
      row.appendChild(cell);
    }

    tbody.appendChild(row);
  }

  table.appendChild(thead);
  table.appendChild(tbody);
  dialog.appendChild(table);
</script>
