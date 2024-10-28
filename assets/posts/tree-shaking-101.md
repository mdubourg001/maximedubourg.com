---
title: Tree-shaking 101
description:
date: 10/22/2024
status: "draft"
---

# Tree-shaking 101

In a JavaScript module, every top-level expression falls into three categories: exports, side-effects or internal logic.

- **exports** are declarations (constants, functions, classes...) that are explicitly exported to allow their usage outside of the module itself
- **side-effects** are expressions having observable effects other than reading their arguments and returning a value (ex: mutating the `window` object, triggering network requests, logging to the console...)
- **internal logic** are expressions that are more-or-less indirectly used in one of the two previouses.

Code that does not fall into one of these categories can be considered **dead code**.

```tsx
// Exports
export const greeting = "Hello, World!";
export function sayHello(name: string): string {
  return `${greeting}, ${name}!`;
}

// Side-effects: modifying global state and logging
console.log("Module loaded!");
window.customProperty = "I'm a side-effect!";

// Internal logic: indirectly used within exports or side-effects
const exclamation = "!"; // Used but not exported
function formatMessage(message: string): string {
  // Only used within this module
  return message + exclamation;
}

// Using internal logic in exported function
export function greetWithExclamation(name: string): string {
  return formatMessage(sayHello(name));
}

// Dead code: unused function
function unusedFunction() {
  return "I'm dead code!";
}
```

Naturally enough, one would want such unused code to be removed when it is built; that's where bundlers come in: part of their job is to remove dead code from the sources they are given, **or more precisely, not to include it**.

## Live code inclusion

Tree-shaking is a dead code elimination technique popularized by the [Rollup bundler project](https://rollupjs.org).

## Notes

- in a JS module, everything is either an export or a side effect
- tree-shaking is not dead code elimination but live-code inclusion
- tree-shaking works with ES modules only
- default export make three-shaking harder
- don't assume your code will be tree shaken: code loaded through a CDN, script type=module
- problem with tree shaking barrel files ?

## Sources

- [Webpack - Tree-shaking](https://webpack.js.org/guides/tree-shaking/)
- [esbuild - Tree-shaking](https://esbuild.github.io/api/#tree-shaking)
- [Parcel - Tree-shaking](https://parceljs.org/features/scope-hoisting/#side-effects)
- [Rollup treeshake.moduleSideEffects](https://rollupjs.org/configuration-options/#treeshake-modulesideeffects)
- [Rich Harris - Tree-shaking versus dead code elimination](https://medium.com/@Rich_Harris/tree-shaking-versus-dead-code-elimination-d3765df85c80#.jnypozs9n)
