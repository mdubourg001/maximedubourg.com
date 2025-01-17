---
title: Tree-shaking 101
description: Learn the fundamentals of tree-shaking in JavaScript, a technique for optimizing your code by removing unused exports and side-effects. Understand how bundlers like Rollup and Webpack identify and eliminate dead code to create efficient final programs.
date: 01/15/2025
---

# Tree-shaking 101

In a JavaScript ES module, every top-level expression falls at least indirectly into one of the two following categories: exports or side-effects.

- **exports** are declarations (constants, functions, classes...) that are explicitly exported to allow their usage outside of the module itself
- **side-effects** are expressions having observable effects other than reading their arguments and returning a value (ex: mutating the `window` object, triggering network requests, logging to the console...)

Code that does not fall into one of these categories can be considered **dead code**.

```js
// Exports
export const greeting = "Hello";
export function sayHello(name) {
  return `${greeting}, ${name}`;
}

// Side-effects: modifying global state and logging
console.log("Module loaded!");
window.customProperty = "I'm a side-effect!";

// Internal logic indirectly used within exports or side-effects
const exclamation = "!"; // Not exported but used
function addPunctuation(message) {
  // Only used within this module
  return message + exclamation;
}

// Using internal logic in exported function
export function greetWithExclamation(name) {
  return addPunctuation(sayHello(name));
}

// Dead code
function unusedFunction() {
  return "I'm dead code!";
}
```

Naturally enough, one would want such unused code to be removed when it is built; that's where bundlers come in: part of their job is to remove dead code from the sources they are given, or more precisely, not to include it: **this is called tree-shaking**.

Let's take a closer look at how this is done.

## Live code inclusion

