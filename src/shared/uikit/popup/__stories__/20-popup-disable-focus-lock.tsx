/** @jsx jsx */
// noinspection ES6UnusedImports
import { jsx } from '@emotion/react';
import { FC, useEffect, useState } from 'react';
import Button, { ButtonGroup } from '../../button';
import Popup from '../index';

const spacerCSS = {
  margin: '250px'
};

const sizedContentCSS = {
  alignItems: 'center',
  height: '80px',
  overflow: 'auto',
  padding: '30px',
  textAlign: 'center',
  verticalAlign: 'center'
} as const;

const PopupContent: FC = () => (
  <div id='popup-content' css={sizedContentCSS}>
    <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum fugit aut reiciendis fuga praesentium illo rerum,
      libero, placeat deleniti inventore odit incidunt laborum qui nam voluptatum iusto voluptas sapiente magnam?
    </div>
    <div>
      <ButtonGroup>
        <Button>Not autofocused</Button>
        <Button>Second </Button>
      </ButtonGroup>
    </div>
  </div>
);

const DisableAutofocus: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const input = document.querySelector('input');
    input && input.focus();
  });

  return (
    <div id='container' css={spacerCSS}>
      <Popup
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        content={() => <PopupContent />}
        trigger={triggerProps => (
          <Button id='popup-trigger' {...triggerProps} onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? 'Close' : 'Open'} Popup
          </Button>
        )}
        placement='bottom'
        lockFocus={true}
        autoFocus={undefined}
      />
      <input autoFocus placeholder='This should keep focus' />
      <input placeholder='Next focusable' />
    </div>
  );
};

export default DisableAutofocus;
