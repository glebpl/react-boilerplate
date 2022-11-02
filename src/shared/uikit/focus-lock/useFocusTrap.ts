import { RefObject, useEffect } from 'react';

export const useFocusTrap = (focusLockRef: RefObject<HTMLElement>): void => {
  useEffect(() => {
    const trapFocus = (e: FocusEvent) => {
      if (!focusLockRef.current?.contains(e.target as Node)) {
        focusLockRef.current?.focus();
      }
    };
    document.addEventListener('focusin', trapFocus);
    return () => document.removeEventListener('focusin', trapFocus);
  }, [focusLockRef]);
};
