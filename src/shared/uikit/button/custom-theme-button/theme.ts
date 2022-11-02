import { CSSObject } from '@emotion/react';
import { createTheme } from '../../theme';
import { getCss } from '../shared/css';
import { InteractionState, ThemeProps, ThemeTokens } from './custom-theme-button-types';
import { EmotionTheme } from '../../theme';
import { Appearance } from '../types';

type InteractionMap = {
  [key in InteractionState]: string;
};

const stateToSelectorMap: Partial<InteractionMap> = {
  focus: '&:focus',
  focusSelected: '&:focus',
  hover: '&:hover',
  active: '&:active',
  disabled: '&[disabled]'
};

// Mapping the new clean css back to the legacy theme format.
// The legacy theme format has all styles at the top level (no nested selectors)
// and uses `getSpecifiers()` to apply the style to all psudeo states
export const getCustomCss =
  ({
    appearance = 'default',
    spacing = 'default',
    isSelected = false,
    shouldFitContainer = false,
    iconIsOnlyChild = false,
    isLoading = false,
    state
  }: ThemeProps): ((theme: EmotionTheme) => CSSObject) =>
  (theme: EmotionTheme) => {
    let result: CSSObject = getCss(theme, {
      appearance,
      spacing,
      isSelected,
      shouldFitContainer,
      isOnlySingleIcon: iconIsOnlyChild
    });

    // we need to disable the default browser focus styles always
    // this is because we are not expressing that we can have two pesduo states at a time
    result.outline = 'none';

    // Pulling relevant styles up to the top level
    const selector: string | undefined = stateToSelectorMap[state];
    if (selector) {
      result = {
        ...result,
        ...(result[selector] as CSSObject)
      };
    }

    if (isLoading) {
      result = {
        ...result,
        // Pull overlay styles up to the top
        ...(result['&[data-has-overlay="true"]'] as CSSObject)
      };
    }

    // Delete all selectors and just keep root styles
    Object.keys(result).forEach((key: string) => {
      // want to keep this one
      if (key === '&::-moz-focus-inner') {
        return;
      }

      // Not using .startsWith for ie11
      if (key.startsWith('&')) {
        delete result[key];
      }
    });

    return result;
  };

// This styling approach works by generating a 'style' and applying with maximum specificity
// To do this we are overwriting all psuedo selectors
export function getSpecifiers(styles: (theme: EmotionTheme) => CSSObject) {
  return (theme: EmotionTheme): CSSObject => ({
    '&, &:hover, &:active, &:focus, &:visited, &:disabled, &[disabled]': styles(theme)
  });
}

export function defaultThemeFn(current: (values: ThemeProps) => ThemeTokens, values: ThemeProps): ThemeTokens {
  return current(values);
}

export function extract(
  customTheme: Partial<Record<Appearance, Record<string, any>>>,
  theme: EmotionTheme,
  { appearance = 'default', state }: ThemeProps
): CSSObject | undefined {
  const root = customTheme[appearance];

  if (!root) {
    return undefined;
  }
  return Object.keys(root).reduce((acc: { [index: string]: string }, val) => {
    let node = root;
    [val, state].forEach(item => {
      if (!node[item]) {
        return undefined;
      }
      if ('function' === typeof node[item]) {
        acc[val] = node[item]({ theme });
        return undefined;
      } else if (typeof node[item] !== 'object') {
        acc[val] = node[item];
        return undefined;
      }
      node = node[item];
      return undefined;
    });
    return acc;
  }, {});
}

const Theme = createTheme<ThemeTokens, ThemeProps>(themeProps => ({
  buttonStyles: getCustomCss(themeProps),
  // No styles being applied directly to spinner by default
  // Keeping this for legacy compat. We could remove it, but given
  // that we are changing theme soon there is no point
  spinnerStyles: {}
}));

export default Theme;
