/** @jsx jsx */
// noinspection ES6UnusedImports
import { jsx } from '@emotion/react';
import * as React from 'react';
import { ReactElement } from 'react';
import { gridSize } from '../theme';
import { Appearance } from './types';

export type ButtonGroupProps = {
  /** The appearance to apply to all buttons. */
  appearance?: Appearance;
  children?: React.ReactNode;
};

export const groupItemStyles = {
  flex: '1 0 auto',
  display: 'flex',

  /* margins don't flip when the layout uses dir="rtl", whereas pseudos do */
  '& + &::before': {
    content: `''`,
    display: 'inline-block',
    width: `${gridSize() / 2}px`
  }
};

// TODO: Fix this the next time the file is edited.
// eslint-disable-next-line @typescript-eslint/naming-convention
export default function ButtonGroup({ appearance, children }: ButtonGroupProps): ReactElement {
  return (
    <div css={{ display: 'inline-flex' }}>
      {React.Children.map(children, (child, idx) => {
        if (!child) {
          return null;
        }
        return (
          <div key={idx} css={groupItemStyles}>
            {appearance ? React.cloneElement(child as JSX.Element, { appearance }) : child}
          </div>
        );
      })}
    </div>
  );
}
