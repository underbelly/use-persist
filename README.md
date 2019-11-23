# Use Persist

A react hook for easily storing app data to local or session storage.

### Installation

`npm i[nstall] use-persist`

### Usage

`useHooks` requires requires two arguments, the data you want to persist and a configuration object.

#### Arguments

- data (required `any`) - The data to be stored.
- config (required `UsePersistConfig`)
  - `name` (required `string`) - The name that will be used as a key in local/session storage
  - `onMount` (required `(data: any) => void`) - A function that will be called when the component mounts. This is where you can rehydrate your component's state
  - `debounceTime` (optional `number` defaults to `300`) - The length of time (in milliseconds) a persist is [debounced](https://levelup.gitconnected.com/debounce-in-javascript-improve-your-applications-performance-5b01855e086) before actually saving the data.
  - `useSessionStorage` (optional `boolean` default to `false`) - Set to true to use `sessionStorage` instead of `localStorage`
  - `skip` (optional `boolean` defaults to `false`) - Set to `true` to skip both the saving and hydration of data.

#### Examples

A simple example with only the required arguments

```javascript
const SimplePersist = () => {
  const [myData, setMyData] = useState({});

  usePersist(myData, {
    name: 'myData',
    onMount: setMyData,
  });
};
```

A more complicated example implementing the optional arguments

```javascript
const SimplePersist = () => {
  const [myData, setMyData] = useState({});
  const [disabled, setDisabled] = useState(false);

  usePersist(myData, {
    name: 'myData',
    onMount: setMyData,
    useSessionStorage: true,
    skip: disabled,
    debounceTime: 500,
  });
};
```
