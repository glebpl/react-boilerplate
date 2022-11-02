import { useEffect } from 'react';
import { CloseManagerHook } from './types';
import { createSyntheticEvent } from '../utils/events';

export const useCloseManager = ({
  isOpen,
  manageFocusReturn,
  onClose,
  popupRef,
  triggerRef
}: CloseManagerHook): void => {
  useEffect(() => {
    const closePopup = (event: KeyboardEvent | MouseEvent, returnFocusToRef = false) => {
      if (manageFocusReturn && returnFocusToRef) {
        // By default Popup uses FocusLock with shouldReturnFocus=false, in this case here we manage it
        // if component encapsulating Popup handles Esc, Tab, etc itself it have to stopPropagation
        triggerRef?.focus();
      }
      if (onClose) {
        onClose(createSyntheticEvent(event));
      }
    };

    const onClick = (event: MouseEvent) => {
      const target = event.target as Node;
      const doesDomNodeExist = document.body.contains(target);

      if (!doesDomNodeExist) {
        return;
      }

      const isClickOnPopup = popupRef && popupRef.contains(target);
      const isClickOnTrigger = triggerRef && triggerRef.contains(target);

      if (!isClickOnPopup && !isClickOnTrigger) {
        closePopup(event);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const { key } = event;
      if (key === 'Escape' || key === 'Esc') {
        closePopup(event, true);
      }
    };

    if (isOpen && popupRef) {
      // TODO now we can not prevent modal dialog closing if component using useCloseManager
      // is inside that dialog. To make it possible handlers should be persistent and check isOpen inside
      document.addEventListener('click', onClick);
      document.addEventListener('keydown', onKeyDown);
    }

    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose, popupRef, triggerRef]);
};
