# Test UI

Custom UI Library built with React, StoryBook, and TailwindCSS

## Installation

1. Setup your react project with TaillwindCSS configured. Please refer to [Tailwind CSS installation guide](https://tailwindcss.com/docs/installation/framework-guides).\*

2. Install this package (you can also use `npm` or `yarn`)

```sh
pnpm install @hydego17/test-ui
```

2. Configure your `tailwind.config.js` to add the following line:

```
content: [
    ...

    './node_modules/@hydego17/test-ui/dist/**/*',
  ],
```

3. Import your desired component

```tsx
import { Select } from "@hydego17/test-ui";

function App() {
  return (
    <Select
      id="my-select-1"
      multiple
      withSearch
      options={[
        {
          value: "1",
          label: "options 1",
        },
        {
          value: "2",
          label: "options 2",
        },
        {
          value: "3",
          label: "options 3",
        },
      ]}
    />
  );
}

export default App;
```
