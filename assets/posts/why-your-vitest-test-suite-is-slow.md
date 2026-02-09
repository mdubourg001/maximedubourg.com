---
title: "Why your Vitest test suite is slow (and how to fix it)"
description: "After migrating to Vitest, we noticed a performance drop running our test suite. Here are the changes that helped us improving a lot."
date: 02/09/2026
# TODO: canonical
---

# Why your Vitest test suite is slow (and how to fix it)

After weeks of configuration and tweakings, my team and I finally made it, **we've migrated from Jest to Vitest!**

Our project is a big old React SPA, made of ~307k LOC, with ~500 test files for a net total of ~2662 tests (unit and component/integration tests).

We had been wanting to migrate out of Jest for some time for several fairly common reasons: its poor ESM support, the complexity of its configuration, and most of all, the belief that a more modern tool would run our tests much faster.

Naturally, after trying out one other candidate on a parallel migration branch ([Rstest](https://rstest.rs/), that wasn't mature enough for our needs), our choice fell on Vitest for also very common reasons: its great ESM support, its simple and straightforward configuration, its modern DX, its ecosystem, and obviously, **its performance... that turned out to be not so great.**

_"What? But Vitest is one of the most performant JS test runners! It's much faster than Jest on my project!"_, you'll tell me. That's what we also expected after reading [comparisons](https://vitest.dev/guide/comparisons#jest) and several testimonials online, but it turned out that, in our case, **Vitest was actually ~1.5x slower than Jest locally, and ~2x slower on CI... Yikes.**

After more research, we found out that we were not the only team to notice such a slowdown compared to Jest (see for example [this issue](https://github.com/vitest-dev/vitest/issues/579), [this first](https://bradgarropy.com/blog/jest-over-vitest), [this second](https://dev.to/thejaredwilcurt/vitest-vs-jest-benchmarks-on-a-5-year-old-real-work-spa-4mf1), or [this third blog post](https://dev.to/neophen/vitest-is-fast-jest-is-faster--ln1), or even [this Reddit thread](https://www.reddit.com/r/reactjs/comments/10zyse3/is_jest_still_faster_than_vitest/)), but apart from performance, all of our other expectations were met! So we were not ready to give up with Vitest!

It's now been a month since the migration, and I'm happy to say that **we've finally successfully made our Vitest setup faster than our old Jest one! Here's how we did it.**

## What slows down test runners

To fully understand the improvements we're about to discuss, we first need to understand how test runners run a test suite. Jest and Vitest will typically go through the following pipeline:

- **1. Test discovery**: scan project files to find out which are test files.
- **2. Worker allocation**: split test files between child processes or threads.
- **3. Per-file execution**: for each test file, _a._ resolve the import dependency graph, _b._ transform resolved modules, _c._ evaluate transformed modules, and finally _d._ execute the test file itself.

<img class="border my-8" src="/static/images/test-runner-101.png" alt="Schema of a test runner execution pipeline" />

As shown in the previous schema, test runners generally keep a _transform cache_ to avoid retransforming already compiled modules for following tests. They also keep a _module cache_ that stores the state of evaluated modules in memory. By default, test runners clear that module cache between test files to avoid side effects: it means that if two test files running in the same worker import the same module, they each get a separate clean instance of that module: **this is called <u>[test isolation](https://vitest.dev/guide/improving-performance.html#test-isolation)</u>.**

But test isolation obviously comes with a cost! Clearing the module cache between two test files means that subsequent imports of a given module will retrigger its whole evaluation: top-level code execution, binding of its exports, and resolutions of its imports. **This is one of the most common reasons for a test suite slowing down: tests importing large dependency graphs, meaning longer evaluation times due to test isolation.**

But that doesn't explain why Vitest was, in our case, slower than Jest. Both Jest and Vitest have the constraint of test isolation, so...

#### What is the reason for Vitest being slower?

<div class="border-l-2 border-orange-400 pl-4">

Vitest's architecture is built on Vite, which was designed for dev servers and bundling, and not really for the pattern test runners need, which is repeatedly importing thousands of modules across many isolated workers. Jest has spent years optimizing its custom module system for exactly that workload, which moreover relies on native Node.js's `require`, which is really fast. On the other hand, while Vitest is much faster than Jest when it comes to transform speed (esbuild/Rolldown being much faster than babel/ts-jest), **its module evaluation system, which intercepts every import to resolve and execute it through Vite's plugin system, can become a bottleneck for test suites with deep dependency trees**, where module evaluation and resolution (rather than transformation) are the real cost, which was sadly our case our case.

</div>

### Breaking down tests duration

With Vitest, the built-in `default` reporter gives you the duration it took to run your tests at the end of its output.
It also gives you **a breakdown of the cumulated times Vitest took** across its different workers to complete its different tasks.

For example, here's Vitest duration breakdown after running my test suite on my Mac after migrating from Jest:

```txt
Duration 67.79s
  (transform 26.76s,
   setup 169.58s,
   import 222.28s,
   tests 47.56s,
   environment 116.24s)
```

[According to one of Vitest's maintainers](https://github.com/vitest-dev/vitest/discussions/1770#discussioncomment-3304723), here's what each of these numbers mean:

- **transform** is the time it took to transform (=compile) your code
- **setup** is the time it took to run the configured `setupFiles`
- **import** is the time it took to import the transformed test files (and their dependency tree) in the memory of each worker
- **tests** is the time it took to actually run your test files
- **environment** is the time it took to load the test environment (~=for us, mostly preparing JSDOM for each test)

As you can see, most of the work comes from importing modules in memory and in modules cache, and running `setupFiles`: improving our test suite duration will thus come from reducing Vitest's workload on these tasks.

## Areas of improvement

A lot of tips and config changes are already well documented and covered [in the Vitest documentation](https://vitest.dev/guide/improving-performance.html) and in several articles, like [this one](https://dev.to/thejaredwilcurt/improving-vitest-performance-42c6) for example. Here I'll try to cover two approaches that are a bit more demanding in terms of work and setup, but had a net positive impact on performance for us.

### Disable isolation wherever it is possible

<p class="text-gray-700 italic">
  <b>Perf. improvements insights:</b> for us, test suite ~6x faster.<br />
  → Duration  18.07s (transform 45.43s, setup 11.47s, import 64.27s, tests 64.51s, environment 138.03s)
</p>

As you probably already guessed it by reading the previous section: one of the main areas of improvement is to **disable isolation.**
Yeah, easier said than done as disabling isolation on a big test suite will most probably break some (if not many) tests...

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

In the case of my team, as it's often the case for big test suites, this broke a lot of tests, but the thing to keep in mind is that non-isolated tests do not break when run alone, by themselves, **they break when run along other tests, because of shared-state pollution**. The goal in that situation is to find these tests that modify shared state without proper cleanup; common culprits often include:

- **Mocks, stubs, or spies ([mocking](https://vitest.dev/guide/mocking.html#mocking)) without proper cleanup**: these persist in the module cache and can affect subsequent tests. Hint: you can configure Vitest to automatically cleanup these using config's `clearMocks`, `mockReset`, `restoreMocks`, `unstubEnvs` and `unstubGlobals`. See [docs here](https://vitest.dev/config/clearmocks.html).

- **Global object mutations**: modifying `window`, `document`, or `globalThis` properties

- **Dangling side effects:** event listeners, timers, or intervals not cleaned up in `afterEach`

- **Shared objects or singleton instances modifications** (most common): if your app's state relies on libraries like Redux (still commonly found in large codebases), zustand, or TanStack Query, there are chances several tests are using the same shared instances of Redux stores or in-memory caches. In such cases, it's frequent one test will update a piece of state (eg. by dispatching an action or fetching some data that will be cached), which will be unexpected by some other tests and thus make them break. To fix such tests, **make sure to have each test create and use its very own instances** of stores, shared caches, or whatever other shared objects it might use.

That being said, finding shared polluted state amongst a large quantity of tests can sometimes be hard: if the 100th test file fails when running your whole test suite non-isolated, **how to find the exact previously run test that mutated some shared instance somewhere and polluted the failing test?** Let's dig it.

#### Finding the exact polluting test amongst run tests

Vitest provides an option to run test files in a random order to help debugging tests dependencies: [`--sequence.shuffle`](https://vitest.dev/config/sequence.html#sequence-shuffle). To be able to get a reproducible output, you'll also want to run your tests on a single worker and stop tests execution after the first failing test using `--fileParallelism=false` and `--bail=1`:

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

The idea now that you have a reproducible _failing_ execution order (Vitest will give you the random [seed](https://vitest.dev/config/sequence.html#sequence-seed) when running with `--sequence.shuffle`, keep it somewhere) is to narrow down to the smallest pair of tests failing when run together **using binary search**. Start with the first 50 (out of 99) suspects:

We loop because the shuffled order varies per run, so we retry until we hit a failing order:

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

- If it fails → culprit is in tests 1-50, bisect again (= run on tests 1-25)
- If it passes → culprit is in tests 51-99, bisect that half

Doing this by hand is _really_ painful, so **I hacked a custom Vitest reporter to make the test order identification and the bisection job much faster. See the GitHub Gist [here](https://gist.github.com/mdubourg001/982493993ce6cbefd061772450dfeb8c)**.

Repeat the process until you isolate the pair of polluting/polluted tests (takes ~7 iterations for 100 tests).
You should now investigate what state is being shared between these two test files and causes state pollution, and fix it.

Now, making such corrections in a big test suite can be a daunting task, but I would like to emphasize something: <u>**fixing tests to not need isolation is often better than just isolating them.**</u> A test that leaks state is a code smell. Sometimes the fix is simple (add cleanup), and you get both correctness AND performance, but once you've fixed what you can, some tests may still require isolation.

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

Given such configuration, **only test files ending with `isolated.test.tsx` will run in isolation**, others will remain non-isolated. This solution gives you the benefits of disabling isolation where it is possible while giving you some time to fix the remaining leaking tests.

### Optimize heavy imports

<p class="text-gray-700 italic">
  <b>Perf. improvements insights:</b> for us, ~40% less time to run tests.<br />
  → Duration 10.39s (transform 12.84s, setup 9.99s, import 28.80s, tests 44.94s, environment 174.80s)
</p>

Disabling isolation makes Vitest **re**-importing the same modules less across tests, **but it doesn't prevent it from importing unneeded modules**: the second improvement will be to identify the heavy imports our test files make.

#### How to identify heavy imports?

Identifying exactly what imports are costly across your whole test suite can be hard: it's often a mix of feeling, tweaking and retrying. To help measuring and pointing out exactly what imports add up to the most total time while running your tests, **I also crafted a [custom Vitest reporter](https://gist.github.com/mdubourg001/aa561344f3f912513863409e7f288ad5)**, which will help you direct your efforts.

> Vitest is also testing an experimental configuration option to do the same thing: [`experimental.printImportBreakdown`](https://vitest.dev/guide/cli.html#experimental-printimportbreakdown).

Generally speaking, heavy imports are either from barrel files, or from big external dependencies:

#### Imports from barrel files

Barrel files are modules that centralize the exports of multiple other modules into a single entry-point. They solely exist for "DX" reasons: importing modules more easily.

```ts
// in helpers/index.ts

export * from "./date";
export * from "./string";
export * from "./misc";
```

While such files are easily tree-shaken by modern bundlers when building for production, **they considerably slow down test runners** as they make them transform and import unneeded code for potentially a lot of test files.

The use of barrel files also often leads to something bad: circular dependencies. **A circular dependency is what we name two modules that are directly or indirectly importing each other.** As barrel-files, they are correctly handled by most modern bundlers, but they tend to slow down test runners and even generate unwanted tests behaviour.

The solution is quite straightforward for this kind of files: **<u>get rid of them</u>.** There is simply no good reason for owned code (=internal code, not distributed outside of the repository) to contain barrel files as our favourite IDEs now implement high standard auto imports features for every languages. A lot of good articles ([like this one](https://marvinh.dev/blog/speeding-up-javascript-ecosystem-part-7/)) are already explaining why barrel files are bad.

> Solutions do exist in order to find and remove barrel files/circular dependencies automatically: for example [no-barrel-files](https://github.com/Nergie/no-barrel-file) or [unbarrelify](https://github.com/webpro/unbarrelify) for barrel files and [madge](https://github.com/pahen/madge) for circular dependencies.

#### Imports from big external dependencies

Sometimes, test files also needlessly import big dependency trees from external libraries (ironically often because such libraries expose barrel files as their entry points).
One of the examples my team and I encountered was imports from the famous `date-fns` library:

```ts
import { isBefore } from "date-fns";

// ...
isBefore();
```

In such cases, there are two ways to prevent unneeded imports:

- **Import directly from the end module (=skip the barrel file)**: (not always possible as some libraries do not expose "isolated" modules but) in the previous example, directly do `import { isBefore } from "date-fns/isBefore"`.
- **Use Vitest [dependency optimization](https://vitest.dev/config/deps.html#deps-optimizer)**: Vitest provides a configuration option to force pre-bundling specific modules in single files and thus prevent the need to recompute large module trees: `deps.optimizer`. For the previous example, we'd have the following:

```ts
// ...
deps: {
  optimizer: {
    client: {
      enabled: true,
      include: ['date-fns/**'],
    },
  },
},
```

## Results

To sum it up, here's a before/after comparison of our test suite performance:

|                                 | Duration   | transform | setup   | import  | tests  | environment |
| ------------------------------- | ---------- | --------- | ------- | ------- | ------ | ----------- |
| **Before** (isolation on)       | **67.79s** | 26.76s    | 169.58s | 222.28s | 47.56s | 116.24s     |
| **After** (isolation off)       | **18.07s** | 45.43s    | 11.47s  | 64.27s  | 64.51s | 138.03s     |
| **After** (+ optimized imports) | **10.39s** | 12.84s    | 9.99s   | 28.80s  | 44.94s | 174.80s     |

The biggest win by far came from disabling test isolation (~6x faster), while removing some barrel files and enabling dependency optimization on some libraries gave us an additional ~40% improvement! Combined, these changes brought our Vitest setup from being ~1.5x slower than Jest to being faster than our old Jest configuration.

I hope these few ideas will help you tackle your test suite's performance problems.
