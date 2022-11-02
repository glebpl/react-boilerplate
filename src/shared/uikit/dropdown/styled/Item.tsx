import * as React from 'react';
import { css, SerializedStyles } from '@emotion/react';
import styled from '@emotion/styled';
import { DropdownItemProps } from '../types';
import { palette, EmotionThemeFn, EmotionThemeProps, gridSize, fontSize, lineHeight } from '../../theme';

type ItemStateName = 'default' | 'active' | 'hover' | 'disabled';

interface ItemStyleProps {
  background: EmotionThemeFn;
  text: EmotionThemeFn;
}

const transparent = () => 'transparent';

const theme: Record<ItemStateName, ItemStyleProps> = {
  default: {
    background: transparent,
    text: palette.n800
  },
  active: {
    background: palette.p50,
    text: palette.p400
  },
  hover: {
    background: palette.n30,
    text: palette.n800
  },
  disabled: {
    background: transparent,
    text: palette.n70
  }
};

const getItemState = (stateName: ItemStateName): ((props: EmotionThemeProps) => SerializedStyles) => {
  const stateStyles = theme[stateName];
  const textColor = (etp: EmotionThemeProps): string => stateStyles.text(etp);
  const bgColor = (etp: EmotionThemeProps): string => stateStyles.background(etp);
  return emotionThemeProps => css`
    background-color: ${bgColor(emotionThemeProps)};
    color: ${textColor(emotionThemeProps)};
    fill: ${bgColor(emotionThemeProps)};
    text-decoration: none;
    &:focus {
      color: ${textColor(emotionThemeProps)};
    }
  `;
};

const getInteractiveStyles = (props: DropdownItemProps): ((props: EmotionThemeProps) => SerializedStyles) => {
  const { isDisabled } = props;
  const standardFocus = (p: EmotionThemeProps) => css`
    &:focus {
      box-shadow: 0 0 0 2px ${palette.p100(p)} inset;
      text-decoration: none;
    }
  `;

  if (isDisabled) {
    // pointer-events: none is not used because it conflicts with cursor
    // and makes impossible to add tooltips to disabled items
    return emotionThemeProps => css`
      cursor: not-allowed;
      ${getItemState('disabled')(emotionThemeProps)}
    `;
  }

  return emotionThemeProps => css`
    &:hover {
      ${getItemState('hover')(emotionThemeProps)};
    }
    &:active {
      ${getItemState('active')(emotionThemeProps)};
    }
    ${standardFocus(emotionThemeProps)};
  `;
};

export const ItemRootBase = styled('div')<DropdownItemProps>`
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
  display: ${({ isHidden }) => (isHidden ? 'none' : 'flex')};
  padding: ${gridSize() * 0.75}px ${gridSize() * 1.5}px;
  ${getItemState('default')}
  ${getInteractiveStyles}
  &:focus {
    outline: none;
    /* relative position prevents bgcolor of a hovered element from
      obfuscating focus ring of a focused sibling element */
    position: relative;
  }
`;

export const ItemRootLink = ItemRootBase.withComponent('a');

export const ItemContentWrapper = styled.span`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  flex-grow: 1;
  margin: 0;
  overflow: hidden;

  &:first-child {
    margin: 0;
  }
`;

export const ItemContent = styled.span`
  display: block;
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

// Elements injected before/after the children
const ItemBeforeAfterBase = styled.span`
  align-items: center;
  display: flex;
  flex-shrink: 0;
`;

const maxIconHeight = () => fontSize() * lineHeight();

export const ItemBefore = styled(ItemBeforeAfterBase)`
  margin-right: ${gridSize()}px;
  max-height: ${maxIconHeight()}px;
`;

export const ItemAfter = styled(ItemBeforeAfterBase)`
  margin-left: ${gridSize()}px;
  max-height: ${maxIconHeight()}px;
`;
