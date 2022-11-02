import styled from '@emotion/styled';
import * as React from 'react';
import Lorem from 'react-lorem-ipsum';
import Button from '../../button';
import { borderRadius, EmotionThemeProps, shadows } from '../../theme';
import { Manager, Popper, Reference } from '../index';

interface PopupProps extends EmotionThemeProps {
  isReferenceHidden: boolean | undefined;
}

const Popup = styled.div<PopupProps>`
  background: white;
  border: 2px solid red;
  border-radius: ${borderRadius}px;
  max-width: 160px;
  padding: 8px;
  transition: opacity 200ms ease-in-out;
  opacity: ${p => (p.isReferenceHidden ? 0 : 1)};
  box-shadow: ${shadows.e500};
`;

const BasicPopper = () => (
  <Manager>
    <Reference>
      {({ ref }) => (
        <Button appearance='primary' ref={ref}>
          Reference element
        </Button>
      )}
    </Reference>
    <Popper>
      {({ ref, style, placement, isReferenceHidden }) => (
        <Popup
          isReferenceHidden={isReferenceHidden}
          // innerRef can't be null so shortcircuit to undefined if it is.
          ref={ref || undefined}
          style={style}
          data-placement={placement}
        >
          <h3>New Popper</h3>
          <Lorem p={1} />
        </Popup>
      )}
    </Popper>
  </Manager>
);

const ScrollParent: React.FC = () => (
  <div
    style={{
      border: '1px solid black',
      maxHeight: '400px',
      maxWidth: '800px',
      marginTop: '20px',
      overflow: 'auto'
    }}
  >
    <div
      style={{
        width: '300%',
        height: '250%',
        boxSizing: 'border-box',
        padding: '16px'
      }}
    >
      <b>Scroll across and down ↘️ to see the popper</b>
      <br />
      <br />
      <Lorem p={10} />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <BasicPopper />
      </div>
      <Lorem p={10} />
    </div>
  </div>
);

export default ScrollParent;
