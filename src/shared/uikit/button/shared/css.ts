/** @jsx jsx */
// noinspection ES6UnusedImports
import { CSSObject, jsx, css } from '@emotion/react';
import {
  EmotionTheme,
  EmotionThemeProps,
  borderRadius as getBorderRadius,
  gridSize as getGridSize,
  platformStyles
} from '../../theme';
import { Appearance, Spacing } from '../types';
import colors, { ColorGroup } from './colors';
import { CSSProperties } from 'react';

const borderRadius: number = getBorderRadius();
const gridSize: number = getGridSize();

const heights: { [key in Spacing]: (props: EmotionThemeProps) => string } = {
  default: platformStyles.button.regularHeight,
  compact: platformStyles.button.compactHeight
};
const lineHeights: { [key in Spacing]: (props: EmotionThemeProps) => string } = {
  default: heights.default,
  compact: heights.compact
};
const paddingX = gridSize * 1.5;
const padding: { [key in Spacing]: string } = {
  // 12px gutter
  default: `0 ${paddingX}px`,
  compact: `0 ${paddingX}px`
};
const singleIconWidth: { [key in Spacing]: (props: EmotionThemeProps) => string } = {
  compact: heights.compact,
  default: heights.default
};

const verticalAlign: { [key in Spacing]: string } = {
  default: 'middle',
  compact: 'middle'
};

const getColor = (theme: EmotionTheme, { group, key }: { group: ColorGroup; key: keyof ColorGroup }): string =>
  (group[key] || group.default)({ theme });

// ${getColor(theme, {group: colors.color[appearance], key})} !important

const getColors = (
  theme: EmotionTheme,
  { appearance, key }: { appearance: Appearance; key: keyof ColorGroup }
): CSSObject => ({
  background: getColor(theme, {
    group: colors.background[appearance],
    key
  }),
  color: `${getColor(theme, { group: colors.color[appearance], key })} !important`
});

const hoverStyles = (theme: EmotionTheme, appearance: Appearance, isSelected: boolean) => ({
  ...getColors(theme, {
    appearance,
    key: isSelected ? 'selected' : 'hover'
  }),
  textDecoration: !isSelected && appearance === 'link' ? 'underline' : 'inherit',
  // background, box-shadow
  transitionDuration: '0s, 0.15s'
});

const activeStyles = (theme: EmotionTheme, appearance: Appearance, isSelected: boolean) => ({
  ...getColors(theme, {
    appearance,
    key: isSelected ? 'selected' : 'active'
  }),
  // background, box-shadow
  transitionDuration: '0s, 0s'
});

export type GetCssOptions = {
  appearance: Appearance;
  spacing: Spacing;
  isSelected: boolean;
  isHover?: boolean;
  isActive?: boolean;
  shouldFitContainer: boolean;
  isOnlySingleIcon: boolean;
  style?: CSSProperties | CSSObject;
};

