---
title: The future proof way to useReducer
description: In this article, I try to give some advices about how to use useReducer in a maintainable and future proof way
date: 05/05/2022
---

# The future proof way to useReducer

When managing internal React components state, we often use the [`useState`](https://reactjs.org/docs/hooks-reference.html#usestate) hook, and its most of the time sufficent.
But in the lifetime of a project, components eventually get bigger, and have to handle more and more state.
In these cases, [`useReducer`](https://reactjs.org/docs/hooks-reference.html#usereducer) tends to become really handy **to keep components maintainable**.

A good rule of thumb to know when to use one hook or the other is [the one given by Kent C. Dodds](https://kentcdodds.com/blog/should-i-usestate-or-usereducer):

- When it's just an independent element of state you're managing: **`useState`**
- When one element of your state relies on the value of another element of your state in order to update: **`useReducer`**

A lot of good articles already explain `useReducer`, and even do components implementations comparisons between `useState` and `useReducer` so I'm not going to do this here.
Instead, I'll try to give some advices about how to **use `useReducer` in a maintainable and future proof way**.

## Split reducer-related code in a separate file

This first point might seem obvious but is still important: **your reducer does not have to live in the same file as your component**.
One of the main pain point of reducers is that they often quickly end up taking a fair amount of lines of code.
When adding up state type, actions types and initialisation function, it ends up adding a lot of noise to your component's file.

My advice here is: **split all the reducer-related code in a `reducer.ts` file right next to your component**.

**`PaymentForm.tsx`**:

```typescript
import { reducer, getInitialState } from "./reducer";

function PaymentForm() {
  const [state, dispatch] = useReducer(reducer, undefined, getInitialState);

  // ...
}
```

**`reducer.ts`**:

```typescript
interface PaymentFormState {
  // ...
}

type PaymentFormAction =
  | { type: "..." }
  | { type: "..." }
  | { type: "..." }
  | { type: "..." };

export function getInitialState() {
  return {
    // ...
  };
}

export function reducer(
  state: PaymentFormState,
  action: PaymentFormAction
): PaymentFormState {
  // ...
}
```

## Give explicit names to actions types

One of the main things that make reducers states mutations reliable and easy to read is the concept of **actions**. While we might be tempted to name actions types by what mutation they imply on the state (ex: `INCREMENT`, `SET_SUPERHEROES`, `VALIDATE_FORM`, ...), **doing so usually leads to incoherent naming and makes the reducer hard to read** when further adding business rules to the component.

For example, if a new business rule for a SuperheroPicker component is "receiving an empty result set from `www.searchsuperhero.com` makes other form fields disabled", the `SET_SUPERHEROES` action type won't make as much sense as before.

My advice here is: **name actions types by what they are triggered by (ex: `CLICK_INCREMENT_BTN`, `RECEIVE_SUPERHEROES_DATA`, `CLICK_SUBMIT_BTN`, ...)**.

❌ **`reducer.ts`**:

```typescript
// ...

switch (action.type) {
  // the `SET_SUPERHEROES` naming might imply that this is the only state mutation done here...
  case "SET_SUPERHEROES":
    return {
      ...state,
      superheroes: action.superheroesData,
      // ...while this is not
      isPowersPickerDisabled: action.superheroesData.length === 0,
    };

  // ...
}
```

✅ **`reducer.ts`**:

```typescript
// ...

switch (action.type) {
  case "RECEIVE_SUPERHEROES_DATA":
    return {
      ...state,
      superheroes: action.superheroesData,
      isPowersPickerDisabled: action.superheroesData.length === 0,
    };

  // ...
}
```

In addition to keeping actions naming coherent, **this allows to understand the component's business rules just by reading the reducer**, and thus makes it easier to maintain.

## Type actions strongly

This one hides another point: **`useReducer` is the most powerful when used with TypeScript**.
When typed the good way, dispatching actions and doing state mutations with `useReducer` can become super easy and **predictible**, but when not done strongly enough, this often leads to frustration.

For example, it's not rare seing this kind of action typing:

❌ **`reducer.ts`**:

```typescript
// TS enums can be handy, but are not really type-safe :/
// see this great article: https://fettblog.eu/tidy-typescript-avoid-enums/
export enum CounterActionKind {
  INCREMENT = "INCREMENT",
  DECREMENT = "DECREMENT",
}

interface CounterAction {
  // you'll have to type `dispatch({ type: CounterActionKind.INCREMENT })` everytime :/
  type: CounterActionKind;
  // the "payload" naming isn't explicit about what it contains :/
  payload: number;
}

// ----------
// OR EVEN WORSE
// ----------

export enum TodoListActionKind {
  CLICK_ADD_TODO = "CLICK_ADD_TODO",
  CLICK_TOGGLE_TODO_STATUS = "CLICK_TOGGLE_TODO_STATUS",
}

interface TodoListAction {
  type: TodoListActionKind;
  // no typing, no IDE autocompletion, no compilation errors :/
  payload: any;
}
```

My advice here is: **Do not use enums when typing actions, explicitly type each action one by one**.

✅ **`reducer.ts`**:

```typescript
import { Todo, TodoStatus } from "./types";

type ClientFileAction =
  | { type: "CLICK_ADD_TODO"; todo: Todo }
  | { type: "CLICK_TOGGLE_TODO_STATUS"; id: Todo["id"]; status: TodoStatus }
  | { type: "CLICK_DELETE_TODO"; id: Todo["id"] };
```

This as several advantages:

- **There's no need to use an `enum`, only a `type`**: so when the code gets built, this completely disappear from the JS bundle
- **The actions list is explicit**: just by reading the type, one knows how much actions there are, and what "payload data" each one carries
- **The IDE autocompletion is great**: TypeScript is smart, so when we start typing `dispatch({ type: "|" })`, the IDE will automatically list all the action types for us, and same goes for action's payload data, without even needing to import anything
- **Type safety is ensured**: Once again, TypeScript is smart. If we misstype `dispatch({ type: "CLACK_ADD_TADA" })`, TS will know that no subtype of `ClientFileAction` type is named like this, and so the project won't build

## To conclude

`useReducer` is a great tool that React provides, but reducers might end up being hard to maintain when not implemented carefully enough. Using **strong typings**, **splitting the code** well and **being as explicit as possible** in reducer-related code are nice ways to prevent it.

I hope these few tips will help you, I might edit the post to add a few more later. Thanks for reading.
