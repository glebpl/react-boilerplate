import styled from '@emotion/styled';
import * as React from 'react';
import { SplitButtonGroupProps } from './types';
import { borderRadius, gridSize } from '../theme';
import { ReactElement } from 'react';
import { ButtonProps } from './button';

const Container = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`;

const br = borderRadius();
const spaceX = gridSize() * 0.25;

export const getItemCss = (idx: number, total: number): React.CSSProperties => {
  const isFirst = idx === 0;
  const isLast = idx === total - 1;
  return {
    flex: '1 0 auto',
    borderRadius: `${isFirst ? br : 0}px ${isLast ? br : 0}px ${isLast ? br : 0}px ${isFirst ? br : 0}px`,
    margin: `0 0 0 ${isFirst ? 0 : `${spaceX}px`}`
  };
};

const SplitButtonGroup: React.FC<SplitButtonGroupProps> = props => {
  const { appearance = 'default', children, isDisabled = false, spacing } = props;
  const total = React.Children.count(children);
  return (
    <Container>
      {React.Children.toArray(children).map(
        (child: ReactElement<Pick<ButtonProps, 'appearance' | 'isDisabled' | 'spacing' | 'style'>>, idx) => {
          if (!child) {
            return null;
          }
          return React.cloneElement(child, {
            appearance: child.props.appearance ?? appearance,
            isDisabled: child.props.isDisabled ?? isDisabled,
            spacing: child.props.spacing ?? spacing,
            style: getItemCss(idx, total)
          });
        }
      )}
    </Container>
  );
};

export default SplitButtonGroup;
