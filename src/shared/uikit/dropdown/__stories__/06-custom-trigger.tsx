import styled from '@emotion/styled';
import { actions as storybookActions } from '@storybook/addon-actions';
import * as faker from 'faker';
import * as React from 'react';
import Button from '../../button';
import { ChevronDownIcon } from '../../icon/glyph';
import { gridSize } from '../../theme';
import Tooltip from '../../tooltip';
import { Dropdown, DropdownItem } from '../index';

const itemActions = storybookActions<'onClickEdit' | 'onClickDelete'>('onClickEdit', 'onClickDelete');

const Row = styled.div`
  display: flex;
  align-items: center;
  margin: 0 ${-gridSize()}px;
`;

const Span = styled.div`
  display: block;
  padding: 0 ${gridSize()}px;
`;

const StyledButton = styled(Button)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  padding: 0 6px;
`;

const CustomTrigger: React.FC = () => {
  const handleClickEdit = (e: React.MouseEvent) => itemActions.onClickEdit(e);
  const handleClickDelete = (e: React.MouseEvent) => itemActions.onClickDelete(e);
  return (
    <Row>
      <Span>
        <Dropdown
          trigger={popupTriggerProps => (
            <Tooltip hideTooltipOnPointerDown={true} showTooltipOnFocus={false} content={faker.random.words(3)}>
              {targetProps => (
                <Button {...targetProps} {...popupTriggerProps}>
                  Dropdown with tooltip
                </Button>
              )}
            </Tooltip>
          )}
        >
          <DropdownItem>{faker.random.words(5)}</DropdownItem>
          <DropdownItem>{faker.random.words(3)}</DropdownItem>
          <DropdownItem>{faker.random.words(4)}</DropdownItem>
        </Dropdown>
      </Span>
      <Span>
        <Dropdown
          trigger={({ isSelected, isDisabled, onClick, onKeyDown, ...popupTriggerProps }) => (
            <StyledButton
              {...popupTriggerProps}
              isDisabled={isDisabled}
              isSelected={isSelected}
              onClick={onClick}
              onKeyDown={onKeyDown}
              iconBefore={<ChevronDownIcon size={'small'} />}
            />
          )}
        >
          <DropdownItem onClick={handleClickEdit}>Edit</DropdownItem>
          <DropdownItem onClick={handleClickDelete}>Delete</DropdownItem>
        </Dropdown>
      </Span>
    </Row>
  );
};

export default CustomTrigger;
