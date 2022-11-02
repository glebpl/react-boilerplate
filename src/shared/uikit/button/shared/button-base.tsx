/** @jsx jsx */
// noinspection ES6UnusedImports
import { css, CSSObject, jsx } from '@emotion/react';
import styled from '@emotion/styled';
import * as React from 'react';
import { useCallback, useEffect, useRef } from 'react';
import { EmotionTheme } from '../../theme';
import { BaseProps } from '../types';
import blockEvents from './block-events';
import { getContentStyle, getFadingCss, getIconStyle, overlayCss, getIconAfterStyle, safariTooltipFix } from './css';
import useAutoFocus from './use-auto-focus';

const noop = (): void => {};

type Props = BaseProps & {
  buttonCss: (theme: EmotionTheme) => CSSObject;
};

// TODO: Fix this the next time the file is edited.
// eslint-disable-next-line @typescript-eslint/naming-convention
export default React.forwardRef<HTMLElement, Props>(function ButtonBase(props: Props, ref: React.Ref<HTMLElement>) {
  const {
    appearance = 'default',
    buttonCss,
    spacing = 'default',
    autoFocus = false,
    isDisabled = false,
    shouldFitContainer = false,
    isSelected = false,
    iconBefore,
    isActive,
    isHover,
    iconAfter,
    children,
    className,
    href,
    overlay,
    tabIndex = 0,
    type = !href ? 'button' : undefined,
    onClick = noop,
    // use the provided component prop,
    // else default to anchor if there is a href, and button if there is no href
    component: Component = href ? 'a' : 'button',
    testId,
    // I don't think this should be in button, but for now it is
    analyticsContext,
    ...rest
  } = props;

  const ourRef = useRef<HTMLElement | null>();

  const setRef = useCallback(
    (node: HTMLElement | null) => {
      ourRef.current = node;

      if (ref == null) {
        return;
      }

      if (typeof ref === 'function') {
        ref(node);
        return;
      }

      // @ts-expect-error TS2540: Cannot assign to 'current' because it is a read-only property.
      ref.current = node;
    },
    [ourRef, ref]
  );

  // Cross browser auto focusing is pretty broken, so we are doing it ourselves
  useAutoFocus(ourRef, autoFocus);

  // Lose focus when becoming disabled (standard button behaviour)
  useEffect(() => {
    const el = ourRef.current;
    if (isDisabled && el && el === document.activeElement) {
      el.blur();
    }
  }, [isDisabled]);

  // we are 'disabling' input with a button when there is an overlay
  const hasOverlay = Boolean(overlay);
  const fadeCss: CSSObject = getFadingCss({ hasOverlay });

  const isInteractive: boolean = !isDisabled && !hasOverlay;

  return (
    <Component
      {...rest}
      css={buttonCss}
      className={className}
      ref={setRef}
      onClick={onClick}
      disabled={isDisabled}
      href={isInteractive ? href : undefined}
      // using undefined so that the property doesn't exist when false
      data-has-overlay={hasOverlay ? true : undefined}
      data-testid={testId}
      type={type}
      // Adding a tab index so element is always focusable, even when not a <button> or <a>
      // Disabling focus via keyboard navigation when disabled
      // as this is standard button behaviour
      tabIndex={isDisabled ? -1 : tabIndex}
      {...blockEvents({ isInteractive })}
    >
      {iconBefore ? <ButtonBefore css={css(fadeCss, getIconStyle())}>{iconBefore}</ButtonBefore> : null}
      {children ? (
        <ButtonText
          css={css(
            fadeCss,
            getContentStyle(iconBefore && iconAfter ? 'both' : iconBefore ? 'left' : iconAfter ? 'right' : 'none')
          )}
        >
          {children}
        </ButtonText>
      ) : null}
      {iconAfter ? <ButtonAfter css={css(fadeCss, getIconAfterStyle())}>{iconAfter}</ButtonAfter> : null}
      {overlay ? <ButtonOverlay>{overlay}</ButtonOverlay> : null}
    </Component>
  );
});

export const ButtonBefore = styled.span``;
export const ButtonText = styled.span`
  ${safariTooltipFix}
`;
export const ButtonAfter = styled.span``;
export const ButtonOverlay = styled.span`
  ${overlayCss}
`;
