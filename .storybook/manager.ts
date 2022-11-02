import { create } from '@storybook/theming';
import { addons } from '@storybook/addons';

const theme = create({
  base: 'light',
  brandTitle: 'React Boilerplate Storybook'
});

addons.setConfig({
  theme
});