export const getCss = (theme: EmotionTheme, options: GetCssOptions): CSSObject => {
  const { appearance, spacing, isSelected, isHover, isActive, shouldFitContainer, isOnlySingleIcon, style } = options;

  const isLink = appearance === 'link';

  const baseColors = getColors(theme, {
    appearance,
    key: isSelected ? 'selected' : 'default'
  });

  const themeProps: EmotionThemeProps = { theme };

  return {
    alignItems: 'baseline',
    borderWidth: 0,
    borderRadius,
    boxSizing: 'border-box',
    display: 'inline-flex',
    fontSize: 'inherit',
    fontStyle: 'normal',
    // Chrome recently changed button so that they use 'arial' as the font family
    fontFamily: 'inherit',
    fontWeight: 500,
    maxWidth: '100%',
    // Needed to position overlay
    position: 'relative',
    textAlign: 'center',
    textDecoration: 'none',
    transition: 'background 0.1s ease-out, box-shadow 0.15s cubic-bezier(0.47, 0.03, 0.49, 1.38)',
    whiteSpace: 'nowrap',

    // dynamic styles
    ...baseColors,

    cursor: 'pointer',
    height: heights[spacing](themeProps),
    lineHeight: lineHeights[spacing](themeProps),
    padding: isLink || isOnlySingleIcon ? 0 : padding[spacing],
    verticalAlign: verticalAlign[spacing],
    width: shouldFitContainer ? '100%' : isOnlySingleIcon ? singleIconWidth[spacing](themeProps) : 'auto',
    // justifyContent required for shouldFitContainer buttons with an icon inside
    justifyContent: 'center',

    ...(isHover ? hoverStyles(theme, appearance, isSelected) : {}),
    ...(isActive ? activeStyles(theme, appearance, isSelected) : {}),

    // Note: we cannot disable pointer events when there is an overlay.
    // That would be easy for styling, but it would start letting events through on disabled buttons

    // Disabling visited styles (just using the base colors)
    '&:visited': { ...baseColors },

    '&:hover': hoverStyles(theme, appearance, isSelected),

    '&:focus': {
      ...getColors(theme, {
        appearance,
        key: isSelected ? 'focusSelected' : 'focus'
      }),
      boxShadow: `0 0 0 2px ${colors.boxShadowColor[appearance].focus({ theme })}`,
      // background, box-shadow
      transitionDuration: '0s, 0.2s',
      // disabling browser focus outline
      outline: 'none'
    },

    // giving active styles preference by listing them after focus
    '&:active': activeStyles(theme, appearance, isSelected),

    // preventDefault prevents regular active styles from applying in Firefox
    '&[data-firefox-is-active="true"]': {
      ...getColors(theme, {
        appearance,
        key: isSelected ? 'selected' : 'active'
      }),
      // background, box-shadow
      transitionDuration: '0s, 0s'
    },

    // Disabled buttons will still publish events for nested elements in webkit.
    // We are disabling pointer events on child elements so that
    // the button will always be the target of events
    // Note: firefox does not have this behaviour for child elements
    '&[disabled] > *, &[data-has-overlay="true"] > *': {
      pointerEvents: 'none'
    },

    // Giving disabled styles preference over active by listing them after.
    // Not using '&:disabled' because :disabled is not a valid state for all element types
    // so we are targeting the attribute
    // Attributes have the same specificity a pesudo classes so we are overriding :disabled here
    '&[disabled]': {
      // always using 'disabled' even when selected
      ...getColors(theme, { appearance, key: 'disabled' }),
      cursor: 'not-allowed',
      textDecoration: 'none'
    },

    '&[data-has-overlay="true"]': {
      cursor: 'default',
      textDecoration: 'none'
    },

    // disabling hover and active color changes when there is an overlay, but the button is not disabled
    '&[data-has-overlay="true"]:not([disabled]):hover, &[data-has-overlay="true"]:not([disabled]):active': {
      ...getColors(theme, {
        appearance,
        key: isSelected ? 'selected' : 'default'
      })
    },

    '&::-moz-focus-inner': {
      border: 0,
      margin: 0,
      padding: 0
    },

    ...((style as CSSObject) ?? {})
  };
};

const innerMargin = gridSize * 0.5;

const getMargin = (margin: 'left' | 'right' | 'both' | 'none'): string =>
  margin === 'none'
    ? '0'
    : `0 ${/right|both/.test(margin) ? `${innerMargin}px` : '0'} 0 ${
        /left|both/.test(margin) ? `${innerMargin}px` : '0'
      }`;

// inline-flex child
export function getIconStyle(): CSSObject {
  return {
    alignSelf: 'center',
    display: 'flex',
    // icon size cannot grow and shrink
    flexGrow: 0,
    flexShrink: 0,

    lineHeight: 0,
    fontSize: 0,
    userSelect: 'none',
    margin: 0
  };
}

export function getIconAfterStyle(): CSSObject {
  return {
    ...getIconStyle(),
    marginRight: `${-paddingX * 0.25}px`
  };
}

// inline-flex child
export function getContentStyle(margin: 'left' | 'right' | 'both' | 'none'): CSSObject {
  return {
    margin: getMargin(margin),

    // content can grow and shrink
    flexGrow: 1,
    flexShrink: 1,

    // ellipsis for overflow text
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  };
}

export function getFadingCss({ hasOverlay }: { hasOverlay: boolean }): CSSObject {
  return {
    transition: 'opacity 0.3s',
    opacity: hasOverlay ? 0 : 1
  };
}

export const overlayCss: CSSObject = {
  // stretching to full width / height of button
  // this is important as we need it to still block
  // event if clicking in the button's own padding
  position: 'absolute',
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,

  // Putting all children in the center
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};

export const safariTooltipFix = css`
  :before {
    content: '';
    display: block;
  }
`;
