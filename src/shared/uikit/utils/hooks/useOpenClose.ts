import { useCallback, useEffect, useMemo, useState } from 'react';

export interface UseOpenCloseProps<OpenArgs extends unknown[], CloseArgs extends unknown[]> {
  onOpen?: (...args: OpenArgs) => void;
  onClose?: (...args: CloseArgs) => void;
  isOpen?: boolean;
  defaultIsOpen?: boolean;
}

export interface UseOpenCloseReturnValue<OpenArgs extends unknown[], CloseArgs extends unknown[]> {
  open: (...args: OpenArgs) => void;
  close: (...args: CloseArgs) => void;
  isOpen: boolean;
}

export function useOpenClose<OpenArgs extends unknown[], CloseArgs extends unknown[]>(
  opts?: UseOpenCloseProps<OpenArgs, CloseArgs>
): UseOpenCloseReturnValue<OpenArgs, CloseArgs> {
  const { isOpen: outerIsOpen, onClose, onOpen, defaultIsOpen = false } = opts || {};
  const [isOpen, setIsOpen] = useState(typeof outerIsOpen === 'undefined' ? defaultIsOpen : outerIsOpen);
  const [initialMode] = useState(typeof outerIsOpen);

  useEffect(() => {
    if (initialMode !== typeof outerIsOpen) {
      throw new TypeError('You should never switch between controlled and uncontrolled modes');
    }
  });

  const isControlled = typeof outerIsOpen !== 'undefined';

  const open = useCallback(
    (...args: OpenArgs) => {
      if (isOpen) return;
      onOpen && onOpen(...args);
      !isControlled && setIsOpen(true);
    },
    [onOpen, isOpen, isControlled]
  );

  const close = useCallback(
    (...args: CloseArgs) => {
      if (!isOpen) return;
      onClose && onClose(...args);
      !isControlled && setIsOpen(false);
    },
    [onClose, isOpen, isControlled]
  );

  useEffect(() => {
    if (typeof outerIsOpen !== 'undefined' && outerIsOpen !== isOpen) {
      setIsOpen(outerIsOpen);
    }
  }, [outerIsOpen, isOpen]);

  return {
    open,
    close,
    isOpen
  };
}
