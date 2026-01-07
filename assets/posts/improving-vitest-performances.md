---
title: "From Jest to Vitest: improving Vitest performance"
description: "After migrating from Jest to Vitest, we noticed a performance drop when running our test suite. Here are the changes that helped us closing this gap."
date: 01/09/2026
status: draft
---

# From Jest to Vitest: improving Vitest performance

After weeks of configuration and tweakings, my team and I finally made it, **we've migrated from Jest to Vitest!**

Our project is a big old React SPA, made of ~307k LOC, with ~500 test files for a net total of ~2662 tests (unit and component / integration tests). 

We had been wanting to migrate out of Jest for some time for several fairly common reasons: its poor ESM support, the complexity of its configuration, and most of all, the belief that we could get much better test performance with a more modern tool.

Naturally, after trying out one other candidate on a parallel migration branch ([Rstest](https://rstest.rs/), that wasn't mature enough for our needs), our choice fell on Vitest for also very common reasons: its great ESM support, its simple and straightforward configuration, its modern DX, its ecosystem, and obviously, **its performances... that turned out to be not so great.**

*"What? But Vitest is one of the most performant JS test runners! It's much faster than Jest on my project!"*, you'll tell me. That's what we also expected after reading [comparisons](https://vitest.dev/guide/comparisons#jest) and several testimonials online, but it turned out that, in our case, **Vitest was actually ~1.5x slower than Jest locally, and ~2x slower on CI... Yikes.**

After more research, we found out that we were not the only team to notice such a slowdown compared to Jest (see for example [this issue](https://github.com/vitest-dev/vitest/issues/579), [this first](https://bradgarropy.com/blog/jest-over-vitest), [this second](https://dev.to/thejaredwilcurt/vitest-vs-jest-benchmarks-on-a-5-year-old-real-work-spa-4mf1), or [this third blog post](https://dev.to/neophen/vitest-is-fast-jest-is-faster--ln1), or even [this Reddit thread](https://www.reddit.com/r/reactjs/comments/10zyse3/is_jest_still_faster_than_vitest/)), but apart from performances, all of our other expectations were met! So we were not ready to give up with Vitest!

It's now been a month since the migration, and I'm happy to say that **we've finally successfully made our Vitest setup faster than our old Jest one! That's how we made it.**

## What slows down test runners

To fully understand the improvements we're about to discuss, we first need to understand how test runners run a test suite. Jest and Vitest will typically go through the following pipeline:

*<span style="background-color: orange">__TODO:__</span> maybe replace by a schema or something more visual*

- **1. Test discovery**: scan project files to find out which are test files.
- **2. Worker allocation**: split test files between child processes or threads.
- **3. Per-file execution**: for each test file...
  - **↪ Imports resolution**: walk the dependency graph starting from the test file.
  - **↪ Transformation of resolved modules**: compile TS and JSX to JavaScript (the produced code is often cached to avoid unneeded retransforms).
  - **↪ Evaluation of transformed modules**: evaluate modules in dependency order.
  - **↪ Execution of the actual test file**: execute `describe`/`it`/`test` and hooks calls

As stated in `3.`, test runners generally keep a *transform cache* to avoid retransforming already compiled modules for following tests. They also keep a *module cache* that stores the state of evaluated modules in memory. By default, test runners clear that module cache between test files to avoid side effects: it means that if two test files running in the same worker import the same module, they each get a separate clean instance of that module: **this is called <u>test isolation</u>.**

But test isolation obviously comes with a cost! Clearing the module cache between two test files means that subsequent imports of a given module will retrigger its whole evaluation: top-level code execution, binding of its exports, and resolutions of its imports. **This is one of the most common reasons for a test suite slowing down: tests importing large dependencies graphs, meaning longer evaluation times due to test isolation.**

But that doesn't explain why Vitest was, in our case, slower than Jest. Both Jest and Vitest has the constraint of test isolation, so what is the reason for Vitest being slower? 

From my understanding, Vitest's architecture is built on Vite, which was designed for dev servers and bundling, and not really for the pattern test runners need, which is repeatedly importing thousands of modules across many isolated workers. Jest has spent years optimizing its custom module system for exactly that workload, which moreover relies on native Node.js's `require`, that is really fast. On the other hand, while Vitest is much faster than Jest when it comes to transform speed (esbuild/Rolldown being much faster than babel/ts-jest), **its module evaluation system relying on Vite's transform pipeline makes it less performant for large test suites with deep dependency trees**, where module evaluation and resolution (rather than transformation) are the real bottleneck: this was our case.

## Areas of improvement

A lot of tips and config changes are already well documented and covered [in the Vitest documentation](https://vitest.dev/guide/improving-performance.html) and in several articles, like [this one](https://dev.to/thejaredwilcurt/improving-vitest-performance-42c6) for example. Here I'll try to cover two approaches that are a bit more demanding, but had a net positive impact on performance for us.

### Splitting tests by 'projects'

As you probably already guessed it reading the previous section: one of the main areas of improvement is to **disable isolation wherever it is possible.** 

### Identifying and optimizing heavy imports
