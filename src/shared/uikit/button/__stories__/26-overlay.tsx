/** @jsx jsx */
// noinspection ES6UnusedImports
import { jsx } from '@emotion/react';
import { useState, ReactElement } from 'react';
import { gridSize } from '../../theme';
import Button, { ButtonGroup } from '../index';

// TODO: Fix this the next time the file is edited.
// eslint-disable-next-line @typescript-eslint/naming-convention
export default function Overlay2(): ReactElement {
  const [overlay, setOverlay] = useState<string | undefined>(undefined);
  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '> *': { marginBottom: gridSize() }
      }}
    >
      <Button onClick={() => setOverlay(value => (value ? undefined : '🤩'))}>
        Use overlay: {overlay ? 'true' : 'false'}
      </Button>
      <div>
        <ButtonGroup>
          <Button overlay={overlay}>{'<button>'}</Button>
          <Button overlay={overlay} href='#'>
            {'<a>'}
          </Button>
          <Button overlay={overlay} component='span'>
            {'<span>'}
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}
