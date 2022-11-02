import { useMemo } from 'react';
import setRef, { ReactRef } from '../setRef';

/**
 * This will create a new function if the ref props change and are defined.
 * This means react will call the old forkRef with `null` and the new forkRef
 * with the ref. Cleanup naturally emerges from this behavior
 */
export const useForkRef = <T = any>(refA: ReactRef<T>, refB: ReactRef<T>): ((value: T) => void) | null =>
  useMemo(() => {
    if (refA == null && refB == null) {
      return null;
    }
    return (value: T) => {
      setRef<T>(refA, value);
      setRef<T>(refB, value);
    };
  }, [refA, refB]);
