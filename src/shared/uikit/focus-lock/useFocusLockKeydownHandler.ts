import { RefObject, useCallback } from 'react';
import * as React from 'react';
import { tabbable } from 'tabbable';

const KEYCODE_TAB = 9;

export const useFocusLockKeydownHandler = (
  ref: RefObject<HTMLElement>,
  isEnabled: boolean,
  nextKeyDownHandler?: (e: React.KeyboardEvent) => void
): ((e: React.KeyboardEvent) => void) =>
  useCallback(
    (e: React.KeyboardEvent) => {
      const el = e.currentTarget;
      const isTabPressed = e.key === 'Tab' || e.keyCode === KEYCODE_TAB;

      // React events bubble through portals so we have to check if initial event target inside FocusLock element
      if (isEnabled && isTabPressed && ref?.current?.contains(e.target as Node)) {
        const allTabbable = tabbable(el);
        const firstTabbable = allTabbable[0];
        const lastTabbable = allTabbable[allTabbable.length - 1];

        const forceReturnFocus = (elToReturn: Element | null) =>
          requestAnimationFrame(() => {
            if (ref?.current && elToReturn instanceof HTMLElement) {
              if (document.activeElement && !ref.current.contains(document.activeElement)) {
                elToReturn.focus();
              }
            }
          });

        if (e.shiftKey) {
          if (document.activeElement === firstTabbable) {
            // Prevent switching focus by browser.
            e.preventDefault();
            lastTabbable.focus();
          } else {
            forceReturnFocus(document.activeElement);
          }
        } else if (document.activeElement === lastTabbable) {
          e.preventDefault();
          firstTabbable.focus();
        } else {
          forceReturnFocus(document.activeElement);
        }
      }

      nextKeyDownHandler && nextKeyDownHandler(e);
    },
    [isEnabled, nextKeyDownHandler, ref]
  );
