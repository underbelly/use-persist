import { useEffect } from 'react';
import { debounce } from 'debounce';

export interface UsePersistConfig {
  name: string;
  onMount: (data: any) => void;
  debounceTime?: number;
  useSessionStorage?: boolean;
  skip?: boolean;
}

export const usePersist = (
  data: any,
  {
    name,
    onMount,
    useSessionStorage,
    debounceTime = 300,
    skip,
  }: UsePersistConfig
): void => {
  const persist = debounce((data: any) => {
    const storage = useSessionStorage
      ? window.sessionStorage
      : window.localStorage;
    storage.setItem(name, JSON.stringify(data));
  }, debounceTime);
  useEffect(
    () => {
      if (!skip) {
        persist(data);
      }
    },
    [data, persist]
  );
  useEffect(
    () => {
      if (!skip) {
        const storage = useSessionStorage
          ? window.sessionStorage
          : window.localStorage;
        const data = storage.getItem(name);
        if (data) {
          onMount(JSON.parse(data));
        }
      }
    },
    [useSessionStorage, onMount, name, skip]
  );
};

export default usePersist;
