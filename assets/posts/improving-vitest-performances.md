---
title: "Why is your test suite slow: improving Vitest performance"
description: "After migrating from Jest to Vitest, we noticed a performance drop when running our test suite. Here are the changes that helped us closing this gap."
date: 01/23/2026
status: draft
---

# Why is your test suite slow: improving Vitest performance

After weeks of configuration and tweakings, my team and I finally made it, **we've migrated from Jest to Vitest!**

Our project is a big old React SPA, made of ~307k LOC, with ~500 test files for a net total of ~2662 tests (unit and component / integration tests).

We had been wanting to migrate out of Jest for some time for several fairly common reasons: its poor ESM support, the complexity of its configuration, and most of all, the belief that we could get much better test performance with a more modern tool.

Naturally, after trying out one other candidate on a parallel migration branch ([Rstest](https://rstest.rs/), that wasn't mature enough for our needs), our choice fell on Vitest for also very common reasons: its great ESM support, its simple and straightforward configuration, its modern DX, its ecosystem, and obviously, **its performances... that turned out to be not so great.**

_"What? But Vitest is one of the most performant JS test runners! It's much faster than Jest on my project!"_, you'll tell me. That's what we also expected after reading [comparisons](https://vitest.dev/guide/comparisons#jest) and several testimonials online, but it turned out that, in our case, **Vitest was actually ~1.5x slower than Jest locally, and ~2x slower on CI... Yikes.**

After more research, we found out that we were not the only team to notice such a slowdown compared to Jest (see for example [this issue](https://github.com/vitest-dev/vitest/issues/579), [this first](https://bradgarropy.com/blog/jest-over-vitest), [this second](https://dev.to/thejaredwilcurt/vitest-vs-jest-benchmarks-on-a-5-year-old-real-work-spa-4mf1), or [this third blog post](https://dev.to/neophen/vitest-is-fast-jest-is-faster--ln1), or even [this Reddit thread](https://www.reddit.com/r/reactjs/comments/10zyse3/is_jest_still_faster_than_vitest/)), but apart from performances, all of our other expectations were met! So we were not ready to give up with Vitest!

It's now been a month since the migration, and I'm happy to say that **we've finally successfully made our Vitest setup faster than our old Jest one! That's how we made it.**

## What slows down test runners

To fully understand the improvements we're about to discuss, we first need to understand how test runners run a test suite. Jest and Vitest will typically go through the following pipeline:

- **1. Test discovery**: scan project files to find out which are test files.
- **2. Worker allocation**: split test files between child processes or threads.
- **3. Per-file execution**: for each test file, _a._ resolve imports dependency graph, _b._ transform resolve modules, _c._ evaluate transformed modules, and finally _d._ execute the test file itself.

<img class="border my-8" src="/static/images/test-runner-101.png" alt="Schema of a test runner execution pipeline" />

As shown in the previous schema, test runners generally keep a _transform cache_ to avoid retransforming already compiled modules for following tests. They also keep a _module cache_ that stores the state of evaluated modules in memory. By default, test runners clear that module cache between test files to avoid side effects: it means that if two test files running in the same worker import the same module, they each get a separate clean instance of that module: **this is called <u>[test isolation](https://vitest.dev/guide/improving-performance.html#test-isolation)</u>.**

But test isolation obviously comes with a cost! Clearing the module cache between two test files means that subsequent imports of a given module will retrigger its whole evaluation: top-level code execution, binding of its exports, and resolutions of its imports. **This is one of the most common reasons for a test suite slowing down: tests importing large dependencies graphs, meaning longer evaluation times due to test isolation.**

But that doesn't explain why Vitest was, in our case, slower than Jest. Both Jest and Vitest has the constraint of test isolation, so what is the reason for Vitest being slower?

From my understanding, Vitest's architecture is built on Vite, which was designed for dev servers and bundling, and not really for the pattern test runners need, which is repeatedly importing thousands of modules across many isolated workers. Jest has spent years optimizing its custom module system for exactly that workload, which moreover relies on native Node.js's `require`, that is really fast. On the other hand, while Vitest is much faster than Jest when it comes to transform speed (esbuild/Rolldown being much faster than babel/ts-jest), **its module evaluation system relying on Vite's transform pipeline makes it less performant for large test suites with deep dependency trees**, where module evaluation and resolution (rather than transformation) are the real bottleneck: this was our case.

## Areas of improvement

A lot of tips and config changes are already well documented and covered [in the Vitest documentation](https://vitest.dev/guide/improving-performance.html) and in several articles, like [this one](https://dev.to/thejaredwilcurt/improving-vitest-performance-42c6) for example. Here I'll try to cover two approaches that are a bit more demanding in terms of work and setup, but had a net positive impact on performance for us.

### Disable isolation wherever it is possible

<u>**TODO: Give performance impact numbers**</u>

As you probably already guessed it by reading the previous section: one of the main areas of improvement is to **disable isolation.**
Yeah, easier said than done as disabling isolation on a big test suite will most probably break some (when not a lot of) tests...

#### Disable isolation globally

In my opinion, this is the first thing to try.

```ts
// vitest.config.ts

export default defineConfig({
  // ...
  test: {
    // ...
    isolate: false,
  },
});
```

In the case of my team, as it's often the case for big test suites, this broke a lot of tests, but the thing to keep in mind is that non-isolated tests do not break when ran alone, by themselves, **they break when run along other tests, because of shared-state pollution**. The goal in that situation is to find these tests that modify shared state without proper cleanup; common culprits often include:

- **Mocks, stubs, or spies ([mocking](https://vitest.dev/guide/mocking.html#mocking)) without proper cleanup**: these persist in the module cache and can affect subsequent tests. Hint: you can configure Vitest to automatically cleanup these using config's `clearMocks`, `mockReset`, `restoreMocks`, `unstubEnvs` and `unstubGlobals`. See [docs here](https://vitest.dev/config/clearmocks.html).

- **Global object mutations**: modifying `window`, `document`, or `globalThis` properties

- **Dangling side effects:** event listeners, timers, or intervals not cleaned up in `afterEach`

- **Shared objects or singleton instances modifications** (most common): if your app's state relies on libraries like Redux (yes, some legacy projects are still stuck with it), zustand, or TanStack Query, there are chances several tests are using the same shared instances of Redux stores or in-memory caches. In such cases, it's frequent one test will update a piece of state (eg. by dispatching an action or fetching some data that will be cached), which will be unexpected by some other tests and thus make them break. To fix such tests, **make sure to have each test create and use its very own instances** of stores, shared caches, or whatever other shared objects it might use.

That said, finding shared polluted state amongst a large quantity of tests can sometimes be hard: if the 100th test file fails when running your whole test suite non-isolated, **how to find the exact previously ran test that mutated some shared instance somewhere and polluted the failing test?** Let's dig it.

#### Finding the exact polluting test amongst ran tests

Vitest provides an option to run test files in a random order to help debugging tests dependencies: [`--sequence.shuffle`](https://vitest.dev/config/sequence.html#sequence-shuffle). To help even further in that task, I'd advise running your tests on a single worker and stop tests execution after the first failing tests using `--fileParallelism=false` and `--bail=1`:

```bash
# `--sequence.shuffle.files` shuffles test files only,
# not tests inside test files
vitest run \
  --isolate=false \
  --sequence.shuffle.files \
  --fileParallelism=false \
  --bail=1
```

For this example, let's say your test suite has 200 test files, and that the 100th failed when running the previous command. First thing we know, **the "polluting" test file is one of the 99 that ran before it.**

The idea now that you have a reproducible _failing_ execution order (Vitest will give you the random [seed](https://vitest.dev/config/sequence.html#sequence-seed) when running with `--sequence.shuffle`, keep it somewhere) is to narrow down to the smallest pair of tests failing when ran together **using binary search**. Start with the first 50 (out of 99) suspects:

```bash
for i in {1..10}; do
vitest run \
  --isolate=false \
  --sequence.shuffle.files \
  --fileParallelism=false \
  --bail=1 \
  src/tests/suspect1.test.ts ... src/tests/suspect50.test.ts \
  src/tests/failing.test.ts || break
done
```

> We have to run it in a loop as the seed can't be reused when changing included test files

- If it fails → culprit is in tests 1-50, bisect again (= run on tests 1-25)
- If it passes → culprit is in tests 51-99, bisect that half

Doing this by hand is _really_ painful, so **I hacked a custom Vitest reporter to make the test order identification and the bisection job much faster. See the GitHub Gist [here](https://gist.github.com/mdubourg001/982493993ce6cbefd061772450dfeb8c)**.

Repeat until you isolate the pair of polluting/polluted tests (takes ~7 iterations for 100 tests).
You should now investigate what state is being shared between these two test files and causes state pollution, and fix it.

Now, making such fixing in a big test suite can be a lot of work, but I would like to emphasize something: <u>**fixing tests to not need isolation is often better than just isolating them.**</u> A test that leaks state is a code smell. Sometimes the fix is simple (add cleanup), and you get both correctness AND performance, but once you've fixed what you can, some tests may still require isolation.

#### Isolate specific tests

If some state-leaking tests are not so simple to fix given your actual constraints, you might consider only isolating them while still running others non-isolated. To do so, you can configure Vitest to split your test suite in two "[`projects`](https://vitest.dev/guide/projects.html#defining-projects)", and only activate test isolation on one:

```ts
// vitest.config.ts

export default defineConfig({
  // ...
  test: {
    // ...
    projects: [
      {
        extends: true, // inherit global config
        name: "isolated tests",
        // 👇 rename tests needing isolation
        //    to end with .isolated.test.tsx
        include: ["src/**/*.isolated.test.tsx"],
        isolate: true,
        // ...
      },
      {
        extends: true,
        name: "non-isolated tests",
        include: ["src/**/*.test.tsx"],
        exclude: ["src/**/*.isolated.test.tsx"],
        isolate: false,
        // ...
      },
    ],
  },
});
```

Given such configuration, **only test files ending with `isolated.test.tsx` will run in isolation**, others will remain non-isolated. This solutions gives you the benefits of disabling isolation where it is possible while delaying the fixing of leaking tests to the future.

### TODO: Identifying and optimizing heavy imports

#### Barrel files

#### Circular dependencies
