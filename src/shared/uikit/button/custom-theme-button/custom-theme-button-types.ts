import { CSSObject } from '@emotion/react';
import { BaseProps } from '../types';
import { EmotionTheme } from '../../theme';

export type ThemeTokens = {
  buttonStyles: (theme: EmotionTheme) => CSSObject;
  spinnerStyles: CSSObject;
};

export type InteractionState = 'disabled' | 'focusSelected' | 'selected' | 'active' | 'hover' | 'focus' | 'default';

export type CustomThemeButtonOwnProps = {
  /* Conditionally show a spinner over the top of a button */
  isLoading?: boolean;
  /** Slow + discouraged custom theme API
   * See custom theme guide for usage details
   */
  theme?: (current: (props: ThemeProps) => ThemeTokens, props: ThemeProps) => ThemeTokens;
};

export type CustomThemeButtonProps = Omit<BaseProps, 'overlay'> & CustomThemeButtonOwnProps;

export type ThemeProps = Partial<CustomThemeButtonProps> & {
  // state: string;
  state: InteractionState;
  iconIsOnlyChild?: boolean;
};
