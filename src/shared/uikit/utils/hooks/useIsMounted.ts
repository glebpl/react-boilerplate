import { useCallback, useEffect, useRef } from 'react';

export function useIsMounted(): { ifMounted: (callback: () => void) => void; isMounted: () => boolean } {
  const isMountedRef = useRef<boolean>(false);
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const ifMounted = useCallback((callback: () => void): void => {
    if (isMountedRef.current) {
      callback();
    }
  }, []);

  const isMounted = useCallback(() => isMountedRef.current, []);

  return { isMounted, ifMounted };
}
