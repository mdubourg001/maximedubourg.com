---
title: Tree-shaking 101
description:
date: 10/22/2024
status: "draft"
---

# Tree-shaking 101

In a JavaScript module, every top-level expression falls at least into one of these three categories: exports, side-effects or internal logic.

- **exports** are declarations (constants, functions, classes...) that are explicitly exported to allow their usage outside of the module itself
- **side-effects** are expressions having observable effects other than reading their arguments and returning a value (ex: mutating the `window` object, triggering network requests, logging to the console...)
- **internal logic** are expressions that are more-or-less indirectly used in one of the two previouses.

Code that does not fall into one of these categories can be considered **dead code**.

```js
// Exports
export const greeting = "Hello, World!";
export function sayHello(name) {
  return `${greeting}, ${name}!`;
}

// Side-effects: modifying global state and logging
console.log("Module loaded!");
window.customProperty = "I'm a side-effect!";

// Internal logic: indirectly used within exports or side-effects
const exclamation = "!"; // Used but not exported
function formatMessage(message) {
  // Only used within this module
  return message + exclamation;
}

// Using internal logic in exported function
export function greetWithExclamation(name) {
  return formatMessage(sayHello(name));
}

// Dead code: unused function
function unusedFunction() {
  return "I'm dead code!";
}
```

Naturally enough, one would want such unused code to be removed when it is built; that's where bundlers come in: part of their job is to remove dead code from the sources they are given, **or more precisely, not to include it**.

## Live code inclusion

Tree-shaking is a dead code elimination (DCE) technique popularized by the [Rollup bundler project](https://rollupjs.org). While common DCE techniques consists of applying optimizations and removing code from a final program, tree-shaking is about **building a final program by only including live code**: that's why we are talking about live code inclusion.

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

## Creating an AST and resolving dependencies

Ok cool, but how does the tree-shaking algorithm come to the conclusion that a piece of code is dead?

By **making an abstract syntax tree (AST)** out of the input program using a parser ([Acorn](https://github.com/acornjs/acorn) in the case of Rollup and Webpack). Once the AST is created, the tree-shaker is now able to create a dependency graph in order to identify **what each module is exporting, importing, and using: this is called dependencies resolution**.

For example, the (_really simplified and inexact_) dependency resolution of the previous program could be represented as follows:

|                | `index.js`                                                                                       | `a.js`             | `b.js`                                |
| -------------- | ------------------------------------------------------------------------------------------------ | ------------------ | ------------------------------------- |
| <b>Imports</b> | <ul><li>`foo` (`a.js`)</li><li>`bar`, <span class="text-red-500">`baz`</span> (`b.js`)</li></ul> | -                  | -                                     |
| <b>Exports</b> | -                                                                                                | <ul><li>`foo`</ul> | <ul><li>`bar`</li><li>`baz`</li></ul> |
| <b>Usages</b>  | <ul><li>`foo` (`a.js`)</li><li>`bar` (`b.js`)</li></ul>                                          | -                  | -                                     |

> Explore the actual AST of the program [here](https://astexplorer.net/#/gist/37f362a9b7f271f527f3a041877e2e10/7311d2f04ff0aa9ac01bbfba73545eb09f34240d)

Now that it has a dependency graph, identifying live code is pretty straightforward for the three-shaker:

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

In this case, yes. But **what is a side-effect really? Can all side-effects be identified by the tree-shaker?**

Yes... kind of... but not really.

## Maintaining side-effects

**Fondamentaly, side-effects are the reason why a program exists**: accepting inputs from a user, writing to a console or to a disk, making network calls, adding elements to the DOM... without all of it, programs are useless really. For this reason, tree-shakers must be absolutely sure not to accidentaly remove them, which could lead to broken programs. They do so two different ways:

- by detecting them
- by not tree-shaking code that might hide one

**Three-shaking is an optimization that is made statically**, which means the tree-shaker can rely only on the AST to detect side-effects: this is sufficient most of the time, but let's not forget that JavaScript is a dynamic language, which means **side-effects could hide in code that is not statically analyzable.**

Let's take the following program for example:

```js
const sum = "4" + two;

console.log("todo: do something");
```

As you can see, the value assigned to `sum` isn't used anywhere, and so **should be removed by tree-shaking... but it can't be**:

- what if `two` doesn't exist? A `ReferenceError` would be thrown, which is a side-effect
- what if `two` is an object with a `toString()` method? It would be invoked by joining it with a string, which could be a side-effect

In such cases, **tree-shaking algorithms have no other choice than to be conservative and not to remove the code to maintain every potential side-effect**, althought it's maybe unused. The tree-shaken code would then be:

```js
// only the `sum` assignation could be removed safely
"4" + two;

console.log("todo: do something");
```

> You can experiment different scenarios online using the [Rollup REPL](https://rollupjs.org/repl/)

In a "final" application, such unused exports or useless top-level side-effects are pretty rare, and various well-known tooling exist to statically catch them (ESLint, TypeScript, [ts-unused-exports](https://github.com/pzavolinsky/ts-unused-exports), ...). **But in the case of a library, every export or top-level side-effect is potential dead code**: this depends on the program using it.

```js
// famous-helpers-lib/index.js
if (process.env.MODE === "development") {
  initCustomDevtools();
}
```

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
