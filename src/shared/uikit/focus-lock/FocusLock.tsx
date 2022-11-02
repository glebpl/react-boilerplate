import * as React from 'react';
import { forwardRef, useRef, PropsWithChildren, ForwardRefRenderFunction } from 'react';
import { useForkRef } from '../utils/hooks';
import { FocusLockProps } from './types';
import { useFocusLockKeydownHandler } from './useFocusLockKeydownHandler';
import { useAutoFocus } from './useAutoFocus';
import { useReturnFocus } from './useReturnFocus';

const FocusLockComponent: ForwardRefRenderFunction<HTMLDivElement, PropsWithChildren<FocusLockProps>> = (
  props,
  externalRef
) => {
  const { autoFocus, isEnabled = true, shouldReturnFocus = false, testId, ...divProps } = props;
  const localRef = useRef<HTMLDivElement>(null);
  const ref = useForkRef<HTMLDivElement>(externalRef, localRef);
  const handleKeyDown = useFocusLockKeydownHandler(localRef, isEnabled, divProps.onKeyDown);

  useAutoFocus(localRef, autoFocus, isEnabled);
  useReturnFocus(shouldReturnFocus);

  return (
    <div
      {...divProps}
      data-focus-lock={String(isEnabled)}
      data-testid={testId}
      ref={ref}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    />
  );
};

export const FocusLock = forwardRef<HTMLDivElement, PropsWithChildren<FocusLockProps>>(FocusLockComponent);
