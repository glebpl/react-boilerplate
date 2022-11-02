import {
  AriaAttributes,
  Dispatch,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
  Ref,
  RefCallback,
  RefObject,
  SetStateAction
} from 'react';
import { ButtonProps } from '../button';
import { BasePlacement, Placement, PopperChildrenProps, PopperProps, VirtualElement } from '../popper';
import { FocusLockProps } from '../focus-lock';

export type PopupAppearance = 'default' | 'accent';

export interface TriggerProps<T extends HTMLElement = HTMLElement>
  extends Pick<AriaAttributes, 'aria-expanded' | 'aria-haspopup'> {
  ref: Ref<T>;
}

export type PopupTriggerRenderFn = (props: TriggerProps) => ReactNode;

export type PopupRef = HTMLDivElement | null;

export type TriggerRef = HTMLElement | null;

export interface ContentProps {
  /**
   * Will reposition the popup if any of the content has changed.
   * Useful for when positions change and the popup was not aware.
   */
  update: PopperChildrenProps['update'];

  /**
   * Passed through from the parent popup.
   */
  isOpen: boolean;

  /**
   * Received from parent popup.
   */
  isReferenceHidden: boolean | undefined;

  /**
   * Passed through from the parent popup.
   */
  onClose: (() => void) | undefined;

  /**
   * Escape hatch to set the initial focus for a specific element when the popup is opened.
   */
  setInitialFocusRef: Dispatch<SetStateAction<HTMLElement | null>>;
}

export interface PopupComponentProps extends FocusLockProps {
  /**
   * Placement passed through by the parent popup.
   */
  'data-placement'?: Placement;
}

export interface PopupProps {
  appearance?: PopupAppearance;
  /**
   * Used to either show or hide the popup.
   * When set to `false` popup will not render anything to the DOM.
   */
  isOpen: boolean;

  /**
   * Render props used to anchor the popup to your content.
   * Make this an interactive element,
   * such as an @atlaskit/button component.
   */
  trigger?: PopupTriggerRenderFn;

  /**
   * Props passed to popup container component
   */
  componentProps?: PopupComponentProps;

  /**
   * Render props for content that is displayed inside the popup.
   */
  content: (props: ContentProps) => React.ReactNode;

  /**
   * The boundary element that the popup will check for overflow.
   * Defaults to `"clippingParents"` which are parent scroll containers,
   * but can be set to any element.
   */
  boundary?: 'clippingParents' | HTMLElement;

  /**
   * Optional real or virtual reference. May be used instead of trigger to show stationary popups
   * or popups for buttons opening another popups/dropdowns
   */
  referenceElement?: PopperProps<any>['referenceElement'];

  /**
   * The root boundary that the popup will check for overflow.
   * Defaults to `"viewport"` but can be set to `"document"`.
   */
  rootBoundary?: 'viewport' | 'document';

  /**
   * Id that is assigned to the popup container element.
   */
  id?: string;

  onPopupEscaped?: () => void;
  onReferenceEscaped?: () => void;

  /**
   * Distance the popup should be offset from the reference in the format of [along, away] (units in px).
   * Defaults to [0, 8] - which means the popup will be 8px away from the edge of the reference specified
   * by the `placement` prop.
   */
  offset?: [number, number];

  /**
   * Placement of where the popup should be displayed relative to the trigger element.
   * Defaults to `"auto"`.
   */
  placement?: Placement;
  popupRef?: RefCallback<HTMLDivElement> | RefObject<HTMLDivElement> | null;

  /**
   * Allows the Popup to be placed on the opposite side of its trigger if it does not fit in the viewport.
   * Defaults to `true`.
   */
  shouldFlip?: boolean;

  /**
   * Placements which may be used to flip
   */
  fallbackPlacements?: Placement[];

  /**
   * A `testId` prop is provided for specified elements,
   * which is a unique string that appears as a data attribute `data-testid` in the rendered code,
   * serving as a hook for automated tests.
   */
  testId?: string;

  /**
   * Handler that is called when the popup wants to close itself.
   * Generally this will be either when clicking away from the popup or pressing the escape key.
   * You'll want to use this to set open state accordingly and then pump it back into the `isOpen` prop.
   */
  onClose?: (event?: React.SyntheticEvent) => void;

  /**
   * Called after popup opened
   */
  onOpen?: () => void;

  afterOpen?: () => void;

  /**
   * Z-index that the popup should be displayed in.
   * This is passed to the portal component.
   * Defaults to `layers.layer()` from `@atlaskit/theme`.
   */
  zIndex?: number;

  /**
   * Controls whether the popup takes focus when opening.
   * Defaults to `true`.
   */
  autoFocus?: boolean;
  /**
   * Will Popup use focus locking inside it's content or leave it's managing to parent component
   * Default is "true"
   */
  lockFocus?: boolean;
  /**
   * Will focus be returned to trigger when popup close
   * Default is "false" (managed by useCloseManager)
   */
  shouldReturnFocusToTrigger?: boolean;
}

export interface AccentPopupAction extends ButtonProps {
  text: ReactNode;
}

export interface AccentPopupProps extends Omit<PopupProps, 'content'> {
  action?: AccentPopupAction;
  actions?: AccentPopupAction[];
  content: ReactNode;
  // accent popup may be placed only bottom/top/left/right due to arrow
  fallbackPlacements?: BasePlacement[];
  placement?: BasePlacement;
  title?: ReactNode;
}

export interface AccentedProps {
  accentActions?: AccentPopupAction[];
  accentContent: ReactNode;
  accentTitle?: ReactNode;
  accentedElement: HTMLElement | VirtualElement | null;
  lockFocus?: boolean;
}

export interface AccentManager {
  close: () => void;
  isOpen: () => boolean;
}

export type CloseManagerHook = Pick<PopupProps, 'isOpen' | 'onClose'> & {
  manageFocusReturn: boolean;
  popupRef: PopupRef;
  triggerRef: TriggerRef;
};

export type RepositionOnUpdateProps = {
  content: (props: ContentProps) => React.ReactNode;
  update: PopperChildrenProps['update'];
};
