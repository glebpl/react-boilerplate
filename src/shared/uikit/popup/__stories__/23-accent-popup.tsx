/** @jsx jsx */
// noinspection ES6UnusedImports
import { jsx } from '@emotion/react';
import styled from '@emotion/styled';
import { actions as storybookActions } from '@storybook/addon-actions';
import * as faker from 'faker';
import * as React from 'react';
import { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Button from '../../button';
import { palette, EmotionThemeProps, gridSize } from '../../theme';
import { useForkRef } from '../../utils/hooks';
import Accented, { useAccentManager } from '../Accented';
import { AccentPopup, BasePlacement, TriggerProps } from '../index';
import Popup from '../Popup';

const actions = storybookActions('showAccent', 'onAccentClose');

const Page = styled.div`
  display: flex;
  flex-flow: column nowrap;
  height: 100vh;
  margin: -${gridSize() * 2}px;
`;

const Main = styled.main<EmotionThemeProps>`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: ${palette.n0};
`;

const Col = styled.div`
  flex-grow: 1;
  height: 100%;
  box-sizing: border-box;
  padding: ${gridSize()}px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: space-between;
`;

const MainPopupContent = styled.div`
  max-width: 300px;
  padding: ${gridSize() * 2}px ${gridSize() * 2.5}px;
`;

const placements: BasePlacement[] = ['bottom', 'left', 'top', 'right'];

const useText = () => useMemo(() => faker.lorem.sentence(faker.datatype.number({ min: 10, max: 20 })), []);

const Simple: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [idx, setIdx] = useState(0);

  const setPlacement = () => {
    setIdx(idx + 1);
  };

  const text = useText();

  return (
    <AccentPopup
      action={{
        text: 'Got it!',
        onClick: e => {
          setIsOpen(false);
        }
      }}
      content={<div onClick={setPlacement}>{text}</div>}
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      placement={placements[idx % placements.length]}
      trigger={triggerProps => (
        <Button onClick={() => setIsOpen(true)} {...triggerProps}>
          Just Accent
        </Button>
      )}
    />
  );
};

interface ComplexProps {
  id: string;
}

const Custom: React.FC<ComplexProps> = props => {
  const [isMainOpen, setIsMainOpen] = useState(false);
  const shouldShowAccentRef = useRef(true);
  const [isAccentOpen, setIsAccentOpen] = useState(false);
  const mainText = useText();
  const accentText = "Accent is shown if user doesn't click on Button during 2sec";

  useEffect(() => {
    if (isMainOpen) shouldShowAccentRef.current = false;
  }, [isMainOpen]);

  useEffect(() => {
    setTimeout(() => {
      if (shouldShowAccentRef.current) {
        actions.showAccent(props.id);
        setIsAccentOpen(true);
      }
    }, 2000);
  }, []);

  const trigger = useCallback(
    triggerProps => (
      <Button
        onClick={() => {
          isAccentOpen && setIsAccentOpen(false);
          setIsMainOpen(true);
        }}
        {...triggerProps}
      >
        Real popup with accent
      </Button>
    ),
    [isAccentOpen]
  );

  return isAccentOpen ? (
    <AccentPopup
      action={{
        text: 'Got it!',
        onClick: e => {
          setIsAccentOpen(false);
        }
      }}
      content={accentText}
      isOpen={isAccentOpen}
      onClose={() => setIsAccentOpen(false)}
      placement={'bottom'}
      trigger={trigger}
    />
  ) : (
    <Popup
      content={contentProps => <MainPopupContent {...contentProps}>{mainText}</MainPopupContent>}
      isOpen={isMainOpen}
      onClose={() => setIsMainOpen(false)}
      trigger={trigger}
    />
  );
};

const AccentedButton = forwardRef<HTMLButtonElement, JSX.IntrinsicElements['button'] & TriggerProps<HTMLButtonElement>>(
  (props, ref) => {
    const accentedElementRef = useRef<HTMLButtonElement | null>(null);
    const accentCondition = useCallback(
      () =>
        new Promise<boolean>(resolve => {
          setTimeout(() => {
            resolve(true);
          }, 2000);
        }),
      []
    );
    const accentManager = useAccentManager(accentCondition);
    const accentText = "Accent is shown if user doesn't click on Button during 2sec";

    const handleAccentClose = useCallback(() => {
      if (accentManager.isOpen()) {
        actions.onAccentClose();
      }
      accentManager.close();
    }, [accentManager]);

    const handleClick = useCallback(
      e => {
        handleAccentClose();
        props.onClick && props.onClick(e);
      },
      [handleAccentClose, props.onClick]
    );

    const buttonRef = useForkRef<HTMLButtonElement | null>(ref, accentedElementRef);

    const accentActions = useMemo(
      () => [
        {
          text: 'Wow!',
          onClick: handleAccentClose
        }
      ],
      [handleAccentClose]
    );

    return (
      <Accented
        accentActions={accentActions}
        accentContent={accentText}
        accentedElement={accentManager.isOpen() ? accentedElementRef.current : null}
      >
        <Button {...props} onClick={handleClick} ref={buttonRef} />
      </Accented>
    );
  }
);

const AccentedExample: React.FC = () => {
  const [isMainOpen, setIsMainOpen] = useState(false);
  const mainText = useText();

  return (
    <Popup
      content={contentProps => <MainPopupContent {...contentProps}>{mainText}</MainPopupContent>}
      isOpen={isMainOpen}
      onClose={() => setIsMainOpen(false)}
      trigger={(triggerProps: TriggerProps<HTMLButtonElement>) => (
        <AccentedButton {...triggerProps} onClick={() => setIsMainOpen(true)}>
          Real popup with Accented button
        </AccentedButton>
      )}
    />
  );
};

const AccentPopupStory: React.FC = () => (
  <Page>
    <Main>
      <Col>
        <Custom id='1' />
        <AccentedExample />
        <Simple />
      </Col>
      <Col>
        <Simple />
        <Simple />
        <Custom id='2' />
      </Col>
    </Main>
  </Page>
);

export default AccentPopupStory;
