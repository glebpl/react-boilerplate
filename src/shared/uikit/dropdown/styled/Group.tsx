import styled from '@emotion/styled';
import { EmotionThemeProps, fontWeightBold, gridSize } from '../../theme';
import { palette } from '../../theme';

export const GroupTitle = styled.div<EmotionThemeProps>`
  display: flex;
  align-items: center;
  line-height: ${gridSize() * 2}px;
  padding: ${gridSize() * 0.5}px ${gridSize() * 1.5}px ${gridSize() * 0.75}px;
  color: ${palette.n200};
`;

export const GroupTitleText = styled.div`
  font-size: 11px;
  font-weight: ${fontWeightBold()};
  text-transform: uppercase;
  /* Required for children to truncate */
  min-width: 0;
`;

export const GroupTitleAfter = styled.div`
  display: block;
  line-height: 0;
  margin-left: ${gridSize() / 2}px;
`;

export const Group = styled.div<EmotionThemeProps>`
  & + & {
    border-top: 1px ${palette.n40} solid;
    margin-top: ${gridSize() * 0.25}px;
    padding-top: ${gridSize() * 0.25}px;
  }
`;
