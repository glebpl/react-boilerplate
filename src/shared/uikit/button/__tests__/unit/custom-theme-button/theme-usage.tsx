/** @jsx jsx */
// noinspection ES6UnusedImports
import { CSSObject, jsx } from '@emotion/react';
import { render } from '@testing-library/react';
import { hasStyleRule } from '../../../_testutil/style-rules';
import { CustomThemeButton, CustomThemeButtonProps } from '../../../index';
import { EmotionTheme } from '../../../../theme';

const additions: CSSObject = {
  width: '100px',
  height: '200px',
  margin: '20px'
};

const OurButton = (props: CustomThemeButtonProps) => (
  <CustomThemeButton
    testId='button'
    theme={(current, themeProps) => {
      const { buttonStyles, spinnerStyles } = current(themeProps);
      return {
        buttonStyles: (theme: EmotionTheme) => ({
          ...buttonStyles(theme),
          ...additions
        }),
        spinnerStyles: spinnerStyles
      };
    }}
    {...props}
  />
);

it('should render button styles defined in custom theme', () => {
  const { getByTestId } = render(<OurButton />);

  const button = getByTestId('button');

  expect(hasStyleRule(`.${button.className}`, additions)).toBe(true);
});

it('should render button styles defined in ADG theme if no custom theme passed in', () => {
  const { getByTestId } = render(<CustomThemeButton testId='button' />);

  const button = getByTestId('button');

  expect(hasStyleRule(`.${button.className}`, { display: 'inline-flex' })).toBe(true);
});
