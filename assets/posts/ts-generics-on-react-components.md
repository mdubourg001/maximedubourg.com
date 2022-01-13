---
title: TypeScript generics on React function components
description: TIL that you can use TypeScript generics on React function components
date: 08/11/2021
---

# TypeScript generics on React function components

**TL;DR:** TIL that you can use TypeScript generics on React function components
and then use such components as `<Component<Type> foo="bar" />`.

## The context

So I was working on a React (TypeScript) project at work and for one of the features I was working on,
I happened to create **a component that displayed a list of selectable elements that it accepted as props,
along with a callback function that was called once the selected element was validated by the user.**

My component looked something like that (with, ofc, much simplification for clarity's sake):

```typescript
interface Item {
  label: string;
  value: string;
}

interface Props {
  items: Item[];
  onValidation: (item: Item) => void;
}

function List({ items, onValidation }: Props) {
  const [selected, setSelected] = useState<Item>(items[0]);

  return (
    <div>
      <ul>
        {items.map((item) => (
          <li key={item.value}>
            <button onClick={() => setSelected(item)}>{item.value}</button>
          </li>
        ))}
      </ul>

      <button onClick={() => onValidation(selected)}>Validate</button>
    </div>
  );
}
```

And I was using my component this way:

```typescript
// ...
const items: Item[] = [
  { label: "Choice A", value: "a" },
  { label: "Choice B", value: "b" },
  { label: "Choice C", value: "c" },
];

const handleListValidation = (item: Item) => {
  console.log(`Yay, ${item.label} chosen !`);
};

return <List items={items} onValidation={handleListValidation} />;
// ...
```

## The problem

As long as I worked on my feature, I had to use this `List` component several times around the codebase,
**giving it a slightly different kind of `items` every time**. My `List` were using the only two `Item`
fields it knew (`label` and `value`) so it did the trick,
**until I wanted to use some more of my `item` fields in the function I gave to `onValidation` prop.**

```typescript
// ...
interface ItemWithLink extends Item {
  redirectLink: string;
}

const items: ItemWithLink[] = [
  { label: "Choice A", value: "a", redirectLink: "..." },
  { label: "Choice B", value: "b", redirectLink: "..." },
  { label: "Choice C", value: "c", redirectLink: "..." },
];

const handleListValidation = (item: ItemWithLink) => {
  somehowRedirect(item.redirectLink);
};

return (
  <List
    // no problem here as `ItemWithLink` extends `Item`
    items={items}
    //❗ problem here, `handleListValidation` should accept an `Item`, not an `ItemWithLink`
    onValidation={handleListValidation}
  />
);
// ...
```

## The solution

TS generics to the rescue ! Why not after all ? That's probably how I would have done it with regular
functions, **and React component are functions !** So that's how I went and tried:

```typescript
// `List` now accepts items of types **extending** `Item`
interface Props<T extends Item> {
  items: T[];
  onValidation: (item: T) => void;
}

function List<T extends Item>({ items, onValidation }: Props<T>) {
  const [selected, setSelected] = useState<T>(items[0]);

  return (
    <div>
      <ul>
        {items.map((item) => (
          <li key={item.value}>
            <button onClick={() => setSelected(item)}>{item.value}</button>
          </li>
        ))}
      </ul>

      <button onClick={() => onValidation(selected)}>Validate</button>
    </div>
  );
}
```

With these changes, I could now use my `List` component with a given type using this (kinda weird) syntax:

```typescript
const items: ItemWithLink[] = [
  { label: "Choice A", value: "a", redirectLink: "..." },
  { label: "Choice B", value: "b", redirectLink: "..." },
  { label: "Choice C", value: "c", redirectLink: "..." },
];

const handleListValidation = (item: ItemWithLink) => {
  somehowRedirect(item.redirectLink);
};

return (
  <List<ItemWithLink>
    // still no problem here
    items={items}
    // no more TS errors here !
    // `List` now knows that it handles items of type `ItemWithLink`
    onValidation={handleListValidation}
  />
);
// ...
```
