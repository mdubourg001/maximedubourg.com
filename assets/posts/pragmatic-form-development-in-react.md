---
title: "Pragmatic form development in React"
description: While being the most common subject in web applications, forms are still hard to get right in React. Here's my shot at writing forms pragmatically in React.
canonical: https://medium.com/ekino-france/pragmatic-form-development-in-react-66a563aa5e43
date: 06/08/2023
---

# Pragmatic form development in React

If there is a thing that almost all user-facing softwares have in common, it is **forms**.
They are the way users interact with applications and thus are **a central part of most products**,
and it is especially true for _web_ applications.

With the rise of modern JavaScript frameworks, a lot of common issues have been made really
easier to solve for frontend developers, but while several libraries took their shots,
**forms are still not easy to get right in React**.

## What makes forms hard ?

As said before, forms are the main way for users to interact with applications. This implies several things:

- being directly provided by humans, **forms data need to be validated** before being used anywhere (_advice worth for every piece of data that is not coming from inside your application, you'll thank me later_). While many validation rules may be common to several forms, their quantity and complexity often grow as the application grows and as the business logic evolves
- as they are subject to validation, forms data will be **source of validation errors, which need to be displayed to the user** for them to correct their inputs
- as modern applications often contain more than simple contact forms, **some form fields may sometimes be bound to others**, (ex: several fields changing their value while the user fills a single input): this usually implies some **declarative** business logic to be written somewhere, and is hard to abstract
- for the same reasons as the previous point, **form fields often produce a lot of different data types**: texts, booleans, numbers, dates, times, datetimes, files, objects (yes! think creatable selects for example), etc... This makes state management and business logic complex to abstract and maintain
- except in the case of local-first applications, **data filled into forms are usually sent to servers over HTTP**, which implies handling HTTP requests states (loading, success, error...) that often have incidence on forms fields, as well as **potential server errors** (validation errors, internal errors, etc...) that also need to be displayed to the user. Such forms usually also **need to be filled with initial data coming from the server** (in the case of reopening a form in "edit" mode for example), which implies even more HTTP requests to handle, formatting, asynchronous logic, etc...

All these constraints off course vary with the nature, complexity, and size of applications, but they are the most common pain points of developing forms.

## What is wrong with form libs ?

> **I have to clarify that I'm not trying to tackle on any of the libraries I mention here, I've used them extensively and they are great tools that do a lot of good for the React community.**

<div style="padding: 10px 0 30px">
<blockquote class="twitter-tweet"><p lang="en" dir="ltr">
I&#39;m dissatisfied with the state of form libraries. Every time I look into one, it normally does too much of stuff I don&#39;t care about and doesn&#39;t support stuff I do care about (or maybe it does, but it&#39;s hiding behind all the extra fluff).</p>&mdash; Kent C. Dodds 🌌 (@kentcdodds) <a href="https://twitter.com/kentcdodds/status/1610785661816279041?ref_src=twsrc%5Etfw">January 4, 2023</a>
</blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</div>

Popular React forms libraries (as for example [**react-hook-form**](https://react-hook-form.com/) or [**formik**](https://formik.org/)) are greats tools that can help React developers to build forms fastly, but in my opinion, they share the same drawback:

**They try to abstract a domain that is intrisically too diverse to be abstracted correctly**: as a project grows, almost no form will remain "simple" (i.e. keep constant validation rules, keep no "other-field-dependent" update logic, etc...), and **the more complex they get, the more the abstraction provided by these libraries becomes a pain point**.

I did not discovered this issue by myself as it's something that has been discussed a lot in the web development community. It is for example discussed in this well known article: [**Avoid Hasty Abstractions (AHA)**](https://kentcdodds.com/blog/aha-programming).

So, what's my point here ?

## Sometimes, the right library is no library

About a year ago, at [ekino](https://www.ekino.com/), I initiated the application I was about to work on for at least the upcoming year
(I'm still working on it to the day I'm writing this article). I knew this application would mostly be composed
of forms, **BIG** forms (more than 30 fields for some of them).
Yet, for the reasons I explained above, **I made the decision not to use any form library**.

After now a year of working and maintaining this project every day, **I can say that I do not regret this decision**.

Here's a detailed sight of what I used instead:

> ℹ️ TL;DR: The following part details the implementation step by step, you can find the full source code [on this sandbox](https://codesandbox.io/s/effective-react-form-development-m19i7w).

### 1. Several field components, but the same API

As stated earlier in this article, one of the pain points when developing forms in React is to handle the variety of data types that can be used in forms.
As in most frontend projects, my first step was to create a set of _presentational_ components for each type of field my forms would use.

The key for me here was to **make sure every one of these components had the same read/write API (understand "the same props")**:

```tsx
export type ChangeEventBase<T> = {
  target: {
    name: string;
    value: T;
  };
};

export type BlurEventBase = {
  target: {
    name: string;
  };
};

// ----- TextField.tsx -----

export type TextFieldProps = {
  value: string;
  error?: string;
  onChange: (event: ChangeEventBase<string>) => void;
  onBlur: (event: BlurEventBase) => void;
  // ...
};

//  ----- SelectField.tsx -----

export type SelectOption = { label: string; value: string };

export type SelectFieldProps = {
  value: SelectOption["value"];
  error?: string;
  options: SelectOption[];
  onChange: (e: ChangeEventBase<SelectOption["value"]>) => void;
  onBlur: (e: BlurEventBase) => void;
  // ...
};

// same goes for CheckboxField, DateField, etc...
```

Here are the things to notice here:

- having the same API for all field components allows to plug **the same event handlers on all of them**
- this API is actually just a **subset of HTML's `<input />` API and React's change/focus API** (`React.ChangeEvent<HTMLInputElement>` and `React.FocusEvent<HTMLInputElement>`), we can always add more fields to these types if the need comes (it most probably will !), the idea is just to **keep a common base between components**

📁 Here's what our project structure looks like for now, (it will be updated after every step):

```txt
src/
└── presentationals/fields/
    ├── TextField.tsx
    ├── CheckboxField.tsx
    └── SelectField.tsx
```

### 2. We have fields, now we need a form

This step is actually a _fake_ one!

Not to reproduce the things I didn't like in common form libraries and to keep the control of my forms, **I did not create any `Form` component or `useForm` hook to _magically_ abstract logic**, but instead used the standard **HTML's `form` element** and the **`useReducer` hook** to handle the state of my forms. Nothing more.

For the rest of this article, I'll take the example of building **a simple application form for a chess tournament**.

```tsx
// ----- ChessTournamentForm.tsx -----

import { TextField } from "../../presentationals/fields/TextField";
import { CheckboxField } from "../../presentationals/fields/CheckboxField";
import { SelectField } from "../../presentationals/fields/SelectField";
import { COUNTRIES_OPTIONS } from "./constants";

export function ChessTournamentForm() {
  return (
    <form>
      <TextField name="fullName" label="Full name" />
      <SelectField name="country" label="Country" options={COUNTRIES_OPTIONS} />
      <TextField name="eloRating" label="Elo rating" type="number" />

      <CheckboxField
        name="isGrandmaster"
        label="Yes, I'm a chess grandmaster"
      />

      <button type="button">Submit</button>
    </form>
  );
}
```

> About Elo rating: [https://www.chess.com/terms/elo-rating-chess](https://www.chess.com/terms/elo-rating-chess)

**As is, this form does nothing**. We now need to handle its state (values and errors), its validation, and then its submission.

### 3. Making the form alive

As I already talked about [in a previous article](/posts/the-future-proof-way-to-use-reducer.html), I really like React's `useReducer` hook to handle state and logic in my React apps, so naturally I also use it as the central part of my forms.

Althought our reducer will do a lot of things, let's start with the basics: **handling the state of the form**.

First we need to **define the shape of the state** that will hold the fields values:

```tsx
// ----- reducer.ts -----

import { SelectOption } from "../../presentationals/fields/SelectField";

type ChessTournamentFormState = {
  values: {
    fullName: string;
    country: SelectOption["value"];
    eloRating: string;
    isGrandmaster: boolean;
  };
};
```

Then, let's **define the action that will be dispatched** to the reducer to update the fields state (more actions will be added later):

```tsx
// ----- reducer.ts -----

// ...

// => 'fullName' | 'eloRating' | 'country' | 'isGrandmaster'
export type StateValuesKey = keyof ChessTournamentFormState["values"];

// => string | boolean
export type StateValuesValue =
  ChessTournamentFormState["values"][StateValuesKey];

type ChessTournamentFormAction = {
  type: "CHANGE_FIELD_VALUE";
  field: StateValuesKey;
  value: StateValuesValue;
};
```

And finally, let's create the reducer function:

```tsx
// ----- reducer.ts -----

// ...
import _ from "lodash";

// ...

export function getInitialState(): ChessTournamentFormState {
  return {
    values: {
      fullName: "",
      country: "",
      eloRating: "",
      isGrandmaster: false,
    },
  };
}

export function reducer(
  state: ChessTournamentFormState,
  action: ChessTournamentFormAction
): ChessTournamentFormState {
  switch (action.type) {
    case "CHANGE_FIELD_VALUE": {
      const newState = structuredClone(state);
      _.set(newState.values, action.field, action.value);

      // example of "other-field-dependent" update logic
      if (action.field === "eloRating") {
        newState.values.isGrandmaster = +action.value > 2500;
      }

      return newState;
    }

    default: {
      return state;
    }
  }
}
```

We can now wire our form together:

```tsx
// ----- ChessTournamentForm.tsx -----

// ...

import { useReducer, useCallback } from "react";

import {
  reducer,
  getInitialState,
  StateValuesKey,
  StateValuesValue,
} from "./reducer";

function ChessTournamentForm() {
  const [state, dispatch] = useReducer(reducer, undefined, getInitialState);

  const handleChange = useCallback(
    (event: ChangeEventBase<StateValuesValue>) => {
      dispatch({
        type: "CHANGE_FIELD_VALUE",
        field: event.target.name as StateValuesKey,
        value: event.target.value,
      });
    },
    []
  );

  return (
    <form>
      <TextField
        // ...
        value={state.values.fullName}
        onChange={handleChange}
      />
      <SelectField
        // ...
        value={state.values.country}
        onChange={handleChange}
      />
      <TextField
        // ...
        value={state.values.eloRating}
        onChange={handleChange}
      />
      <CheckboxField
        // ...
        value={state.values.isGrandmaster}
        onChange={handleChange}
      />

      <button type="button">Submit</button>
    </form>
  );
}
```

📁 The form is now fully working and reactive! Now let's add some validation, but first, here's a recap of our project structure at this point:

```txt
src/
├── presentationals/fields/
│   ├── TextField.tsx
│   ├── CheckboxField.tsx
│   └── SelectField.tsx
└── containers/ChessTournamentForm/
    ├── ChessTournamentForm.tsx
    └── reducer.ts
```

### 4. Validating user inputs and displaying errors

Data validation is a concern that is as old as software development itself and a lot of great libraries already exist to handle it in JavaScript, so we just have to plug one of them to our solution.

No big surprises here, **I chose [Zod](https://zod.dev/) for this purpose**.

Let's start by updating the state of our form to hold a potential error for each field, **using an `errors` object**:

```tsx
// ----- reducer.ts -----

type ChessTournamentFormState = {
  // ...

  errors: {
    fullName?: string;
    country?: string;
    eloRating?: string;
    isGrandmaster?: string;
  };
};

export function getInitialState(): ChessTournamentFormState {
  return {
    // ...

    errors: {},
  };
}
```

As we want the field validation to happen on field blur, we also need to **define the type of the action** that will be dispatched to the reducer when a field is blurred.

```tsx
// ----- reducer.ts -----

type ChessTournamentFormAction =
  | {
      type: "CHANGE_FIELD_VALUE";
      field: StateValuesKey;
      value: StateValuesValue;
    }
  | {
      type: "BLUR_FIELD";
      field: StateValuesKey;
    };
```

We also need to **define the Zod schema** that will be used to validate the form:

```tsx
// ----- validationSchema.ts -----

import { z } from "zod";

export const validationSchema = z.object({
  fullName: z.string().nonempty(),
  // yes, eloRating is a string
  // because it's what our input will give us
  eloRating: z.string().nonempty(),
  country: z.string().nonempty(),
  isGrandmaster: z.boolean(),
});
```

And finally, we can update our reducer to handle the blurred field validation. As we'll dispatch the name of the blurred field along the `BLUR_FIELD` action, we can use it to **pick the corresponding validation rule from the Zod schema and validate only the blurred field's value**:

```tsx
// ----- reducer.ts -----

import { validationSchema } from "./validationSchema";

// ...

export function reducer(
  state: ChessTournamentFormState,
  action: ChessTournamentFormAction
): ChessTournamentFormState {
  switch (action.type) {
    // ...

    case "BLUR_FIELD": {
      const newState = structuredClone(state);

      try {
        const narrowedSchema = validationSchema.pick({
          [action.field]: true,
        });
        narrowedSchema.parse(state.values);

        // if the validation succeeds,
        // we clear potential previous error for that field
        _.set(newState, ["errors", action.field], undefined);
      } catch (error) {
        if (error instanceof z.ZodError) {
          for (const issue of error.issues) {
            // else, we set the error message
            _.set(newState, ["errors", ...issue.path], issue.message);
          }
        }
      }

      return newState;
    }

    default:
      return state;
  }
}
```

Let's not forget to **wire our form to the validation logic**:

```tsx
// ----- ChessTournamentForm.tsx -----

// ...

function ChessTournamentForm() {
  // ...

  const handleBlur = useCallback((event: BlurEventBase) => {
    dispatch({
      type: "BLUR_FIELD",
      field: event.target.name as StateValuesKey,
    });
  }, []);

  return (
    <form>
      <TextField
        // ...
        error={state.errors.fullName}
        onBlur={handleBlur}
      />
      <SelectField
        // ...
        error={state.errors.country}
        onBlur={handleBlur}
      />
      <TextField
        // ...
        error={state.errors.eloRating}
        onBlur={handleBlur}
      />
      <CheckboxField
        // ...
        error={state.errors.isGrandmaster}
        onBlur={handleBlur}
      />

      {/* ... */}
    </form>
  );
}
```

📁 Great ! At this point, our form handles its state, its validation, and its error displaying.
Here's a recap of our project structure after this step:

```txt
src/
├── presentationals/fields/
│   ├── TextField.tsx
│   ├── CheckboxField.tsx
│   └── SelectField.tsx
└── containers/ChessTournamentForm/
    ├── ChessTournamentForm.tsx
    ├── validationSchema.ts
    └── reducer.ts
```

### 5. Submitting the form

Don't worry, we're almost done! This is the last step: handling the form submission. It can be divided in several parts:

- writing the **submission logic**: for this we'll rely on the great [`tanstack-query`](https://tanstack.com/query/latest/docs/react/quick-start) library as it will allow us to handle the form submission state and errors in a simple and elegant way
- writing **the reducer action that will be dispatched** when clicking the submit button, along with **the associated event handler**
- writing logic to update the **state of the form after the submission** (=global success / error messages)

Let's start with the submission logic. For this we need to **define the shape of the data** that will be sent to the server, and then **write the actual react-query mutation**:

```tsx
// ----- useRegisterToChessTournamentMutation.ts -----

import { useMutation } from "@tanstack/react-query";

export type RegisterToChessTournamentMutationVariables = {
  fullName: string;
  country: string;
  eloRating: number;
  isGrandmaster: boolean;
};

export function useRegisterToChessTournamentMutation() {
  return useMutation<void, Error, RegisterToChessTournamentMutationVariables>(
    async (variables) => {
      const response = await fetch(`/api/register-chess-tournament`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(variables),
      });

      if (!response?.ok) {
        throw new Error(response?.statusText);
      }
    }
  );
}
```

Our mutation is pretty simple but it fullfils its job: it sends the HTTP request and/or throws if needed.

Let's now add the reducer action and event handler that will be dispatched when clicking the submit button:

```tsx
// ----- reducer.ts -----

// ...

type ChessTournamentFormAction =
  | {
      type: "CHANGE_FIELD_VALUE";
      field: StateValuesKey;
      value: StateValuesValue;
    }
  | {
      type: "BLUR_FIELD";
      field: StateValuesKey;
    }
  | {
      type: "SUBMIT_FORM";
      submit: () => void;
    };

export function reducer(
  state: ChessTournamentFormState,
  action: ChessTournamentFormAction
): ChessTournamentFormState {
  switch (action.type) {
    // ...

    case "SUBMIT_FORM": {
      const newState = structuredClone(state);

      try {
        validationSchema.parse(state.values);

        // if the validation succeeds,
        // we clear potential previous errors
        newState.errors = {};
        // and then we submit the form
        action.submit();
      } catch (error) {
        if (error instanceof z.ZodError) {
          for (const issue of error.issues) {
            // else, we set the error message
            _.set(newState, ["errors", ...issue.path], issue.message);
          }
        }
      }

      return newState;
    }

    default: {
      return state;
    }
  }
}
```

> ℹ️ Notice here that **it's the reducer that has the reponsibility for calling the submission function after having validated the whole form**.

We can now write our **submit button's `onClick` handler**, along with potential **submission's success/error messages**:

```tsx
// ----- ChessTournamentForm.tsx -----

// ...

import { Message } from "../presentationals/Message";
import { useRegisterToChessTournamentMutation } from "./useRegisterToChessTournamentMutation";

function ChessTournamentForm() {
  // ...

  const {
    mutate: registerToChessTournament,
    isSuccess: isRegisterSuccess,
    error: registerError,
  } = useRegisterToChessTournamentMutation();

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();

      dispatch({
        type: "SUBMIT_FORM",
        submit: () => {
          // this could be done in a separate file's function
          const formattedFormForApi = {
            ...state.values,
            eloRating: Number(state.values.eloRating),
          };

          registerToChessTournament(formattedFormForApi);
        },
      });
    },
    [registerToChessTournament, state.values]
  );

  if (isRegisterSuccess) {
    return <Message type="success">You're registered!</Message>;
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* ... */}

      {registerError && <Message type="error">{registerError.message}</Message>}

      <button>Submit</button>
    </form>
  );
}
```

## Summary

Alright! We're done!

Here's a summary of what I think is to be remembered from this solution:

- **Form fields components have the same read/write API** (`name`, `value`, `error`, `onChange`, `onBlur`). This allows us to plug the same change/blur handlers on all fields, and will simplify our reducer's logic by a lot.
- **Form's state is not magically abstracted, but simply handled using React's `useReducer`**. Keeping it in simple `values`/`errors` objects in the reducer's state allows us to keep a **clear, declarative update logic** and to easily add specific business rules declaratively within the reducer when needed.
- **"Other-field-dependent" updates are made declaratively within the reducer**. Keeping specific update logic inside the reducer instead of inside the component's code maintains the readability of the code: **the component contains its markup and its event handlers; the reducer contains the business logic. Period.**
- **As values updates, form validation and errors assignment is also handled from within the reducer**. Each field is validated unitarily on blur, and the whole form is validated on submit.
- **Form submission is handled using a battle-tested solution like `tanstack-query`**. This allows us to handle the submission state and the errors in a simple and elegant way. Not showcased in this article, **but `SUCCESS_SUBMIT`/`ERROR_SUBMIT` actions could also be dispatched to the reducer** to handle the form's state after submission more specifically (ex: assigning API errors to fields, clearing fields values, etc...).

I acknowledge that this solution might look like a lot of code for forms that are not initially "complex", but **I believe it's always worth it as it prevents your code from becoming a mess as your project scales**.

I hope this article will make you want to implement this solution in your future React projects. If you have any question or suggestion, feel free to reach me on [Twitter](https://twitter.com/_damnhotuser).

**Dont' forget to check the full source code on [this CodeSandbox](https://codesandbox.io/s/effective-react-form-development-m19i7w)** !

Thanks for reading!
