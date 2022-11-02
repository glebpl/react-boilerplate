/** @jsx jsx */
// noinspection ES6UnusedImports
import { jsx } from '@emotion/react';
import styled from '@emotion/styled';
import { CSSProperties, FC, useState } from 'react';
import Button from '../../button';
import { Placement } from '../../popper';
import { EmotionThemeProps, gridSize, palette } from '../../theme';
import Tooltip from '../../tooltip';
import Popup, { PopupProps } from '../index';

const sizedContentCSS = {
  alignItems: 'center',
  height: '80px',
  overflow: 'auto',
  padding: '30px',
  textAlign: 'center',
  verticalAlign: 'center'
} as const;

type PopupContentProps = {
  setPosition(): void;
  placement: string;
};

const Page = styled.div`
  display: flex;
  flex-flow: column nowrap;
  height: 100vh;
  margin: -${gridSize() * 2}px;
`;

const Header = styled.header<EmotionThemeProps>`
  flex-grow: 0;
  height: ${gridSize() * 6}px;
  background-color: ${palette.n40};
`;

const Main = styled.main<EmotionThemeProps>`
  flex-grow: 1;
  background-color: ${palette.n20};
`;

const Footer = styled.footer<EmotionThemeProps>`
  display: block;
  position: relative;
  flex-grow: 0;
  height: ${gridSize() * 6}px;
  background-color: ${palette.n40};
`;

const PopupContent: FC<PopupContentProps> = ({ setPosition, placement }) => (
  <div id='popup-content' css={sizedContentCSS}>
    <Tooltip
      fallbackPlacements={['top']}
      position='right'
      content={'Tooltip for button inside popup may be very long but user will be glad to see it all'}
    >
      <Button testId='popup-position' onClick={() => setPosition()}>
        Toggle Position
      </Button>
    </Tooltip>
    <p>
      Current placement: <strong>{placement}</strong>
    </p>
    <hr />
    <p>Scroll down.</p>
    <Button>Button 5</Button>
    <Button>Button 6</Button>
  </div>
);

const placements: Placement[] = [
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

interface Props {
  style: CSSProperties;
  popupProps: Partial<PopupProps> & Pick<PopupProps, 'content'>;
}

const Example: FC<Props> = props => {
  const { style, popupProps } = props;
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div style={style}>
      <Popup
        {...popupProps}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        trigger={triggerProps => (
          <Button appearance='primary' id='popup-trigger' {...triggerProps} onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? 'Close' : 'Open'} Popup
          </Button>
        )}
      />
    </div>
  );
};

const Basic: React.FC = () => {
  const [idx, setIdx] = useState(0);

  const placement = placements[idx];

  const setPlacement = () => {
    if (idx !== placements.length - 1) {
      setIdx(idx + 1);
    } else {
      setIdx(0);
    }
  };

  return (
    <Page>
      <Header>
        <Example
          style={{
            position: 'absolute',
            left: `${gridSize()}px`,
            top: `${gridSize()}px`
          }}
          popupProps={{
            id: 'popup-id-1',
            content: () => (
              <div id='popup-content' style={{ padding: '40px' }}>
                Popup
              </div>
            ),
            placement: 'bottom-start'
          }}
        />
      </Header>
      <Main>
        <Example
          style={{
            position: 'absolute',
            left: '40%',
            top: '40%'
          }}
          popupProps={{
            content: () => <PopupContent setPosition={setPlacement} placement={placement} />,
            placement
          }}
        />
      </Main>
      <Footer>
        <Example
          style={{
            float: 'right'
          }}
          popupProps={{
            content: () => (
              <div id='popup-content' style={{ padding: '40px' }}>
                Popup from footer
              </div>
            ),
            placement: 'top-end'
          }}
        />
      </Footer>
    </Page>
  );
};

export default Basic;
