import styled from '@emotion/styled';
import { EmotionThemeProps, gridSize } from '../../theme';

export * from './Item';
export * from './Group';

export const Content = styled('div')<EmotionThemeProps>`
  box-sizing: border-box;
  overflow: auto;
  padding: ${gridSize()}px 0;
  &:focus {
    outline: none;
  }
`;
