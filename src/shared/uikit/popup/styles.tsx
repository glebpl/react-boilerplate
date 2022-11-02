import { css, SerializedStyles } from '@emotion/react';
import { borderRadius, shadows, layers, EmotionThemeProps, palette, EmotionTheme } from '../theme';
import { PopupAppearance } from './types';

export interface PopupStyledProps extends EmotionThemeProps {
  appearance: PopupAppearance;
}

const accentBgr = palette.a300;
const arrowSize = 10;
const arrowOffset = arrowSize / 2;

const getPopupBackground = (props: PopupStyledProps): string =>
  props.appearance === 'accent' ? accentBgr(props) : palette.n0(props);

export const accentPopupArrow = (theme: EmotionTheme) => css`
  &:after {
    content: '';
    position: absolute;
    width: ${arrowSize}px;
    height: ${arrowSize}px;
    transform: rotate(45deg);
    background: ${accentBgr(theme.mode)};
  }
  &[data-placement^='bottom']:after {
    top: ${-arrowOffset}px;
    left: 50%;
    margin-left: ${-arrowOffset}px;
  }
  &[data-placement^='top']:after {
    bottom: ${-arrowOffset}px;
    left: 50%;
    margin-left: ${-arrowOffset}px;
  }
  &[data-placement^='left']:after {
    top: 50%;
    right: ${-arrowOffset}px;
    margin-top: ${-arrowOffset}px;
  }
  &[data-placement^='right']:after {
    top: 50%;
    left: ${-arrowOffset}px;
    margin-top: ${-arrowOffset}px;
  }
`;

export const createPopupCss = (theme: EmotionTheme, appearance: PopupAppearance): SerializedStyles => css`
  background-color: ${getPopupBackground({ appearance, theme })};
  border-radius: ${borderRadius()}px;
  color: ${appearance === 'accent' ? palette.n0(theme.mode) : 'inherit'};
  box-shadow: ${shadows.e200({ theme })};
  box-sizing: border-box;
  display: block;
  flex: 1 1 auto;
  overflow: ${appearance === 'accent' ? 'visible' : 'auto'};
  z-index: ${layers.layer()};
  ${appearance === 'accent' ? accentPopupArrow(theme) : undefined}
  &:focus {
    outline: none;
  }
`;
