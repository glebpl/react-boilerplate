import { actions as storybookActions } from '@storybook/addon-actions';
import * as React from 'react';
import { useState } from 'react';
import Button from '../../button';
import { ExampleDropdown } from './ExampleDropdown';

const actions = storybookActions(
  'onOpen',
  'onClose',
  'afterOpen',
  'parentRendered',
  'Open button clicked',
  'Close button clicked'
);

// TODO: Fix this the next time the file is edited.
// eslint-disable-next-line @typescript-eslint/naming-convention
function ButtonsOnly() {
  const [isOpen, setIsOpen] = useState(false);

  const onOpenClick = () => {
    actions['Open button clicked']();
    setIsOpen(true);
  };

  const onCloseClick = () => {
    actions['Close button clicked']();
    setIsOpen(false);
  };

  actions.parentRendered(`isOpen: ${isOpen}`);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <span>Controlled only by buttons</span>
      <div style={{ display: 'flex', gap: '10px' }}>
        <Button onClick={onOpenClick}>Open</Button>
        <Button onClick={onCloseClick}>Close</Button>
        <ExampleDropdown isOpen={isOpen} {...actions} />
      </div>
    </div>
  );
}

// TODO: Fix this the next time the file is edited.
// eslint-disable-next-line @typescript-eslint/naming-convention
function CallbacksOnly() {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = (...args: unknown[]) => {
    actions.onOpen(...args);
    setIsOpen(true);
  };

  const onClose = (...args: unknown[]) => {
    actions.onClose(...args);
    setIsOpen(false);
  };

  actions.parentRendered(`isOpen: ${isOpen}`);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <span>Controlled, but onClose and onOpen change isOpen</span>
      <div style={{ display: 'flex', gap: '10px' }}>
        <ExampleDropdown isOpen={isOpen} {...actions} onClose={onClose} onOpen={onOpen} />
      </div>
    </div>
  );
}

// TODO: Fix this the next time the file is edited.
// eslint-disable-next-line @typescript-eslint/naming-convention
function ButtonsAndCallbacks() {
  const [isOpen, setIsOpen] = useState(false);

  const onOpenClick = () => {
    actions['Open button clicked']();
    setIsOpen(true);
  };

  const onCloseClick = () => {
    actions['Close button clicked']();
    setIsOpen(false);
  };

  const onOpen = (...args: unknown[]) => {
    actions.onOpen(...args);
    setIsOpen(true);
  };

  const onClose = (...args: unknown[]) => {
    actions.onClose(...args);
    setIsOpen(false);
  };

  actions.parentRendered(`isOpen: ${isOpen}`);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <span>Controlled both by buttons and callbacks</span>
      <div style={{ display: 'flex', gap: '10px' }}>
        <Button onClick={onOpenClick}>Open</Button>
        <Button onClick={onCloseClick}>Close</Button>
        <ExampleDropdown isOpen={isOpen} {...actions} onClose={onClose} onOpen={onOpen} />
      </div>
    </div>
  );
}

// TODO: Fix this the next time the file is edited.
// eslint-disable-next-line @typescript-eslint/naming-convention
function Uncontrolled() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '500px' }}>
      <span>Uncontrolled, but defaultIsOpen is true</span>
      <ExampleDropdown defaultIsOpen={true} {...actions} />
    </div>
  );
}

// TODO: Fix this the next time the file is edited.
// eslint-disable-next-line @typescript-eslint/naming-convention
export default function DropdownControlled() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
      <ButtonsOnly />
      <CallbacksOnly />
      <ButtonsAndCallbacks />
      <Uncontrolled />
    </div>
  );
}
