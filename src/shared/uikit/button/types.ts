import * as React from 'react';

export type Appearance = 'default' | 'danger' | 'link' | 'primary' | 'subtle' | 'warning' | 'accent' | 'accent-subtle';

export type Spacing = 'compact' | 'default';

// Similar to {...A, ...B}
// 1. Remove all overlapping types from First
// 2. Add properties from Second
// https://codesandbox.io/s/native-button-with-nested-elementsclick-bnpjg?file=/src/index.ts
/* This type is intentionally not exported to prevent it from being explicitly referenced in the resulting button types. The alternative would
 * be making this public API and re-exporting from the root */
type Combine<First, Second> = Omit<First, keyof Second> & Second;

export type BaseOwnProps = {
  /** The base styling to apply to the button */
  appearance?: Appearance;
  /** Set the button to autofocus on mount */
  autoFocus?: boolean;
  /** Add a classname to the button */
  className?: string;
  style?: React.CSSProperties; //CSSObject;
  /** Used to 'overlay' something over a button. This is commonly used to display a loading spinner */
  overlay?: React.ReactNode;
  /** Provides a url for buttons being used as a link */
  href?: string;
  /** Places an icon within the button, after the button's text */
  iconAfter?: React.ReactChild;
  /** Places an icon within the button, before the button's text */
  iconBefore?: React.ReactChild;
  /** Set if the button is disabled */
  isDisabled?: boolean;
  /** Change the style to indicate the button is selected */
  isSelected?: boolean;
  isActive?: boolean;
  isHover?: boolean;
  /** Handler to be called on blur */
  onBlur?: React.FocusEventHandler<HTMLElement>;
  /** Handler to be called on click. The second argument can be used to track analytics data. See the tutorial in the analytics-next package for details */
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  /** Handler to be called on focus */
  onFocus?: React.FocusEventHandler<HTMLElement>;
  /** Set the amount of padding in the button */
  spacing?: Spacing;
  /** Pass target down to a link within the button component, if a href is provided */
  target?: React.AnchorHTMLAttributes<HTMLAnchorElement>['target'];
  /** Pass type down to a button */
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  /** Option to fit button width to its parent width */
  shouldFitContainer?: boolean;
  /** Text content to be rendered in the button */
  children?: React.ReactNode;
  /** A `testId` prop is provided for specified elements, which is a unique string that appears as a data attribute `data-testid` in the rendered code, serving as a hook for automated tests */
  testId?: string;

  /* An optional way of changing what button renders
    - `React.ElementType`: force the button to render whatever html element you want (eg "div")
    - `React.ComponentType<React.AllHTMLAttributes<HTMLElement>>`: pass in a component that can accept any HTMLAttribute as a prop and render whatever you would like to
  */
  component?: React.ComponentType<React.AllHTMLAttributes<HTMLElement>> | React.ElementType;

  /** Additional information to be included in the `context` of analytics events that come from button */
  analyticsContext?: Record<string, any>;
  ref?: React.Ref<HTMLElement>;
};

export type BaseProps = Combine<
  // Not allowing 'disabled' as a prop, as we control disabled through isDisabled
  Omit<React.AllHTMLAttributes<HTMLElement>, 'disabled'>,
  BaseOwnProps
>;

export interface SplitButtonGroupProps {
  appearance?: Appearance;
  /** Set if all items in group are disabled */
  isDisabled?: boolean;
  /** Set the amount of padding in group items */
  spacing?: Spacing;
}

export interface SplitButtonGroupItemProps extends Required<SplitButtonGroupProps> {
  style: React.CSSProperties;
}
