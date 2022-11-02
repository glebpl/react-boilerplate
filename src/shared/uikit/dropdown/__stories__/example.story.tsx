import * as React from 'react';
import PositioningStory from './01-positioning';
import InModalStory from './02-in-modal-dialog';
import ScrollableContentStory from './03-scrollable-content';
import WithIconsStory from './04-with-icons';
import ItemGroupsStory from './05-item-groups';
import CustomTriggerStory from './06-custom-trigger';
import ChangeItemsStory from './07-change-items';
import WithTextfieldStory from './08-with-textfield';
import RadioDropdownStory from './09-radio';
import DropdownModesStory from './10-modes';
import CheckboxDropdownStory from './11-checkbox';

export default {
  title: 'Dropdown'
};

export const Positioning = () => <PositioningStory />;
export const InModalDialog = () => <InModalStory />;

InModalDialog.story = {
  name: 'In modal dialog'
};

export const InScrollableContent = () => <ScrollableContentStory />;

InScrollableContent.story = {
  name: 'In scrollable content'
};

export const WithIcons = () => <WithIconsStory />;

WithIcons.story = {
  name: 'With icons'
};

export const ItemGroups = () => <ItemGroupsStory />;

ItemGroups.story = {
  name: 'Item groups'
};

export const CustomTrigger = () => <CustomTriggerStory />;

CustomTrigger.story = {
  name: 'Custom trigger'
};

export const ChangeItems = () => <ChangeItemsStory />;

ChangeItems.story = {
  name: 'Change items'
};

export const WithTextfield = () => <WithTextfieldStory />;

WithTextfield.story = {
  name: 'With textfield'
};

export const RadioDropdownItems = () => <RadioDropdownStory />;

RadioDropdownItems.story = {
  name: 'Radio dropdown items'
};

export const ControlledAndUncontrolledMode = () => <DropdownModesStory />;

ControlledAndUncontrolledMode.story = {
  name: 'Controlled and uncontrolled mode'
};

export const CheckboxDropdownItems = () => <CheckboxDropdownStory />;

CheckboxDropdownItems.story = {
  name: 'Checkbox dropdown items'
};
