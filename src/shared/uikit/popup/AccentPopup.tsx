import styled from '@emotion/styled';
import * as React from 'react';
import { FC } from 'react';
import Button from '../button';
import { BasePlacement } from '../popper';
import { gridSize } from '../theme';
import Popup from './Popup';
import { AccentPopupProps } from './types';
import bannerBgr from './assets/banner.png';
import bannerBgr2x from './assets/banner-2x.png';

const basePadding = gridSize() * 2;

const Container = styled.div``;

const Banner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 48px;
  margin-top: ${basePadding / 2}px;
  font-size: 22px;
  font-weight: 700;
  background: url('${bannerBgr}') 0 0 no-repeat;

  @media only screen and (min-resolution: 2dppx) {
    background-image: url('${bannerBgr2x}');
  }
`;

const Content = styled.div<{ bannerShown: boolean }>`
  box-sizing: border-box;
  max-width: 250px;
  padding: ${({ bannerShown }) => (bannerShown ? basePadding / 2 : basePadding)}px ${basePadding}px ${basePadding / 2}px;
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 14px ${basePadding}px;
`;

export const ActionItem = styled.div`
  display: inline-flex;
  align-items: center;
  flex: 0 0 auto;
  margin: 0 2px;
`;

const fallbackPlacementsMap: Record<BasePlacement, BasePlacement[]> = {
  bottom: ['top', 'right', 'left'],
  top: ['bottom', 'right', 'left'],
  left: ['right', 'bottom', 'top'],
  right: ['left', 'bottom', 'top']
};

const AccentPopup: FC<AccentPopupProps> = props => {
  const {
    action,
    actions: propActions,
    content,
    fallbackPlacements: propFallbackPlacements,
    placement = 'bottom',
    title,
    ...rest
  } = props;

  const fallbackPlacements = propFallbackPlacements || fallbackPlacementsMap[placement];

  const actions = propActions ?? (action ? [action] : undefined);

  return (
    <Popup
      autoFocus={false}
      {...rest}
      appearance={'accent'}
      content={contentProps => (
        <Container {...contentProps}>
          {title && <Banner>{title}</Banner>}
          <Content bannerShown={!!title}>{content}</Content>
          {actions ? (
            <Actions>
              {actions.map(({ text, appearance = 'accent', ...buttonProps }, i) => (
                <ActionItem key={i}>
                  <Button appearance={appearance} {...buttonProps}>
                    {text}
                  </Button>
                </ActionItem>
              ))}
            </Actions>
          ) : null}
        </Container>
      )}
      fallbackPlacements={fallbackPlacements}
      placement={placement}
    />
  );
};

export default AccentPopup;
