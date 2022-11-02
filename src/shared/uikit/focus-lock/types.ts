import type { DetailedHTMLProps, HTMLAttributes } from 'react';

type DivProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export interface FocusLockProps extends DivProps {
  /**
   * If true - focus will be set to first tabbable element, if no enabled tabbable elements inside, container will be focused.
   * Safari settings are not respected, so if first tabbable is link or button it will be focused.
   * If false - focus will be set to parent container added by FocusLock component. So next Tab will move focus to first tabbable
   * If html element - focus it
   * If function - focus will be set to element returned by it
   * If undefined - noop
   * Default is undefined
   */
  autoFocus?: boolean | HTMLElement | null | (() => HTMLElement | null);
  /**
   * Allows usage as styled(FocusLock)
   */
  className?: string;
  /**
   * Whether the focus lock is active or not.
   * Default is true
   */
  isEnabled?: boolean;
  /**
   * Should focus be returned to element which was active before FocusLock mounting
   * Default is true
   */
  shouldReturnFocus?: boolean;
  testId?: string;
}

export interface MoveFocusInsideProps extends DivProps {
  /**
   * Allows usage as styled(MoveFocusInside)
   */
  className?: string;
  /**
   * Default is true
   */
  isEnabled?: boolean;
}
