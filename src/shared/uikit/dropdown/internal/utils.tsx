import * as React from 'react';
import { KeyboardEvent, RefObject, useCallback } from 'react';
import { tabbable } from 'tabbable';
import Button, { ButtonProps } from '../../button';
import { ChevronDownIcon } from '../../icon/glyph';
import { PopupTriggerRenderFn } from '../../popup';
import Tooltip from '../../tooltip';
import { useForkRef } from '../../utils/hooks';
import {
  CloseCallback,
  DrodownTriggerRenderFn,
  DropdownItemClickCallback,
  DropdownProps,
  DropdownTriggerProps
} from '../types';

export const getFallbackPlacements = (
  fallbackPlacements: DropdownProps['fallbackPlacements'],
  placement: DropdownProps['placement']
): DropdownProps['fallbackPlacements'] => {
  if (fallbackPlacements) {
    return fallbackPlacements;
  }
  switch (placement) {
    case 'bottom-start':
      return ['top-start', 'right', 'bottom-end', 'top-end', 'left'];
    case 'bottom-end':
      return ['top-end', 'left', 'bottom-start', 'top-start', 'right'];
    default:
      return undefined;
  }
};

const triggerIsFunction = (trigger: DropdownProps['trigger']): trigger is DrodownTriggerRenderFn =>
  'function' === typeof trigger;

const defaultTriggerIcon = <ChevronDownIcon size='small' label='' />;

export const createTriggerFunc = (
  dropdownProps: DropdownProps,
  dropdownTriggerProps: Omit<DropdownTriggerProps, 'ref'>,
  triggerRef: RefObject<HTMLElement>
): PopupTriggerRenderFn => {
  const { tooltip, trigger, triggerButtonProps = {}, testId } = dropdownProps;
  const { isSelected, isDisabled, onClick, onKeyDown } = dropdownTriggerProps;
  const triggerTestId = testId && `${testId}--trigger`;

  return ({ ref: popupTriggerRef, ...popupTriggerProps }) => {
    const ref = useForkRef(triggerRef, popupTriggerRef);
    if (triggerIsFunction(trigger)) {
      return trigger({
        ...popupTriggerProps,
        ref,
        isDisabled,
        isSelected,
        onClick,
        onKeyDown,
        testId: triggerTestId
      });
    } else {
      const buttonProps: ButtonProps = {
        ...popupTriggerProps,
        ref,
        iconAfter: defaultTriggerIcon,
        isDisabled,
        isSelected,
        testId: triggerTestId,
        ...triggerButtonProps,
        onClick,
        onKeyDown
      };

      const node = <Button {...buttonProps}>{trigger}</Button>;

      if (tooltip) {
        return (
          <Tooltip position='top' content={tooltip}>
            {node}
          </Tooltip>
        );
      }

      return node;
    }
  };
};

export const isEscapeEvent = (e: React.KeyboardEvent): boolean => e.key === 'Esc' || e.key === 'Escape';

export const useTriggerKeyDownHandler = (
  isOpen: boolean,
  open: (e: KeyboardEvent) => void,
  close: CloseCallback
): ((e: KeyboardEvent) => void) =>
  useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        !isOpen && open(e);
      } else if (e.key === 'Tab') {
        close(e);
      } else if (isEscapeEvent(e) && isOpen) {
        e.stopPropagation();
        close(e, true);
      }
    },
    [open, close, isOpen]
  );

export const useItemClickHandler = (close: CloseCallback): DropdownItemClickCallback =>
  useCallback(
    (e, shouldCloseDropdown): void => {
      if (shouldCloseDropdown) {
        close(e);
      }
    },
    [close]
  );

export const useItemKeyDownHandler = (
  contentRef: RefObject<HTMLDivElement>,
  close: CloseCallback
): ((e: KeyboardEvent<HTMLElement>) => void) =>
  useCallback(
    e => {
      const el = e.target;
      let focusMoveDirection: number | undefined;
      if (e.key === 'Tab') {
        close(e, true);
        return;
      }
      if (isEscapeEvent(e)) {
        e.preventDefault();
        e.stopPropagation();
        close(e, true);
        return;
      }
      if (e.key === 'ArrowDown') {
        focusMoveDirection = 1;
      } else if (e.key === 'ArrowUp') {
        focusMoveDirection = -1;
      }
      if (focusMoveDirection !== undefined && contentRef.current) {
        e.preventDefault();
        e.stopPropagation();
        const all = tabbable(contentRef.current);
        const index = Array.prototype.findIndex.call(all, n => n === el);
        const nextIndex = index + focusMoveDirection;
        if (nextIndex >= 0 && nextIndex < all.length) {
          all[nextIndex].focus();
        } else if (nextIndex < 0) {
          close(e, true);
        }
      }
    },
    [contentRef, close]
  );

export const useContentKeyDownHandler = (close: CloseCallback): ((e: KeyboardEvent) => void) =>
  useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        close(e, true);
      } else if (isEscapeEvent(e)) {
        e.stopPropagation();
        close(e, true);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        close(e, true);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        const allTabbable = tabbable(e.target as HTMLDivElement);
        if (allTabbable.length) {
          allTabbable[0].focus();
        }
      }
    },
    [close]
  );
