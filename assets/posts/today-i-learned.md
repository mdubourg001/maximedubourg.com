---
title: "Today I Learned"
description: "Things I learn on a daily basis, without specific order nor specific format."
date: 07/25/2024
living: true
---

# Today I Learned

This document is a collection of things I learn on a daily basis, without specific order nor specific format.

## <small>25th of July 2024</small>

### → **`git switch -`**

`git switch -` allows you to switch to the previous branch you were on.

Also `cd -` works kinda the same way to switch to the previous directory you were in.

## <small>26th of September 2023</small>

### → **TS allows narrowing an string enum to a union of its values**

```typescript
enum Direction {
  Up = "up",
  Down = "down",
  Left = "left",
  Right = "right",
}

type DirectionValue = `${Direction}`; // --> "up" | "down" | "left" | "right"
```

## <small>6th of September 2023</small>

### → **Redirect (300+) HTTP status codes are not considered 'ok' on JavaScript `Response` objects**

The `ok` property of JavaScript's `Response` objects is `true` if the status code is between 200 and 299, and `false` otherwise.

```javascript
new Response(null, { status: 200 }).ok; // --> true
new Response(null, { status: 301 }).ok; // --> false
```

It's a thing to keep in mind when handling error statuses on fetch calls: **`Response.ok` is probably not what you want to check**.
The proper way to check if a response is an error is probably to check if the status code is 400 or more:

```javascript
const response = await fetch("https://example.com");

if (response.status >= 400) {
  // handle error
}
```

> See [Response: ok property](https://developer.mozilla.org/en-US/docs/Web/API/Response/ok) on MDN's website

## <small>29th of August 2023</small>

### → **URL.canParse**

The `URL` constructor has a `canParse` static method that returns `true` if the given string is a valid URL, and `false` otherwise. It's a great way to check if a string is a valid URL without having to add a `try/catch`.

```js
URL.canParse("https://google.com"); // --> true
URL.canParse("/malformed-url"); // --> false
```

Learned from [https://davidwalsh.name/url-canparse](https://davidwalsh.name/url-canparse)

## <small>21st of August 2023</small>

### → **Any JSON file is valid YAML**

YAML is actually a superset of JSON, meaning that any valid JSON file is also a valid YAML file.

> See [What is YAML?](https://www.redhat.com/en/topics/automation/what-is-yaml) on Red Hat's website

## <small>4th of August 2023</small>

### → **The weird case of calling `fetch()` with `redirect: "manual"`**

By default, `fetch` will follow HTTP redirects (= 30X status code + Location header) and return the response of the final URL.

**But**, there's a `redirect` option on `fetch` that can be set to `"manual"` to prevent this behavior and return the response of the first URL. Great !

**But**, if you do so, **your browser will make this response an `opaqueredirect` response and hide all of its headers and body** (from JS code only), and so you won't be able to access the `Location` header to do the redirect manually. Even setting [`Access-Control-Expose-Headers: Location`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Expose-Headers) on the server response doesn't change this behavior.

Turns out the `redirect: "manual"` option exists only to allow Service Workers to handle redirects offline, and is not really intended to be used anywhere else: [https://fetch.spec.whatwg.org/#ref-for-concept-filtered-response-opaque-redirect](https://fetch.spec.whatwg.org/#ref-for-concept-filtered-response-opaque-redirect).

## <small>27th of July 2023</small>

### → **Email clients do not have a good support of latest web features because... they don't need to**

As web developers we might think "why do I still need to write HTML emails using f\*cking tables and inline styles in 2023?", and the answer is: because email clients do not need to support latest web features to be competitive.

What really bothers email clients teams is the following: users want to be able to read their emails **quickly**, on **any device** (= not only on web-based clients), and **without being exposed to any security risks**.

Letting email developers use latest web features would mean maintaining such features (on all of their platforms), and wouldn't add any value to their end users, which do not care _at all_ how you built it. So they don't do it.

If you want to know what you can use while building emails, check [https://www.caniemail.com/](https://www.caniemail.com/scoreboard/).

## <small>17th of July 2023</small>

### → **SVG elements can be kinda magically animated using CSS**

> Basically this article : [https://css-tricks.com/svg-line-animation-works/](https://css-tricks.com/svg-line-animation-works/)

By setting a stroke on an SVG shape and using a simple CSS animation, you can animate the drawing of the shape.
Here's the trick on a circle + check mark SVG:

```html
<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
  <circle cx="100" cy="100" r="80" pathLength="1" />
  <path d="m54 107.5 34 31 56.5-71" pathLength="1" />
</svg>

<style>
  @keyframes draw {
    to {
      stroke-dashoffset: 0; /* 3. the offset is animated to 0 */
    }
  }

  circle,
  path {
    stroke: #40ad4a;
    stroke-width: 20px;
    stroke-dasharray: 1; /* 1. the shape is a single dash */
    stroke-dashoffset: 1; /* 2. the dash is hidden by default */
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  circle {
    transform-origin: 100px 100px;
    transform: rotate(-90deg);
    animation: draw 0.6s linear forwards;
  }

  path {
    animation: draw 0.4s linear forwards 0.6s;
  }
</style>
```

Here's what it looks like on a button (just inspect to get the whole snippet):

<button id="check-button" class="flex items-center px-3 py-1 bg-black rounded-md shadow gap-x-2">
  <span class="text-lg font-medium text-white">Try me!</span>

  <svg id="check-svg" class="hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="25" height="25">
    <circle cx="100" cy="100" r="80" pathLength="1"/>
    <path d="m54 107.5 34 31 56.5-71" pathLength="1"/>
  </svg>
</button>

<script type="application/javascript">
  const button = document.getElementById('check-button');
  const svg = document.getElementById('check-svg');

  button.addEventListener('click', () => {
    svg.classList.toggle('hidden');
    button.classList.toggle('button--svg-visible');
  });
</script>

<style>
  @keyframes draw {
    to {
      stroke-dashoffset: 0;
    }
  }
  #check-svg circle,
  #check-svg path {
    stroke: #40ad4a;
    stroke-width: 20px;
    stroke-dasharray: 1;
    stroke-dashoffset: 1;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
  #check-svg circle {
    transform-origin: 100px 100px;
    transform: rotate(-90deg);
    animation: draw 0.6s linear forwards;
  }
  #check-svg path {
    animation: draw 0.4s linear forwards 0.6s;
  }
</style>
