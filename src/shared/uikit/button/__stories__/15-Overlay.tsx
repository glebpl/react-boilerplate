import * as React from 'react';
import { useState, ReactElement } from 'react';
import { Checkbox } from '../../checkbox';
import Button from '../index';

// TODO: Fix this the next time the file is edited.
// eslint-disable-next-line @typescript-eslint/naming-convention
export default function Overlay(): ReactElement {
  const [showOverlay, setShowOverlay] = useState<boolean>(false);

  return (
    <>
      <Checkbox label='Show overlay' onChange={() => setShowOverlay(value => !value)} name='show-loading' />
      <Button overlay={showOverlay ? <span>🤪</span> : null}>Hello</Button>
    </>
  );
}
