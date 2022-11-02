import * as React from 'react';
import ComplexLayeringStory from './1-complex-layering';
import StackingContextStory from './2-stacking-context';

export default {
  title: 'Portal'
};

export const ComplexLayering = () => <ComplexLayeringStory />;

ComplexLayering.story = {
  name: 'Complex layering'
};

export const StackingContext = () => <StackingContextStory />;

StackingContext.story = {
  name: 'Stacking context'
};
