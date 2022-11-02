/** @jsx jsx */
// noinspection ES6UnusedImports
import { CSSObject, jsx } from '@emotion/react';
import * as React from 'react';
import { memo, useCallback, useState } from 'react';
import { EmotionTheme } from '../theme';
import ButtonBase from './shared/button-base';
import { getCss } from './shared/css';
import getIsOnlySingleIcon from './shared/get-is-only-single-icon';
import { Appearance, BaseProps, Spacing } from './types';

function noop(): void {}

const isFirefox: boolean = typeof navigator !== 'undefined' && navigator.userAgent.toLowerCase().includes('firefox');

export type ButtonProps = BaseProps;

const Button = memo(
  // TODO: Fix this the next time the file is edited.
  // eslint-disable-next-line @typescript-eslint/naming-convention
  React.forwardRef(function Button(
    { style, onMouseDown: providedOnMouseDown = noop, onMouseUp: providedOnMouseUp = noop, ...rest }: ButtonProps,
    ref: React.Ref<HTMLElement>
  ) {
    const appearance: Appearance = rest.appearance || 'default';
    const spacing: Spacing = rest.spacing || 'default';
    const shouldFitContainer = Boolean(rest.shouldFitContainer);
    const isSelected = Boolean(rest.isSelected);
    const isOnlySingleIcon: boolean = getIsOnlySingleIcon(rest);
    const [isActive, setIsActive] = useState<boolean>(false);

    // Wrap onMouseDown / onMouseUp to manually trigger active state
    //  in Firefox
    const onMouseDown = useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        providedOnMouseDown(event);
        if (isFirefox) {
          setIsActive(true);
        }
      },
      [providedOnMouseDown, setIsActive]
    );

    const onMouseUp = useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        providedOnMouseUp(event);
        if (isFirefox) {
          setIsActive(false);
        }
      },
      [providedOnMouseUp, setIsActive]
    );

    const buttonCss = useCallback(
      (theme: EmotionTheme): CSSObject =>
        getCss(theme, {
          appearance,
          spacing,
          isSelected,
          shouldFitContainer,
          isOnlySingleIcon,
          isActive: rest.isActive,
          isHover: rest.isHover,
          style
        }),
      [appearance, spacing, isSelected, shouldFitContainer, style, isOnlySingleIcon, rest.isActive, rest.isHover]
    );

    return (
      <ButtonBase
        {...rest}
        ref={ref}
        buttonCss={buttonCss}
        // Due to how click events are set, we need to set active styles
        //  manually in Firefox and wrap onMouseDown/onMouseUp
        data-firefox-is-active={isActive ? true : undefined}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      />
    );
  })
);

// Tools including enzyme rely on components having a display name
Button.displayName = 'Button';

export default Button;
