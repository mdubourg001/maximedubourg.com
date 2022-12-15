---
title: Write dynamic email templates like a breeze with MJML in React
description: Writing email templates can be painful and repetitive, even when using MJML. But there is a way to make it much easier, by using MJML in React.
canonical: https://medium.com/ekino-france/write-dynamic-email-templates-like-a-breeze-with-mjml-in-react-f93d9687cf5b
date: 12/07/2022
---

# Write dynamic email templates like a breeze with MJML in React

Writing good looking emails is usually not the first task of your product backlog, but eventually, every product
ends up needing it.

If you ever looked up at what an email's source code looks like,
**you wouldn't even consider writing it in plain HTML**
(really, you can't be **that** crazy)...

```html
<!-- [...] -->

<!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:504px;" ><![endif]-->
<table cellpadding="0" cellspacing="0" style="...">
  <tbody>
    <tr>
      <td
        style="direction:ltr;font-size:0px;padding:0 48px 28px;text-align:center;"
      >
        <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:504px;" ><![endif]-->
        <table cellpadding="0" cellspacing="0" style="...">
          <!-- no flexbox or grid... -->
          <!-- just tables in tables in tables... -->
        </table>
      </td>
    </tr>
  </tbody>
</table>

<!-- [...] -->
```

> _a foretaste of hell (circa 2022, colorized)_

<br />

So, how then?

## MJML to the rescue

**Fortunately, [MJML](https://mjml.io/) was created to save our souls**.
It's an awesome framework that abstract most of the pain of writing responsive HTML emails by providing
a set of stylable components (buttons, columns, images...) that you can reuse to write the markup of your emails.

```html
<mjml>
  <mj-body>
    <mj-section>
      <mj-column>
        <mj-image width="100px" src="/logo.png"></mj-image>
        <mj-divider></mj-divider>
        <mj-text font-family="helvetica">Hello World</mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
```

To install it from npm, without surprise:

```bash
npm i mjml
```

MJML also provides a way to include external .mjml files in your templates using
[`<mj-include>`](https://documentation.mjml.io/#mj-include),
which **allows you to reuse some markup in several emails**.

But as **MJML is not a templating language**, there are things it doesn't provide, and that you might need:

- variables
- conditionals
- loops
- _parametrized_ components

So **as long as you have a single email template to write**, or that none of you emails needs
such templating features, **MJML by itself is great, and sufficient**. But as soon as you need
to go a bit further, you'll need to pair it with a templating engine, like **React**.

## Using React templating features with MJML

Even if React is mostly known as a reactive view library, it provides all the features
you would expect from a templating engine and a composition library.

```bash
npm i react react-dom
```

So let's say **we have to write several email templates that all share the same Header, main content, and Footer**, and
that only some text change between them:

### 1. First, we need components

Let's start by creating our three components (only `Header.tsx` is detailed here, but the principle is the same for other components):

#### `components/Header.tsx`

```tsx
export function Header({ title, logo }) {
  return (
    <mj-section background-color="#fff">
      <mj-column>
        {logo && <mj-image width="150px" src={logo} />}
        <mj-text>{title}</mj-text>
      </mj-column>
    </mj-section>
  );
}
```

#### `components/MainContent.tsx`

```tsx
export function MainContent({ content, buttonLabel }) {
  // ...
}
```

#### `components/Footer.tsx`

```tsx
export function Footer() {
  // ...
}
```

### 2. Then, use these components to create our email templates

Each email template is just a **React component that reuses the components** we just created.
Here's an example for a welcoming email sent to our customer after they just signed up:

### `WelcomeEmail.tsx`

```tsx
import { Header } from "components/Header";
import { MainContent } from "components/MainContent";
import { Footer } from "components/Footer";

export function WelcomeEmail() {
  return (
    <mjml>
      <mj-body>
        <Header
          title="Thank you for your inscription and welcome!"
          logo="https://example.com/logo.png"
        />

        <MainContent
          content="We are happy to count you amongst our beloved customers."
          buttonLabel="Sign in to access your account"
        />

        <Footer />
      </mj-body>
    </mjml>
  );
}
```

And so on for other email templates, **we just need to change the props passed to components**!

### 3. Finally, let's build all that

As our goal is to build static HTML email templates, we won't need any of React's runtime-related features,
so **we will use ReactDOM's `renderToString` function to transform our React templates into MJML templates, and finally to HTML templates**.

No need for a complicated build tool here, a good ol' NodeJS script will do the trick
(but written in TypeScript, we're not savages):

```tsx
// scripts/build.tsx

import * as React from "react";
import { renderToString } from "react-dom/server";
import mjml2html from "mjml";
import { join, relative } from "node:path";
import { mkdirSync, writeFileSync } from "node:fs";

const DIST_DIR = join(__dirname, "dist");
const TEMPLATES = {
  welcome: WelcomeEmail,
  // just add other templates here like: <filename>: TemplateComponent
};

// ensure dist dir before outputing our built templates
mkdirSync(DIST_DIR);

for (const name of Object.keys(TEMPLATES)) {
  const TemplateComponent = TEMPLATES[name];

  // building our React template component to get MJML markup
  const mjml = renderToString(<TemplateComponent />);

  // then building the MJML markup to get the final HTML email template
  const { html } = mjml2html(mjml, { validationLevel: "strict" });

  // writing the final HTML template to filesystem
  const htmlPath = join(DIST_DIR, `${name}.html`);
  writeFileSync(htmlPath, html, { encoding: "utf-8" });
  console.debug(`Wrote ${relative(__dirname, htmlPath)}`);
}
```

As we wrote our templates/components and our build script in TypeScript,
**we must run it with a tool like [`tsx`](https://github.com/esbuild-kit/tsx)**.

```bash
# install tsx
npm i tsx -D

# run the build script
tsx scripts/build.tsx
```

### 4. Optional: Get a nicer development experience

As every project, we might need to iterate a bit while developing,
so **let's get a simple but comfortable environment to work with**:

- [`simple-hot-reload-server`](https://github.com/imcuttle/simple-hot-reload-server): Serve static files from a directory with automatic hot-reload. We'll use it to serve our built templates during local development.
- [`concurrently`](https://github.com/open-cli-tools/concurrently): Run multiple commands concurrently

```bash
npm i simple-hot-reload-server concurrently -D
```

Then, in `package.json`:

```json
{
  // ...
  "scripts": {
    "prepare": "mkdir -p dist/",
    "build": "tsx scripts/build.tsx",
    "build:watch": "tsx watch scripts/build.tsx",
    "serve": "npm run prepare && hrs dist/",
    "dev": "concurrently --kill-others npm:build:watch npm:serve"
  }
  // ...
}
```

By running `npm run dev`, we'll now have
**automatic hot-reload (upon changes) of our built templates served locally on the 8080 port**.

## Conclusion

- **MJML is an awesome tool**, it abstracts a lot of the pain of writing HTML emails like tables, media queries, and so on
- It provides an "inclusion" feature, **but doesn't allow to pass parameters**, nor to write conditions, loops, etc
- To be able to use such templating features, **you can use React (or any other templating engine) to build your templates** as React components
- It allows you to **create reusable and parametrized components** that you can reuse across several email templates
- Using ReactDOM's `renderToString` function, and MJML's `mjml2html`, you can easily transform your React templates into MJML markup, and finally into HTML email templates
- When working on projects with large emailing needs, you can even consider **fully embracing the React+MJML stack using tools like [react-mjml](https://github.com/Faire/mjml-react)**
