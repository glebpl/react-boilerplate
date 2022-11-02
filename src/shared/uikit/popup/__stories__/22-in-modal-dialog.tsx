/** @jsx jsx */
// noinspection ES6UnusedImports
import { jsx } from '@emotion/react';
import styled from '@emotion/styled';
import * as React from 'react';
import { FC, ReactElement, useState } from 'react';
import Button from '../../button';
import { ModalTransition } from '../../modal-dialog';
import Modal from '../../modal-dialog/components/ModalWrapper';
import { gridSize, layers } from '../../theme';
import Popup from '../index';

interface ModalStoryProps {
  modal: ReactElement;
}

interface PopupContentProps {
  buttonToFocus: number | undefined;
  setInitialFocusRef: any;
}

const sizedContentCSS = {
  alignItems: 'center',
  padding: '30px',
  textAlign: 'center',
  verticalAlign: 'center'
} as const;

const Row = styled.div<{ justifyContent?: string }>`
  display: flex;
  align-items: center;
  justify-content: ${({ justifyContent = 'flex-start' }) => justifyContent};
  margin: 0 ${-gridSize()}px;
  & + & {
    margin-top: ${gridSize()}px;
  }
`;

const Span = styled.div`
  display: block;
  padding: 0 ${gridSize()}px;
`;

const PopupContent: FC<PopupContentProps> = ({ buttonToFocus, setInitialFocusRef }) => {
  const getRef = (index: number) => {
    if (buttonToFocus !== undefined && buttonToFocus === index) {
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

const ModalStory: React.FC<ModalStoryProps> = ({ modal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const open = (): void => setIsOpen(true);
  const close = (): void => setIsOpen(false);
  return (
    <div>
      <Button onClick={open}>Open Modal</Button>
      <ModalTransition>
        {isOpen &&
          React.cloneElement(modal, {
            onClose: close,
            shouldCloseOnOverlayClick: true
          })}
      </ModalTransition>
    </div>
  );
};

interface ExamplePopupProps {
  autoFocus?: boolean;
  buttonToFocus?: number;
  lockFocus?: boolean;
  trigger?: string;
}

const ExamplePopup: FC<ExamplePopupProps> = props => {
  const { autoFocus = true, buttonToFocus, lockFocus = true, trigger } = props;
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Popup
      autoFocus={autoFocus}
      lockFocus={lockFocus}
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      content={({ setInitialFocusRef }) => (
        <PopupContent buttonToFocus={buttonToFocus} setInitialFocusRef={setInitialFocusRef} />
      )}
      trigger={triggerProps => (
        <Button {...triggerProps} onClick={() => setIsOpen(!isOpen)}>
          {trigger || (isOpen ? 'Close popup' : 'Open popup')}
        </Button>
      )}
      placement='bottom-start'
      zIndex={layers.modal() + 1}
    />
  );
};

const PopupInModal: FC = () => (
  <ModalStory
    modal={
      <Modal heading='Modal Title'>
        <Row justifyContent='space-between'>
          <Span>
            <ExamplePopup trigger={'With focusLock and autoFocus'} />
          </Span>
          <Span>
            <ExamplePopup autoFocus={false} buttonToFocus={1} trigger={'Should focus on second button'} />
          </Span>
        </Row>
        <Row justifyContent='space-between'>
          <Span>
            <ExamplePopup autoFocus={false} trigger={'With no autoFocus'} />
          </Span>
          <Span>
            <ExamplePopup lockFocus={false} trigger={'With no focusLock'} />
          </Span>
        </Row>
      </Modal>
    }
  />
);

export default PopupInModal;
