/** @jsx jsx */
// noinspection ES6UnusedImports
import { jsx } from '@emotion/react';
import { FC } from 'react';
import Button from '../../button';
import ButtonGroup from '../../button/button-group';
import AddItemIcon from '../../icon/glyph/add';
import FlagIcon from '../../icon/glyph/flag-filled';
import InfoIcon from '../../icon/glyph/info';
import { palette, EmotionTheme } from '../../theme';
import Popup from '../index';

const HighlightPopup = (props: { children: React.ReactNode }) => (
  <Popup
    isOpen
    placement='bottom'
    content={() => (
      <div css={{ padding: 4 }}>
        <div>Buttons are inside popup!</div>
        <ButtonGroup>
          <Button iconBefore={<FlagIcon label='Add comment' />} />
          <Button iconBefore={<AddItemIcon label='Add item' />} />
          <Button iconBefore={<InfoIcon label='Capture in Jira' />} />
        </ButtonGroup>
      </div>
    )}
    trigger={triggerProps => (
      <span
        css={(theme: EmotionTheme) => ({
          backgroundColor: palette.p100({ theme })
        })}
        {...triggerProps}
      >
        {props.children}
      </span>
    )}
  />
);

const TriggerlessPopup: FC = () => (
  <main>
    Thanks to soaring electricity costs and the potentially-enormous power drain of cooling equipment,{' '}
    <HighlightPopup>few people can happily leave aircon running 24/7</HighlightPopup>. This is especially true for those
    renters who must rely upon portable devices.
  </main>
);

export default TriggerlessPopup;
