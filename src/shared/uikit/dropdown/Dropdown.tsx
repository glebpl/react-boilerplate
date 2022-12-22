import * as React from 'react';
import { useCallback, useMemo, useRef } from 'react';
import Popup from '../popup';
import DropdownEventContext, { useEventContext } from './DropdownEventContext';
import { getFallbackPlacements, createTriggerFunc, useTriggerKeyDownHandler } from './internal/utils';
import { Content } from './styled';
import { DropdownProps } from './types';
import { useForkRef, useOpenClose } from '../utils/hooks';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

const Dropdown: React.FC<DropdownProps> = props => {
  const {
    children,
    closeOnTriggerEscape = true,
    contentProps = {},
    fallbackPlacements: propFallbackPlacements,
    isDisabled = false,
    afterOpen,
    placement = 'bottom-start',
    popupRef: externalPopupRef = noop,
    testId,
    zIndex = 999 // layers.dropdown()
  } = props;
  const triggerRef = useRef<HTMLElement>(null);
  const localPopupRef = useRef<HTMLDivElement>(null);
  const popupRef = useForkRef(externalPopupRef, localPopupRef);

  const {
    open,
    close: innerClose,
    isOpen
  } = useOpenClose({
    onOpen: props.onOpen,
    onClose: props.onClose,
    isOpen: props.isOpen,
    defaultIsOpen: props.defaultIsOpen
  });

  const close = useCallback(
    (event?: React.SyntheticEvent | React.MouseEvent | React.KeyboardEvent, returnFocusToRef?: boolean) => {
      if (isOpen) {
        requestAnimationFrame(() => {
          if (returnFocusToRef) {
            triggerRef.current?.focus();
          }
        });
      }

      innerClose(event);
    },
    [isOpen, innerClose]
  );

  const onClosePopup = useCallback(
    (e?: React.SyntheticEvent) => {
      // do not return focus to trigger if some another element already focused
      close(e, !!e && document.activeElement === document.body);
    },
    [close]
  );
  const switcher = useCallback(
    (event?: React.MouseEvent | React.KeyboardEvent) => {
      if (isOpen) {
        close(event);
      } else {
        open(event);
      }
    },
    [open, close, isOpen]
  );

  const fallbackPlacements = useMemo(
    () => getFallbackPlacements(propFallbackPlacements, placement),
    [propFallbackPlacements, placement]
  );

  const handleTriggerKeyDown = useTriggerKeyDownHandler(isOpen, open, close);

  const trigger = createTriggerFunc(
    props,
    {
      isDisabled,
      isSelected: isOpen,
      onClick: switcher,
      onKeyDown: handleTriggerKeyDown
    },
    triggerRef
  );

  const eventContext = useEventContext(localPopupRef, close);

  const popupComponentProps = useMemo(
    () => ({ onKeyDown: eventContext.onContentKeyDown }),
    [eventContext.onContentKeyDown]
  );

  return (
    <DropdownEventContext.Provider value={eventContext}>
      <Popup
        autoFocus={false}
        fallbackPlacements={fallbackPlacements}
        isOpen={isOpen}
        componentProps={popupComponentProps}
        content={() => (
          <Content {...contentProps} data-testid={testId && `${testId}--content`} ref={props.contentRef}>
            {children}
          </Content>
        )}
        onClose={onClosePopup}
        afterOpen={afterOpen}
        onPopupEscaped={!closeOnTriggerEscape ? close : undefined}
        onReferenceEscaped={closeOnTriggerEscape ? close : undefined}
        placement={placement}
        popupRef={popupRef}
        trigger={trigger}
        testId={testId && `${testId}--popup`}
        zIndex={zIndex}
      />
    </DropdownEventContext.Provider>
  );
};

export default Dropdown;
