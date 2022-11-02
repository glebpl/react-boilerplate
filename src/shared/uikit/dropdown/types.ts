import { ReactNode, KeyboardEvent, MouseEvent, HTMLAttributes, SyntheticEvent } from 'react';
import { ButtonProps } from '../button';
import { ContentProps as PopupContentProps, PopupProps, TriggerProps } from '../popup';
import { EmotionThemeProps } from '../theme';

export type CloseCallback = (event?: KeyboardEvent | MouseEvent | SyntheticEvent, returnFocusToRef?: boolean) => void;

export type DropdownItemClickCallback = (e: MouseEvent | KeyboardEvent, shouldCloseDropdown: boolean) => void;

export interface DropdownItemProps extends EmotionThemeProps {
  /**
   * Primary content for the item.
   */
  children: ReactNode;

  /**
   * Makes the element appear disabled as well as removing interactivity.
   */
  isDisabled?: boolean;

  /**
   * Hides the item.
   */
  isHidden?: boolean;

  /**
   * Should dropdown close when item clicked
   */
  shouldCloseDropdown?: boolean;

  /**
   * Event that is triggered when the element is clicked.
   */
  onClick?: (e: MouseEvent | KeyboardEvent) => void;

  onKeyDown?: (e: KeyboardEvent) => void;

  /**
   * Link to another page.
   */
  href?: string;

  /**
   * Where to display the linked URL,
   * see [anchor information](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a) on mdn for more information.
   */
  target?: string;

  /**
   * Adds a title attribute to the root item element.
   */
  title?: string;

  /**
   * Is not applied. Requires Tooltip review
   */
  // tooltip?: ReactNode;

  /**
   * Element to render before the item text.
   * Generally should be an icon component..
   */
  elemBefore?: ReactNode;

  /**
   * Element to render after the item text.
   * Generally should be an icon component.
   */
  elemAfter?: ReactNode;
  testId?: string;
}

export interface SelectableDropdownItemProps extends DropdownItemProps {
  id: string;
  isSelected?: boolean;
}

export interface DropdownItemGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  elemAfter?: ReactNode;
  title?: ReactNode;
}

export interface DropdownTriggerProps<T extends HTMLElement = HTMLElement> extends TriggerProps<T> {
  isDisabled: boolean;
  isSelected: boolean;
  onClick: (e: MouseEvent | KeyboardEvent) => void;
  onKeyDown: (e: KeyboardEvent) => void;
  testId?: string;
}

export type DrodownTriggerRenderFn = (props: Partial<DropdownTriggerProps>) => ReactNode;

export interface DropdownContentProps extends PopupContentProps {}

export interface DropdownProps extends EmotionThemeProps {
  /**
   * By default dropdown will be closed also when reference element becomes invisible
   * If closeOnTriggerEscape === false dropdown stays visible until it escapes visible area even if reference element is already invisible.
   * It may be useful in modals and in scrollable content.
   * Default is true
   */
  closeOnTriggerEscape?: boolean;
  /**
   * HTML props passed to dropdown content element
   */
  contentProps?: HTMLAttributes<HTMLDivElement>;
  /**
   * Placements to be tried if dropdown can not be shown using placement
   * See https://popper.js.org/docs/v2/modifiers/flip/
   */
  fallbackPlacements?: PopupProps['fallbackPlacements'];
  isDisabled?: boolean;
  isOpen?: boolean;
  defaultIsOpen?: boolean;

  /**
   *  onOpen and onClose called when a state change request is received
   */
  onOpen?: (event?: KeyboardEvent | MouseEvent) => void;
  onClose?: (event?: KeyboardEvent | MouseEvent | SyntheticEvent) => void;

  /**
   * Called when dropdown is open (visible) and correctly positioned
   */
  afterOpen?: () => void;
  placement?: PopupProps['placement'];
  tooltip?: ReactNode;
  /**
   * Element which will trigger the dropdown menu to open and close.
   * If string is passed default button with chevron will be rendered
   */
  trigger: ReactNode | DrodownTriggerRenderFn;
  /** Props to pass through to the trigger button. See @atlaskit/button for allowed props. */
  triggerButtonProps?: ButtonProps;
  /**
   As dropdown is composed of different components, we pass down the testId to the sub component you want to test:
   - `testId--trigger` - trigger.
   - `testId--content` - content.
   - `testId--popup` - popup container.
   */
  testId?: string;
  zIndex?: number;

  contentRef?: (node: HTMLDivElement) => void;
  popupRef?: (node: HTMLDivElement) => void;
}

export interface DropdownEventContextAPI {
  onItemClick: DropdownItemClickCallback;
  onItemKeyDown: (e: KeyboardEvent) => void;
  onContentKeyDown: (e: KeyboardEvent) => void;
}
