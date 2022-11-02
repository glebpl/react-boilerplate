import { useEffect, useRef } from 'react';
import { FocusLockProps } from './types';

const isFocusableElement = (el: any): el is HTMLOrSVGElement => !!el && 'tabIndex' in el && 'focus' in el;

export const useReturnFocus = (returnFocus: FocusLockProps['shouldReturnFocus']): void => {
  const shouldReturnRef = useRef(returnFocus);
  shouldReturnRef.current = returnFocus;
  const elementRef = useRef<HTMLOrSVGElement | null>(null);
  if (returnFocus && !elementRef.current) {
    elementRef.current = isFocusableElement(document.activeElement) ? document.activeElement : null;
  }
  useEffect(
    () => () => {
      if (elementRef.current && shouldReturnRef.current) {
        elementRef.current.focus();
      }
    },
    []
  );
};
