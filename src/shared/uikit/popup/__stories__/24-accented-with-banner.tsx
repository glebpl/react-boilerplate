/** @jsx jsx */
// noinspection ES6UnusedImports
import { jsx } from '@emotion/react';
import styled from '@emotion/styled';
import { actions as storybookActions } from '@storybook/addon-actions';
import * as faker from 'faker';
import * as React from 'react';
import { forwardRef, useCallback, useMemo, useRef, useState } from 'react';
import Button from '../../button';
import { palette, EmotionThemeProps, gridSize } from '../../theme';
import { useForkRef } from '../../utils/hooks';
import Accented, { useAccentManager } from '../Accented';
import { AccentPopupAction, TriggerProps } from '../index';
import Popup from '../Popup';
import { ExternalLinkIcon } from '../../icon/glyph';

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

const useText = () => useMemo(() => faker.lorem.sentence(faker.datatype.number({ min: 10, max: 20 })), []);

const AccentedButton = forwardRef<HTMLButtonElement, JSX.IntrinsicElements['button'] & TriggerProps<HTMLButtonElement>>(
  (props, ref) => {
    const accentedElementRef = useRef<HTMLButtonElement | null>(null);
    const accentCondition = useCallback(() => Promise.resolve(true), []);
    const accentManager = useAccentManager(accentCondition);
    const accentTitle = 'New features!';
    const accentText = 'Change assignee, sprints and status via drag and drop and much more ...!';

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

    const accentActions = useMemo<AccentPopupAction[]>(
      () => [
        {
          text: 'Learn more',
          appearance: 'accent-subtle',
          onClick: handleAccentClose,
          iconAfter: <ExternalLinkIcon size={'small'} />
        },
        {
          text: 'Got it!',
          onClick: handleAccentClose
        }
      ],
      [handleAccentClose]
    );

    return (
      <Accented
        accentActions={accentActions}
        accentContent={accentText}
        accentTitle={accentTitle}
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
        <AccentedExample />
      </Col>
    </Main>
  </Page>
);

export default AccentPopupStory;
