import styled from '@emotion/styled';
import * as React from 'react';
import { ReactElement, useState } from 'react';
import Lorem from 'react-lorem-ipsum';
import Button from '../../button';
import { MoreIcon } from '../../icon/glyph';
import { ModalTransition } from '../../modal-dialog';
import Modal from '../../modal-dialog/components/ModalWrapper';
import { gridSize } from '../../theme';
import { ExampleDropdown } from './ExampleDropdown';

interface ModalStoryProps {
  modal: ReactElement;
}

const ModalStory: React.FC<ModalStoryProps> = ({ modal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const open = (): void => setIsOpen(true);
  const close = (): void => setIsOpen(false);
  return (
    <div>
      <Row>
        <Span>
          <Button onClick={open}>Open Modal</Button>
        </Span>
        <Span>
          <ExampleDropdown
            items={[
              {
                text: 'Open modal from dropdown item',
                onClick: () => open()
              }
            ]}
            tooltip={'Here is tooltip'}
            trigger={'Dropdown on the page'}
          />
        </Span>
      </Row>

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

const Row = styled.div<{ justifyContent?: string }>`
  display: flex;
  align-items: center;
  justify-content: ${({ justifyContent = 'flex-start' }) => justifyContent};
  margin: 0 ${-gridSize()}px;
`;

const Span = styled.div`
  display: block;
  padding: 0 ${gridSize()}px;
`;

const DropdownInModal: React.FC = () => (
  <ModalStory
    modal={
      <Modal heading='Modal Title'>
        <Row justifyContent='space-between'>
          <Span>
            <ExampleDropdown numberOfItems={5} tooltip={'Here is tooltip'} />
          </Span>
          <Span>
            <ExampleDropdown
              numberOfItems={5}
              trigger={null}
              triggerButtonProps={{
                iconAfter: <MoreIcon />
              }}
              tooltip={'Only icon in button'}
            />
          </Span>
          <Span>
            <ExampleDropdown numberOfItems={5} placement={'bottom-end'} />
          </Span>
        </Row>
        <Lorem p={2} />
        <Lorem p={2} />
        <Row justifyContent='space-between'>
          <Span>
            <ExampleDropdown numberOfItems={5} tooltip={'Here is tooltip'} />
          </Span>
          <Span>
            <ExampleDropdown
              numberOfItems={5}
              trigger={null}
              triggerButtonProps={{
                iconAfter: <MoreIcon />
              }}
              tooltip={'Only icon in button'}
            />
          </Span>
          <Span>
            <ExampleDropdown numberOfItems={5} placement={'bottom-end'} />
          </Span>
        </Row>
        <Lorem p={2} />
      </Modal>
    }
  />
);

export default DropdownInModal;
