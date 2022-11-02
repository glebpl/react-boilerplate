import { MutableRefObject, RefCallback } from 'react';

export type ReactRef<T = any> = RefCallback<T> | MutableRefObject<T | null> | null;

const setRef = <T>(ref: ReactRef<T>, value: T): void => {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
};

export default setRef;
