import { RefObject, useEffect } from 'react';
import { tabbable } from 'tabbable';
import { FocusLockProps } from './types';

const focusIsInside = (containerRef: RefObject<HTMLElement>): boolean =>
  !!document.activeElement && !!containerRef.current && containerRef.current.contains(document.activeElement);

export const useAutoFocus = (
  containerRef: RefObject<HTMLElement>,
  autoFocus: FocusLockProps['autoFocus'],
  isEnabled: boolean
): void =>
  useEffect(() => {
    if (!containerRef.current || !isEnabled) {
      return;
    }

    if (autoFocus === true) {
      if (!focusIsInside(containerRef)) {
        // do not set focus if it's already inside focus lock container
        const allTabbable = tabbable(containerRef.current);
        if (allTabbable.length) {
          allTabbable[0].focus();
        } else {
          containerRef.current.focus();
        }
      }
    } else if (autoFocus === false) {
      if (!focusIsInside(containerRef)) {
        // focus container, first Tab will move focus to first tabbable element
        containerRef.current.focus();
      }
    } else if (autoFocus) {
      const el = 'function' === typeof autoFocus ? autoFocus() : autoFocus;
      el?.focus();
    }
  }, [autoFocus, containerRef, isEnabled]);
