import styled from '@emotion/styled';
import * as React from 'react';
import { AddIcon, WarningIcon, FlagFilledIcon, CrossIcon } from '../../icon/glyph';
import { gridSize } from '../../theme';
import { ExampleDropdown } from './ExampleDropdown';

interface WrapperProps {
  left?: number | string | undefined;
  top?: number | string | undefined;
  right?: number | string | undefined;
  bottom?: number | string | undefined;
}

const Page = styled.div`
  position: absolute;
  top: ${gridSize()}px;
  right: ${gridSize()}px;
  bottom: ${gridSize()}px;
  left: ${gridSize()}px;
`;

const getPositionStyle = (props: WrapperProps): { left: string; top: string; right: string; bottom: string } => {
  const makeValue = (propValue: number | string | undefined): string =>
    propValue === undefined ? 'auto' : 'number' === typeof propValue ? `${propValue}px` : propValue;
  return {
    left: makeValue(props.left),
    top: makeValue(props.top),
    right: makeValue(props.right),
    bottom: makeValue(props.bottom)
  };
};

const Wrapper = styled.div<WrapperProps>`
  position: absolute;
  ${props => getPositionStyle(props)}
`;

const DropdownPositioning: React.FC = () => (
  <Page>
    <Wrapper left={0} top={0}>
      <ExampleDropdown
        items={[
          {
            text: 'Link with href',
            href: 'https://alm.works',
            target: '_blank',
            elemBefore: <AddIcon size='small' />
          },
          {
            text: 'Link with hash href triggers click on Enter',
            href: '#',
            elemBefore: <AddIcon size='small' />,
            onClick: e => {
              e.preventDefault();
            }
          },
          {
            text: 'Disabled link with href',
            href: 'https://alm.works',
            target: '_blank',
            isDisabled: true,
            elemBefore: <FlagFilledIcon size='small' />
          },
          {
            isDisabled: true,
            text: 'Disabled item',
            elemBefore: <CrossIcon size='small' />
          },
          {
            text: "This shouldn't close dropdown when clicked",
            shouldCloseDropdown: false,
            elemBefore: <WarningIcon size='small' />
          }
        ]}
      />
    </Wrapper>
    <Wrapper left={0} top={'30%'}>
      <ExampleDropdown />
    </Wrapper>
    <Wrapper left={0} top={'60%'}>
      <ExampleDropdown numberOfItems={5} />
    </Wrapper>
    <Wrapper left={'50%'} top={0}>
      <ExampleDropdown />
    </Wrapper>
    <Wrapper left={'50%'} top={'30%'}>
      <ExampleDropdown numberOfItems={5} />
    </Wrapper>
    <Wrapper left={'50%'} top={'60%'}>
      <ExampleDropdown />
    </Wrapper>
    <Wrapper right={0} top={0}>
      <ExampleDropdown placement={'bottom-end'} />
    </Wrapper>
    <Wrapper right={0} top={'30%'}>
      <ExampleDropdown numberOfItems={8} placement={'bottom-end'} />
    </Wrapper>
    <Wrapper right={0} top={'60%'}>
      <ExampleDropdown numberOfItems={8} placement={'bottom-end'} />
    </Wrapper>
  </Page>
);

export default DropdownPositioning;