Tree-shaking is a dead code elimination (DCE) technique popularized by the [Rollup bundler project](https://rollupjs.org). While common DCE techniques consists of applying optimizations and removing code from a final program, tree-shaking is about **building a final program by only including live code**.

Let's take the example of the following program: it consists of three ES modules, `a.js`, `b.js` and `index.js` that is also the entry point.

```js
// a.js
export function foo() {
  console.log("Hello from foo!");
}
window.WORD = "pizza";
```

```js
// b.js
export function bar() {
  console.log("Hello from bar!");
}
export function baz() {
  console.log("Hello from baz!");
}
```

```js
// index.js
import { foo } from "./a.js";
import { bar, baz } from "./b.js";

console.log(window.WORD);

foo();
bar();
```

As you probably noticed, the `index.js` entry point imports `foo` from `a.js` and `bar` and `baz` from `b.js`, but doesn't uses `baz`. As `baz` is never used anywhere in the program, it is dead code.

### Identifying dead code

Ok cool, but how does the tree-shaking algorithm come to the conclusion that a piece of code is dead?

By **making an abstract syntax tree (AST)** out of the input program using a parser ([Acorn](https://github.com/acornjs/acorn) in the case of Rollup and Webpack). Once the AST is created, the tree-shaker is now able to create a dependency graph in order to identify **what each module is exporting, importing, and using: this is called dependencies resolution**.

For example, the (_really simplified_) dependency resolution of the previous program could be represented as follows:

![Module resolution](/static/images/tree-shaking-module-resolution.png)

<!-- |                | `index.js`                                                                                       | `a.js`             | `b.js`                                |
| -------------- | ------------------------------------------------------------------------------------------------ | ------------------ | ------------------------------------- |
| <b>Imports</b> | <ul><li>`foo` (`a.js`)</li><li>`bar`, <span class="text-red-500">`baz`</span> (`b.js`)</li></ul> | -                  | -                                     |
| <b>Exports</b> | -                                                                                                | <ul><li>`foo`</ul> | <ul><li>`bar`</li><li>`baz`</li></ul> |
| <b>Usages</b>  | <ul><li>`foo` (`a.js`)</li><li>`bar` (`b.js`)</li></ul>                                          | -                  | -                                     | -->

> Explore the actual AST of the program [here](https://astexplorer.net/#/gist/37f362a9b7f271f527f3a041877e2e10/7311d2f04ff0aa9ac01bbfba73545eb09f34240d)

Now that it has a dependency graph, identifying live code is pretty straightforward for the tree-shaker:

- code that is directly or indirectly imported and used by the entry module is live
- code that has side-effects is live
- remaining code is dead

So the tree-shaken code from our example code would be:

```js
// from a.js
window.WORD = "pizza";

// from index.js
console.log(window.WORD);

console.log("Hello from foo!");
console.log("Hello from bar!");
```

Easy, right?

In this case, yes. But can all side-effects be identified by the tree-shaker? Not really. As we'll see, the dynamic nature of JavaScript make some side-effects hard to detect.

## Maintaining side-effects

**Fondamentaly, side-effects are the reason why a program exists**: accepting inputs from a user, writing to a console or to a disk, making network calls, adding elements to the DOM... without all of it, programs are useless really. For this reason, tree-shakers must be absolutely sure not to accidentaly remove them, which could lead to broken programs. They do so in two different ways:

- by detecting them
- by including code that might hide one

**Tree-shaking is an optimization that is made statically**, which means the tree-shaker can rely only on the AST to detect side-effects: this is sufficient most of the time, but let's not forget that JavaScript is a dynamic language, which means **side-effects could hide in code that is not statically analyzable.**

Let's take the following program for example:

```js
const sum = "4" + two;

console.log("hello world!");
```

As you can see, the value assigned to `sum` isn't used anywhere, and so **should be removed by tree-shaking... but it can't be**:

- what if `two` doesn't exist? A `ReferenceError` would be thrown, which is a side-effect
- what if `two` is an object with a `toString()` method? It would be invoked by joining it with a string, which could be a side-effect

In such cases, **tree-shaking algorithms have no other choice than to be conservative and not to remove the code to maintain every potential side-effect**, althought it's maybe unused. The tree-shaken code would then be:

```js
// only the `sum` assignation could be removed safely
"4" + two;

console.log("hello world!");
```

> You can experiment different scenarios online using the [Rollup REPL](https://rollupjs.org/repl/)

In a "final" application or in internal code (your project's modules), such unused exports or useless top-level side-effects are pretty rare, and various well-known tooling exist to statically catch them (ESLint, TypeScript, [ts-unused-exports](https://github.com/pzavolinsky/ts-unused-exports), ...), but in the case of dependencies' code (modules in `node_modules`), every export or top-level side-effect is potential dead code: this depends on the end program using it.

In fact, tree-shaking for external code is not as straightforward.

## Tree-shaking dependencies

No matter if it is internal code or external dependencies code, bundlers will always try to tree-shake the code they are given, but will adopt a different strategy depending on the provenance:

- **For internal code: they'll be aggressive by default** since developers have full control on it
- **For dependencies code: they'll be conservative by default** since they come from third parties, and as any import of any module could hide a side-effect

It means that the same exact code will be tree-shaken differently depending on whether it is internal code or code from external dependencies.

So the following will be agressively tree-shaken, fully statically analyzed and everything unused won't make it to the final bundle:

```js
import { add } from "./my-local-lodash";

// only `add` will be in the final bundle
```

On the other hand, assuming the `"sideEffect"` field is unset, the following will be conservatively tree-shaken: even unused imports will be kept as their evaluation could hide side-effects or "polute" other modules, which can't be statically analyzed without error margin:

```js
import { add } from "lodash-es";

// other modules from "lodash-es"
// will also be in the final bundle
```

**To allow library authors to tell bundlers how to tree-shake their code, bundlers came up with a specific `package.json` field: [`"sideEffects"`](https://webpack.js.org/configuration/optimization/#optimizationsideeffects)**. If not set, the value of this field is `true`, which makes the bundler consider that any module import can have side effects, However, if explicitly set to `false`, it will make the bundler treat the external package's modules exactly like internal code.

```json
{
  "name": "lodash-es",
  "sideEffects": false,
  "..."
}
```

```js
import { add } from "lodash-es";

// "sideEffects": false so
// only `add` will be in the final bundle
```

So, in order for a `node_modules` dependency to be correctly tree-shaken, it should:

- **provide an ESM build**: while ES Modules can be evaluated statically (imports and exports being exclusively top-level) and so can be tree-shaked, CommonJS module are hardly tree-shakeable due to their dynamic nature
- **have added a `"sideEffects"` field to its `package.json`** to hint the bundler about how to behave while tree-shaking

## Key takeaways / TL;DR

- in a JS module, everything is either an export, a side effect, or dead code
- tree-shaking is live-code inclusion, not dead code elimination
- as a library author:
  - provide an ESM build as tree-shaking of CommonJS modules is extremely limited
  - set a `"sideEffects"` field in your `package.json` to prevent bundlers being too conservative while tree-shaking your package
  - avoid using default exports as they make static analysis harder

To go even further, **do not assume your code will be bundled of tree-shaken at all**: there are many cases where code will be used out-of-the-box without any optimization step (loading through a CDN with `<script type="module">`, direct runtime usage, etc...), and so, generally speaking, splitting your package in multiple entry points and keeping economy in mind won't hurt.

## Sources

- [Webpack - Tree-shaking](https://webpack.js.org/guides/tree-shaking/)
- [esbuild - Tree-shaking](https://esbuild.github.io/api/#tree-shaking)
- [Parcel - Tree-shaking](https://parceljs.org/features/scope-hoisting/#side-effects)
- [Rollup treeshake.moduleSideEffects](https://rollupjs.org/configuration-options/#treeshake-modulesideeffects)
- [Rich Harris - Tree-shaking versus dead code elimination](https://medium.com/@Rich_Harris/tree-shaking-versus-dead-code-elimination-d3765df85c80#.jnypozs9n)
