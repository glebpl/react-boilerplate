/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { actions as storybookActions } from '@storybook/addon-actions';
import { useState, ReactElement } from 'react';
import { gridSize } from '../../theme';
import Button, { ButtonGroup } from '../index';

const actions = storybookActions(
  'onMouseDown',
  'onMouseUp',
  'onMouseEnter',
  'onMouseLeave',
  'onPointerEnter',
  'onPointerLeave',
  'onPointerDown',
  'onPointerUp',
  'onTouchStart',
  'onTouchEnd',
  'onClick'
);

// TODO: Fix this the next time the file is edited.
// eslint-disable-next-line @typescript-eslint/naming-convention
export default function Disabled(): ReactElement {
  const [isDisabled, setIsDisabled] = useState(false);

  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '> *': { marginBottom: gridSize() }
      }}
    >
      <Button onClick={() => setIsDisabled(value => !value)}>Disabled: {isDisabled ? 'true' : 'false'}</Button>
      <div>
        <ButtonGroup>
          <Button isDisabled={isDisabled} {...actions}>
            {'<button>'}
          </Button>
          <Button isDisabled={isDisabled} href="#" {...actions}>
            {'<a>'}
          </Button>
          <Button isDisabled={isDisabled} component="span" {...actions}>
            {'<span>'}
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}
