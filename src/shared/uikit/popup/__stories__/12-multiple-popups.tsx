/** @jsx jsx */
// noinspection ES6UnusedImports
import { jsx } from '@emotion/react';
import { actions as storybookActions } from '@storybook/addon-actions';
import { FC, useCallback, useState } from 'react';
import Button from '../../button';
import Popup from '../index';

const actions = storybookActions<'onClick' | 'onClose'>('onClick', 'onClose');

const contentCSS = {
  margin: '1rem'
};

type PopupExampleProps = {
  name: string;
};

const PopupExample: FC<PopupExampleProps> = ({ name }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClick = useCallback(() => {
    actions.onClick(name);
    setIsOpen(!isOpen);
  }, [isOpen, name, setIsOpen]);

  const onClose = useCallback(() => {
    actions.onClose(name);
    setIsOpen(false);
  }, [name, setIsOpen]);

  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      content={() => <div css={contentCSS}>content</div>}
      trigger={triggerProps => (
        <Button {...triggerProps} onClick={onClick}>
          {isOpen ? 'Close' : 'Open'} {name} popup
        </Button>
      )}
      placement='bottom-start'
    />
  );
};

const containerCSS = {
  display: 'flex'
};

const MultiplePopups: FC = () => (
  <div css={containerCSS}>
    <PopupExample name='foo' />
    <PopupExample name='bar' />
    <PopupExample name='baz' />
  </div>
);

export default MultiplePopups;
