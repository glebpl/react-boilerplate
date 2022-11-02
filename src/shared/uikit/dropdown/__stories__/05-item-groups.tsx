import { actions as storybookActions } from '@storybook/addon-actions';
import * as React from 'react';
import {
  AlmWizardIcon,
  InfoIcon,
  QuestionCircleIcon,
  WarningIcon,
  FlagFilledIcon,
  JqlQueryIcon
} from '../../icon/glyph';
import Tooltip from '../../tooltip';
import { Dropdown, DropdownItem, DropdownItemGroup } from '../index';

const actions = storybookActions<'onClick'>('onClick');

const ItemGroups: React.FC = () => (
  <Dropdown trigger='Dropdown with groups'>
    <DropdownItemGroup title='Generators' elemAfter={<AlmWizardIcon size='small' />}>
      <Tooltip
        position='right'
        content="You are welcome to execute this action if you want to make such things and don't afraid to be fired"
      >
        {triggerProps => (
          <DropdownItem {...triggerProps} elemBefore={<QuestionCircleIcon size='small' />} {...actions}>
            First item
          </DropdownItem>
        )}
      </Tooltip>
      <Tooltip position='right' content='You are welcome to execute this action'>
        {triggerProps => (
          <DropdownItem {...triggerProps} elemBefore={<WarningIcon size='small' />} {...actions}>
            Second item
          </DropdownItem>
        )}
      </Tooltip>
      <Tooltip position='right' content='You are not allowed to execute this action'>
        {triggerProps => (
          <DropdownItem {...triggerProps} elemBefore={<JqlQueryIcon size='small' />} isDisabled {...actions}>
            Disabled item
          </DropdownItem>
        )}
      </Tooltip>
    </DropdownItemGroup>
    <DropdownItemGroup title='New item'>
      <DropdownItem elemBefore={<InfoIcon size='small' />} {...actions}>
        First item in second group
      </DropdownItem>
      <DropdownItem elemBefore={<FlagFilledIcon size='small' />} {...actions}>
        Second item in second group
      </DropdownItem>
    </DropdownItemGroup>
  </Dropdown>
);

export default ItemGroups;
