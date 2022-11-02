/** @jsx jsx */
// noinspection ES6UnusedImports
import { jsx, SerializedStyles } from '@emotion/react';
import * as React from 'react';
import { FC, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Modifier } from 'react-popper';
import { FocusLock } from '../focus-lock';
import { FlipModifierOptions, Manager, Popper, Reference } from '../popper';
import Portal from '../portal';
import { EmotionTheme, layers } from '../theme';
import setRef from '../utils/setRef';
import { RepositionOnUpdate } from './RepositionOnUpdate';
import { PopupProps } from './types';
import { useCloseManager } from './useCloseManager';
import { createPopupCss } from './styles';

export const Popup: FC<PopupProps> = memo(
  ({
    appearance = 'default',
    componentProps = {},
    content,
    isOpen,
    id,
    offset,
    testId,
    trigger,
    onClose,
    onOpen,
    afterOpen,
    boundary,
    rootBoundary = 'viewport',
    placement = 'auto',
    shouldFlip = true,
    fallbackPlacements,
    zIndex = layers.layer(),
    onPopupEscaped,
    onReferenceEscaped,
    lockFocus = true,
    referenceElement,
    shouldReturnFocusToTrigger = false,
    ...rest
  }: PopupProps) => {
    // pass undefined explicitly to override default 'true' value
    const autoFocus = 'autoFocus' in rest ? rest.autoFocus : true;
    const [popupRef, setPopupRef] = useState<HTMLDivElement | null>(null);
    const [triggerRef, setTriggerRef] = useState<HTMLElement | null>(null);
    const [initialFocusRef, setInitialFocusRef] = useState<HTMLElement | null>(null);
    const modifiers = useMemo(() => {
      const options: Partial<FlipModifierOptions> = {
        rootBoundary,
        boundary
      };
      if (fallbackPlacements) {
        options.fallbackPlacements = fallbackPlacements;
      }
      const cm: Modifier<'flip' | 'afterMain' | 'afterWrite'>[] = [
        {
          name: 'flip',
          enabled: shouldFlip,
          options
        }
      ];
      if (onPopupEscaped || onReferenceEscaped) {
        const afterMainModifier: Modifier<'afterMain'> = {
          name: 'afterMain',
          phase: 'afterMain',
          enabled: true,
          requires: ['hide'],
          fn: ({ state }): void => {
            const { hide: hideModifierData } = state.modifiersData;
            if (hideModifierData) {
              hideModifierData.isReferenceHidden && onReferenceEscaped?.();
              hideModifierData.hasPopperEscaped && onPopupEscaped?.();
            }
          }
        };

        cm.push(afterMainModifier);
      }
      if (afterOpen) {
        const afterWriteModifier: Modifier<'afterWrite'> = {
          name: 'afterWrite',
          phase: 'afterWrite',
          enabled: true,
          requires: [],
          fn: (): void => {
            afterOpen?.();
          }
        };
        cm.push(afterWriteModifier);
      }
      return cm;
    }, [fallbackPlacements, shouldFlip, rootBoundary, boundary, onPopupEscaped, onReferenceEscaped, afterOpen]);

    useCloseManager({ isOpen, manageFocusReturn: !shouldReturnFocusToTrigger, onClose, popupRef, triggerRef });

    useEffect(() => {
      isOpen && onOpen && onOpen();
    }, [isOpen, onOpen]);

    const popupCss = useCallback(
      (theme: EmotionTheme): SerializedStyles => createPopupCss(theme, appearance),
      [appearance]
    );

    return (
      <Manager>
        {referenceElement ? null : trigger ? (
          <Reference>
            {({ ref }) =>
              trigger({
                ref: (node: HTMLElement | null) => {
                  if (node) {
                    if (typeof ref === 'function') {
                      ref(node);
                    } else {
                      (ref as React.MutableRefObject<HTMLElement>).current = node;
                    }

                    setTriggerRef(node);
                  }
                },
                'aria-expanded': isOpen,
                'aria-haspopup': true
              })
            }
          </Reference>
        ) : null}
        {isOpen && (
          <Portal zIndex={zIndex}>
            <Popper placement={placement} offset={offset} modifiers={modifiers} referenceElement={referenceElement}>
              {({ ref, style: popperCSSProps, placement: popupPlacement, update, isReferenceHidden }) => (
                <FocusLock
                  {...componentProps}
                  css={popupCss}
                  autoFocus={initialFocusRef || autoFocus}
                  isEnabled={lockFocus}
                  shouldReturnFocus={shouldReturnFocusToTrigger}
                  data-placement={popupPlacement}
                  id={id}
                  ref={(node: HTMLDivElement) => {
                    setRef(ref, node);
                    setPopupRef(node);
                    if (rest.popupRef) {
                      setRef(rest.popupRef, node);
                    }
                  }}
                  style={popperCSSProps}
                  testId={testId}
                >
                  <RepositionOnUpdate content={content} update={update}>
                    {content({
                      update,
                      isOpen,
                      onClose,
                      setInitialFocusRef,
                      isReferenceHidden
                    })}
                  </RepositionOnUpdate>
                </FocusLock>
              )}
            </Popper>
          </Portal>
        )}
      </Manager>
    );
  }
);

export default Popup;
