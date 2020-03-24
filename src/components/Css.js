import React from "react";
import Head from "next/head";

export default () => (
  <Head>
    <link
      href="https://cdn.jsdelivr.net/npm/tailwindcss@0.7.4/dist/tailwind.min.css"
      rel="stylesheet"
    />
    <link href="https://unpkg.com/jam-icons/css/jam.min.css" rel="stylesheet" />
    <link
      href="https://unpkg.com/hint-css.js@1.1.0/src/hint-css.css"
      rel="stylesheet"
    />

    <link
      href="https://fonts.googleapis.com/css?family=Montserrat:400,700"
      rel="stylesheet"
      lazyload
    />
    <link
      href="https://fonts.googleapis.com/css?family=Satisfy"
      rel="stylesheet"
      lazyload
    />

    <link href="/style.css" rel="stylesheet" />
  </Head>
);
