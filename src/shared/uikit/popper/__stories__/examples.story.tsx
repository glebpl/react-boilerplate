import * as React from 'react';
import BasicStory from './00-basic';
import ScrollParentStory from './01-scroll-container';
import AdvancedBehavioursStory from './02-advanced-behaviors';

export default {
  title: 'Popper'
};

export const Basic = () => <BasicStory />;
export const ScrollParent = () => <ScrollParentStory />;
ScrollParent.storyName = 'Scroll parent';

export const AdvancedBehaviours = () => <AdvancedBehavioursStory />;
AdvancedBehaviours.storyName = 'Advanced behaviours';
