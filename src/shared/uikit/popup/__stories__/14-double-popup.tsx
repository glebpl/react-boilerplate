/** @jsx jsx */
// noinspection ES6UnusedImports
import { jsx } from '@emotion/react';
import { FC, Fragment, useState } from 'react';
import Button from '../../button';
import Popup from '../index';

const spacerCSS = {
  margin: '250px'
};

const sizedContentCSS = {
  alignItems: 'center',
  padding: '10px',
  textAlign: 'center',
  verticalAlign: 'center'
} as const;

const OtherItems: FC = () => (
  <Fragment>
    <div>Item</div>
    <div>Item</div>
    <div>Item</div>
    <div>Item</div>
    <div>Item</div>
  </Fragment>
);

const PopupContent: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div id='popup-content' css={sizedContentCSS}>
      <Popup
        isOpen={isOpen}
        placement='right-start'
        onClose={() => setIsOpen(false)}
        content={() => (
          <div id='popup-content-2' css={sizedContentCSS}>
            <div>A second pop-up</div>
            <OtherItems />
          </div>
        )}
        offset={[0, 12]}
        trigger={triggerProps => (
          <a
            id='popup-trigger'
            {...triggerProps}
            ref={triggerProps.ref as React.Ref<HTMLAnchorElement>}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? 'Close' : 'Open'} Popup
          </a>
        )}
      />
      <OtherItems />
    </div>
  );
};

export default () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div css={spacerCSS}>
      <Popup
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        content={() => <PopupContent />}
        trigger={triggerProps => (
          <Button id='popup-trigger' {...triggerProps} onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? 'Close' : 'Open'} Popup
          </Button>
        )}
        placement={'bottom-start'}
      />
    </div>
  );
};
