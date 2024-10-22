---
title: Tree-shaking 101
description:
date: 10/22/2024
status: "draft"
---

# Tree-shaking 101

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
