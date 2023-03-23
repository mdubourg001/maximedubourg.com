---
title: "Effective form development in React"
description: While being the most common subject in web applications, forms are still hard to get right in React. Here's my shot at writing forms efficiently in React.
date: 03/22/2023
status: "draft"
---

# Effective forms development in React

If there is a thing that almost all user-facing softwares have in common, it is **forms**.
They are the way users interact with applications and thus are **a central part of most products**,
and it is especially true for _web_ applications.

With the rise of modern JavaScript frameworks (in our case React), a lot of common issues have been made really
easier to solve for frontend developers, but while several libraries took their shots,
**forms are still not easy to get right in React**.

## What makes forms hard ?

As said before, forms are the way for users to interact with applications, which implies several things:

- being directly provided by humans, **forms data need to be validated** before being used anywhere (worth for every piece of data that is not coming from inside your application, you'll thank me later). As many validation rules may be common to several forms, their quantity and complexity often grow as the application grows and as the business logic evolves
- as they are subject to validation, forms data will be **source of validation errors, which need to be displayed to the user** for them to correct their input
- as modern applications often contain more than simple contact forms, **some form fields may sometimes be bound to others**, (ex: several fields changing their value while the user fills a single input): this usually implies some declarative business logic (=code) to be written somewhere
- for the same reasons as the previous point, **form fields often produce a lot of different data types**: texts, booleans, numbers, dates, times, datetimes, files, objects (yes! think creatable selects for example), etc... This makes state management and business logic complex to abstract and maintain
- TODO: form data is often sent to an API which itself validates, =handling server errors, HTTP request state

## What does not work in common solutions ?

<!-- <blockquote class="twitter-tweet"><p lang="en" dir="ltr">
I&#39;m dissatisfied with the state of form libraries. Every time I look into one, it normally does too much of stuff I don&#39;t care about and doesn&#39;t support stuff I do care about (or maybe it does, but it&#39;s hiding behind all the extra fluff).</p>&mdash; Kent C. Dodds 🌌 (@kentcdodds) <a href="https://twitter.com/kentcdodds/status/1610785661816279041?ref_src=twsrc%5Etfw">January 4, 2023</a>
</blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> -->

---

##### Brainstorming

- why are forms hard : validation, state management, performance, reusability, verbosity, magic
- existing solutions : react-hook-form.com, formik, useState
- [forms state is ephemeral and local by Dan. A](https://github.com/reduxjs/redux/issues/1287#issuecomment-175351978)
