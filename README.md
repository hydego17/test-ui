# Test UI

Custom UI Library built with React, Storybook and TailwindCSS

[Storybook Preview](https://main--65ca6b83f6fd47bf53cbe1f4.chromatic.com)

## Installation

1. Setup your React project with TaillwindCSS configured. Please refer to [Tailwind CSS installation guide](https://tailwindcss.com/docs/installation/framework-guides).\*

2. Create `.nprmc` file in your project root directory, then add this line:
```
@hydego17:registry=https://npm.pkg.github.com
```

3. Install this package to your projectt

```sh
pnpm install @hydego17/test-ui
```

4. Add the following line to your `tailwind.config.js` content's array:

```
content: [
    ...

    './node_modules/@hydego17/test-ui/dist/**/*',
  ],
```

5. Import your desired component

```tsx
import { useState } from "react";
import { Select } from "@hydego17/test-ui";

const App = () => {
  const [values, setValues] = useState([]);

  const handleChange = (options) => {
    // perform action here
    setValues(options);
  };

  return (
    <Select
      multiple
      withSearch
      onChange={handleChange}
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
};

export default App;
```
