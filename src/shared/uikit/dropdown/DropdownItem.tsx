import * as React from 'react';
import { KeyboardEvent, MouseEvent, forwardRef, useCallback, useContext, ForwardRefRenderFunction } from 'react';
import DropdownEventContext from './DropdownEventContext';
import { ItemAfter, ItemBefore, ItemContent, ItemContentWrapper, ItemRootBase, ItemRootLink } from './styled';
import { DropdownItemProps } from './types';

const DropdownItem: ForwardRefRenderFunction<HTMLElement, DropdownItemProps> = (props, ref) => {
  const { children, elemAfter, elemBefore, onClick, onKeyDown, shouldCloseDropdown = true, testId, ...rest } = props;
  const { href, isDisabled, isHidden } = rest;
  const focusable = !isHidden && !isDisabled;
  const eventContext = useContext(DropdownEventContext);
  const ItemRoot = href && !isDisabled ? ItemRootLink : ItemRootBase;

  const handleClick = useCallback(
    (e: MouseEvent | KeyboardEvent): void => {
      if (!isDisabled) {
        onClick && onClick(e);
        eventContext?.onItemClick(e, shouldCloseDropdown);
      }
    },
    [eventContext, isDisabled, onClick, shouldCloseDropdown]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      onKeyDown && onKeyDown(e);
      if ((e.key === 'Enter' || e.key === ' ' || e.code === 'Space') && !href) {
        handleClick(e);
      }
      eventContext?.onItemKeyDown(e);
    },
    [eventContext?.onItemKeyDown, handleClick, onKeyDown, href]
  );

  return (
    <ItemRoot
      aria-disabled={isDisabled}
      data-testid={testId}
      role='menuitem'
      tabIndex={focusable ? 0 : undefined}
      {...rest}
      onClick={isDisabled ? undefined : handleClick}
      onKeyDown={handleKeyDown}
      /* @ts-expect-error TS2322: Type 'HTMLElement | null' is not assignable to type 'HTMLDivElement | null' */
      ref={ref}
    >
      {elemBefore && <ItemBefore>{elemBefore}</ItemBefore>}
      <ItemContentWrapper>
        <ItemContent>{children}</ItemContent>
      </ItemContentWrapper>
      {elemAfter && <ItemAfter>{elemAfter}</ItemAfter>}
    </ItemRoot>
  );
};

export default forwardRef(DropdownItem);
