/** @jsx jsx */
// noinspection ES6UnusedImports
import { jsx } from '@emotion/react';
import { FC, useState } from 'react';
import Button from '../../button';
import { RadioGroup } from '../../radio';
import Popup from '../index';

const radioValues = [
  { name: 'None', value: '-1', label: 'None' },
  { name: 'Button 0', value: '0', label: 'Button 0' },
  { name: 'Button 1', value: '1', label: 'Button 1' },
  { name: 'Button 2', value: '2', label: 'Button 2' }
];

const spacerCSS = {
  margin: '20px'
};

const sizedContentCSS = {
  alignItems: 'center',
  padding: '30px',
  textAlign: 'center',
  verticalAlign: 'center'
} as const;

type PopupProps = {
  buttonToFocus?: string;
  setInitialFocusRef?: any;
};

const PopupContent: FC<PopupProps> = ({ buttonToFocus, setInitialFocusRef }) => {
  const getRef = (index: number) => {
    if (buttonToFocus && setInitialFocusRef && parseInt(buttonToFocus, 10) === index) {
      return (ref: HTMLElement) => {
        setInitialFocusRef(ref);
      };
    }
  };

  return (
    <div css={sizedContentCSS}>
      {/* TODO: Fix this the next time the file is edited. */}
      {/* eslint-disable-next-line @typescript-eslint/naming-convention */}
      {Array.from({ length: 3 }, (_, index) => (
        <Button key={index} ref={getRef(index)}>
          Button {index}
        </Button>
      ))}
    </div>
  );
};

const SettingFocus: FC = () => {
  const [isOpen, setIsOpen] = useState<string>('');
  const [buttonToFocus, setButtonToFocus] = useState('-1');

  return (
    <div css={spacerCSS}>
      <Popup
        autoFocus={true}
        isOpen={isOpen === 'autoFocus'}
        onClose={() => setIsOpen('')}
        content={() => <PopupContent />}
        trigger={({ ...triggerProps }) => (
          <Button {...triggerProps} onClick={() => setIsOpen(isOpen === 'autoFocus' ? '' : 'autoFocus')}>
            {isOpen ? 'Close' : 'Open'} popup with autoFocus=true
          </Button>
        )}
        placement='right'
      />
      <p>
        <strong>Choose a button to focus initially:</strong>
      </p>
      <RadioGroup
        onChange={({ currentTarget: { value } }) => setButtonToFocus(value)}
        defaultValue={radioValues[0].value}
        options={radioValues}
      />
      <Popup
        autoFocus={false}
        isOpen={isOpen === 'forcedFocus'}
        onClose={() => setIsOpen('')}
        content={({ setInitialFocusRef }) => (
          <PopupContent buttonToFocus={buttonToFocus} setInitialFocusRef={setInitialFocusRef} />
        )}
        trigger={({ ...triggerProps }) => (
          <Button {...triggerProps} onClick={() => setIsOpen(isOpen === 'forcedFocus' ? '' : 'forcedFocus')}>
            {isOpen === 'forcedFocus' ? 'Close' : 'Open'} Popup
          </Button>
        )}
        placement='right'
      />
      <div
        css={{
          marginTop: '20px'
        }}
      >
        <Button>Another button on a page</Button>
      </div>
    </div>
  );
};

export default SettingFocus;
