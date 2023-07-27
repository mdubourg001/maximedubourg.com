---
title: "Today I Learned"
description: "Things I learn on a daily basis, without specific order nor specific format."
date: 07/27/2023
living: true
---

# Today I Learned

This document is a collection of things I learn on a daily basis, without specific order nor specific format.

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
