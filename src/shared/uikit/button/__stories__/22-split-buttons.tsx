/** @jsx jsx */
// noinspection ES6UnusedImports
import { jsx } from '@emotion/react';
import styled from '@emotion/styled';
import * as React from 'react';
import { Dropdown, DropdownItem, DropdownTriggerProps } from '../../dropdown';
import { ChevronDownIcon } from '../../icon/glyph';
import Tooltip, { TargetProps } from '../../tooltip';
import Button, { ButtonProps, SplitButtonGroup, SplitButtonGroupItemProps } from '../index';

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const chevronIcon = <ChevronDownIcon size={'small'} />;

const SplitDropdown: React.FC<Partial<SplitButtonGroupItemProps>> = splitItemProps => (
  <Dropdown
    placement={'bottom-end'}
    isDisabled={splitItemProps.isDisabled}
    trigger={(triggerProps: DropdownTriggerProps<HTMLButtonElement>) => (
      <Button {...splitItemProps} {...triggerProps} iconBefore={chevronIcon} />
    )}
  >
    <DropdownItem>Dropdown item 1</DropdownItem>
    <DropdownItem>Dropdown item 2</DropdownItem>
  </Dropdown>
);

const ButtonWithTooltip: React.FC<
  Partial<SplitButtonGroupItemProps> & { tooltip: React.ReactNode } & Omit<ButtonProps, 'isDisabled'>
> = props => {
  const { tooltip, ...buttonProps } = props;
  return (
    <Tooltip content={tooltip} position={'bottom-start'}>
      {(targetProps: TargetProps<HTMLButtonElement>) => <Button {...buttonProps} {...targetProps} />}
    </Tooltip>
  );
};

const SplitButtonsStory: React.FC = () => (
  <React.Fragment>
    <Row>
      <SplitButtonGroup appearance='default'>
        <Button>First button</Button>
        <Button>Second button</Button>
        <ButtonWithTooltip tooltip={'Tooltip for split button'}>Button with tooltip</ButtonWithTooltip>
        <SplitDropdown />
      </SplitButtonGroup>
    </Row>
    <Row>
      <SplitButtonGroup appearance='default' spacing='compact'>
        <Button>Compact button 1</Button>
        <Button>Compact button 2</Button>
        <SplitDropdown />
      </SplitButtonGroup>
    </Row>
    <Row>
      <SplitButtonGroup appearance='default' isDisabled>
        <Button>First Button</Button>
        <Button>Second Button</Button>
        <SplitDropdown />
      </SplitButtonGroup>
    </Row>
  </React.Fragment>
);

export default SplitButtonsStory;
