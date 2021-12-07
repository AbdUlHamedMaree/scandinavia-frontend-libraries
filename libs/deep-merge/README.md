# @scandinavia/deep-merge

deeply merge list of objects.

## Usage

lets say you have two optional properties (variant, onClick), when he passed `variant` you want to override the default variant, and when he pass `onClick` event handler you want to fire it side by side with your event.

```tsx
import { deepMerge } from '@scandinavia/deep-merge';

type MyFancyButtonProps = {
  variant?: 'filled' | 'outlined';
  onClick?: () => void;
};

/* Old Way 🤕
 * you have to keep in mind the various properties
 * and how they should react if the same property came from
 * the end-developer.
 */
const MyFancyButton: React.FC<MyFancyButtonProps> = props => {
  return (
    <button
      variant='filled'
      {...props}
      onClick={() => {
        console.log('`MyFancyButton` Clicked!');
        props?.onClick?.();
      }}
    />
  );
};

/* With `deep-merge` 😍
 * it's just merging two objects and return the result
 * no matter how the end-developer provide it.
 */

const MyFancyButton: React.FC<MyFancyButtonProps> = props => {
  return (
    <button
      {...deepMerge(
        {
          variant: 'filled',
          onClick: () => console.log('`MyFancyButton` Clicked!'),
        },
        props
      )}
    />
  );
};
```

if you don't want to merge the functions (just override the function) you can import `createDeepMerge` and pass options to it.

```ts
import { createDeepMerge } from '@scandinavia/deep-merge';
const myDeepMerge = createDeepMerge({ overrideFunctions: true });

// use `myDeepMerge` in your code.
```

## **_Powerful Typing_**

```ts
const result = deepMerge({ a: 'str' }, { a: 1, b: 'str' });
//      '------> type of { a:string | number, b?:string | undefined }
```
