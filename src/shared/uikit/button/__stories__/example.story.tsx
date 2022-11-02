import * as React from 'react';
import ButtonStory from './10-Button';
import OverlayStory from './15-Overlay';
import ButtonGroupStory from './20-ButtonGroup';
import SplitButtonsStory from './22-split-buttons';
import DisabledStory from './25-disabled';
import Overlay2Story from './26-overlay';
import AppearancesStory from './30-Appearances';
import OptionsStory from './35-Options';
import CustomComponentStory from './38-CustomComponent';
import TruncationStory from './40-Truncation';
import SpacingStory from './50-Spacing';
import CustomizedWithStory from './55-customized-with-inline-styles';
import CustomThemingStory from './90-custom-theming';
import WithIconsStory from './91-with-icons';

export default {
  title: 'Button'
};

export const Button = () => <ButtonStory />;
export const ButtonGroup = () => <ButtonGroupStory />;

ButtonGroup.story = {
  name: 'Button group'
};

export const SplitButtons = () => <SplitButtonsStory />;

SplitButtons.story = {
  name: 'Split buttons'
};

export const Overlay = () => <OverlayStory />;
export const Disabled = () => <DisabledStory />;
export const Overlay2 = () => <Overlay2Story />;
export const Appearances = () => <AppearancesStory />;
export const Options = () => <OptionsStory />;
export const CustomComponent = () => <CustomComponentStory />;

CustomComponent.story = {
  name: 'Custom component'
};

export const Truncation = () => <TruncationStory />;
export const Spacing = () => <SpacingStory />;
export const CustomizedWithInlineStyles = () => <CustomizedWithStory />;

CustomizedWithInlineStyles.story = {
  name: 'Customized with inline styles'
};

export const CustomTheming = () => <CustomThemingStory />;

CustomTheming.story = {
  name: 'Custom theming'
};

export const WithIcons = () => <WithIconsStory />;

WithIcons.story = {
  name: 'With icons'
};
