/** @jsx jsx */
// noinspection ES6UnusedImports
import { jsx } from '@emotion/react';
import { FC, useEffect, useState } from 'react';
import Button from '../../button';
import { Placement } from '../../popper';
import Popup from '../index';

type PopupProps = {
  loading: boolean;
  setPosition(): void;
  position: string;
  update?(): void;
  setButtonWidth: any;
  buttonWidth: number;
};

const containerCSS = {
  margin: '250px'
};

const loadingCSS = {
  textAlign: 'center',
  padding: '30px'
} as const;

const contentCSS = {
  alignItems: 'center',
  textAlign: 'center',
  verticalAlign: 'center',
  padding: '30px',
  maxWidth: '300px'
} as const;

const expanderCSS = ({ width }: { width: number }) => ({
  display: 'inline-block',
  width: width ? `${width}px` : 0
});

const PopupContent: FC<PopupProps> = ({ loading, setPosition, position, setButtonWidth, buttonWidth, update }) => {
  const [content, setContent] = useState(
    'Lorem Ipsum dolor sit amet. Lorem Ipsum dolor sit amet. Lorem Ipsum dolor sit amet. '
  );
  const addContent = () => {
    setContent(`${content}Lorem Ipsum dolor sit amet. `);

    // Reposition the popup
    typeof update === 'function' && update();
  };

  const clearContent = () => {
    setContent('');

    // Reposition the popup
    typeof update === 'function' && update();
  };

  return loading ? (
    <div id='spinner' css={loadingCSS}>
      Loading...
    </div>
  ) : (
    <div id='popup-content' css={contentCSS}>
      <Button onClick={() => setPosition()}>Toggle Position</Button>
      <p>
        Current position: <strong>{position}</strong>
      </p>
      <hr />
      {/* TODO: Fix this the next time the file is edited. */}
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-return */}
      <Button onClick={() => setButtonWidth(buttonWidth + 15)}>Expand Button</Button>
      {/* TODO: Fix this the next time the file is edited. */}
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-return */}
      <Button onClick={() => setButtonWidth(0)}>Reset Button</Button>
      <hr />
      <Button onClick={addContent}>Add Content</Button>
      <Button onClick={clearContent}>Clear Content</Button>
      <br />
      {content}
    </div>
  );
};

const positions: Placement[] = [
  'bottom-start',
  'bottom',
  'bottom-end',
  'top-start',
  'top',
  'top-end',
  'right-start',
  'right',
  'right-end',
  'left-start',
  'left',
  'left-end',
  'auto-start',
  'auto',
  'auto-end'
];

const AsyncPopup: FC = () => {
  const [idx, setIdx] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [buttonWidth, setButtonWidth] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    if (isOpen) {
      window.setTimeout(() => setIsLoaded(true), 600);
    } else {
      setIsLoaded(false);
    }
  }, [isOpen]);
  const position = positions[idx];

  const setPosition = () => {
    if (idx !== positions.length - 1) {
      setIdx(idx + 1);
    } else {
      setIdx(0);
    }
  };

  return (
    <div css={containerCSS}>
      <Popup
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        offset={[0, 20]}
        content={({ update }) => (
          <PopupContent
            loading={!isLoaded}
            setPosition={setPosition}
            position={position}
            setButtonWidth={setButtonWidth}
            buttonWidth={buttonWidth}
            update={update}
          />
        )}
        trigger={triggerProps => (
          <Button id='popup-trigger' {...triggerProps} onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? 'Close' : 'Open'} Popup <div css={expanderCSS({ width: buttonWidth })} />
          </Button>
        )}
        placement={position}
        shouldFlip={true}
      />
    </div>
  );
};

export default AsyncPopup;
