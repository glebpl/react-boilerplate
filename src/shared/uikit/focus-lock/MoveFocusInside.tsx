import * as React from 'react';
import { forwardRef, ForwardRefRenderFunction, PropsWithChildren, useRef } from 'react';
import { useAutoFocus } from './useAutoFocus';
import { MoveFocusInsideProps } from './types';
import { useForkRef } from '../utils/hooks';

const MoveFocusInsideComponent: ForwardRefRenderFunction<HTMLDivElement, PropsWithChildren<MoveFocusInsideProps>> = (
  props,
  externalRef
) => {
  const { isEnabled = true, ...divProps } = props;
  const localRef = useRef<HTMLDivElement>(null);
  const ref = useForkRef<HTMLDivElement>(externalRef, localRef);
  useAutoFocus(localRef, true, isEnabled);
  return <div {...divProps} data-autofocus-inside={String(isEnabled)} ref={ref} tabIndex={-1} />;
};

export const MoveFocusInside = forwardRef<HTMLDivElement, PropsWithChildren<MoveFocusInsideProps>>(
  MoveFocusInsideComponent
);
