import * as React from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import AccentPopup from './AccentPopup';
import { AccentedProps, AccentManager } from './types';

export const useAccentManager = (condition: () => Promise<boolean>): AccentManager => {
  const enabledRef = useRef(true);
  const [isAccentOpen, setIsAccentOpen] = useState(false);

  useEffect(() => {
    if (enabledRef.current) {
      void condition().then(shouldShow => {
        if (shouldShow && enabledRef.current) {
          setIsAccentOpen(true);
        }
      });
    }
    return () => {
      // this also prevents state change if component is unmounted
      enabledRef.current = false;
    };
  }, [condition]);

  return useMemo(
    () => ({
      isOpen() {
        return isAccentOpen;
      },
      close() {
        enabledRef.current = false;
        setIsAccentOpen(false);
      }
    }),
    [isAccentOpen]
  );
};

/**
 * AccentPopup produced by Accented now may be closed only by click on action button
 * So we can not lock focus in it, otherwise user will have no possibility to focus inputs in documents
 */
const Accented: React.FC<AccentedProps> = props => {
  const { accentActions, accentContent, accentTitle, children, lockFocus = false, accentedElement } = props;

  return (
    <>
      {children}
      {accentedElement ? (
        <AccentPopup
          actions={accentActions}
          content={accentContent}
          title={accentTitle}
          lockFocus={lockFocus}
          isOpen={true}
          referenceElement={accentedElement}
        />
      ) : null}
    </>
  );
};

export default Accented;
