import { createContext, RefObject } from 'react';
import { useContentKeyDownHandler, useItemClickHandler, useItemKeyDownHandler } from './internal/utils';
import { DropdownEventContextAPI, CloseCallback } from './types';

export const useEventContext = (
  contentRef: RefObject<HTMLDivElement>,
  close: CloseCallback
): DropdownEventContextAPI => ({
  onItemClick: useItemClickHandler(close),
  onItemKeyDown: useItemKeyDownHandler(contentRef, close),
  onContentKeyDown: useContentKeyDownHandler(close)
});

export default createContext<DropdownEventContextAPI | null>(null);
