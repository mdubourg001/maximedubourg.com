---
title: Benchmarking JS code, Golang flavored
description: Unlike Golang, JS/TS lacks baked-in benchmarking utilities. Here's a solution to tackle this problem.
date: 27/01/2022
status: draft
---

# Benchmarking JS code, Golang flavored

Unlike Golang, the JavaScript language (or more precisely, JavaScript runtimes) doesn't provide baked-in solutions for testing, nor **benchmarking**.

Here's how you would benchmark a function finding all the prime numbers under 1000 in Golang:

```go
package main

import (
    "testing"
)

func BenchmarkFindPrimes(b *testing.B) {
    for i := 0; i < b.N; i++ {
        FindPrimes(1000)
    }
}
```

By running `go test -bench=.`, you'd get something like that:

```plaintext
BenchmarkFindPrimes-8     14588     82798 ns/op
```

- `BenchmarkFindPrimes-8` is the name of the benchmark test
- `14588` is the number of times your function was able to run in **one second** (higher is better)
- `82798 ns/op` indicates **how much time each run took** in average (lower is better)

**The key in Golang benchmark feature is `b.N`**: as long as your for loop takes less than **one second** (default value) to complete, Go will keep **(kinda) doubling** the value of `b.N` and run the loop again. `b.N` will then take the values `1`, `2`, `4`, `10`, `20`, `50`, `100`, `200`...

So basically, for the prievous example:

- `14588` is the max value `b.N` could take before your loop took one second or more to complete
- `82798 ns/op` is that time (>= 1 second) in nanoseconds divided by `b.N`

## JavaScript implementation

The implementation is pretty simple:

```javascript
const { performance } = require("perf_hooks");

async function benchmark(fn) {
  let N = 0.5;
  let benchtime;

  do {
    N *= 2;

    let start = performance.now();
    await fn({ N });
    benchtime = performance.now() - start;
  } while (benchtime < 1_000);

  console.log({
    N,
    benchtime,
    nsOp: (benchtime * 1_000_000) / N,
  });
}
```

As explained before, we just **double the value of `N`** and measure again until the execution time becomes **greater than one second**.

Our `benchmark` function can be used as follows:

```javascript
await benchmark((b) => {
  for (let i = 0; i < b.N; i++) {
    findPrimes(100);
  }
});
```

One important difference with Golang to be noted is that **we must `await` every call to `benchmark`** to be sure the output is representative: **unlike Golang, JavaScript is a monothreaded language**, which means not `await`ing our benchmarks would make them run concurrently on a same thread and thus output biased results.

## "Should I benchmark all my JS code ?"

**No, you should'nt.**

Most of your code probably doesn't even need benchmarking at all. Performance optimizations take time and often come with **code readability tradeoffs**, and thus should not be made before actually **noticing** performance issues.

**But**, in some cases like when developing critical web services or dev tooling, performance might actually be a need, and in such cases benchmarking small and isolated functions can help you maintaining you performance goals.
