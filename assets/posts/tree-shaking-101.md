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

Code that does not fall into one of these categories is **dead code**.

```tsx
// internal logic
function bar() {
  // ...
}

// export
export function foo() {
  return bar();
}

// side-effect
console.log(foo());

// dead code
const baz = foo();
```

## Live code inclusion

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
