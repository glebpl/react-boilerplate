/** @jsx jsx */
// noinspection ES6UnusedImports
import { jsx } from '@emotion/react';
import { FC, useState } from 'react';
import Button from '../../button';
import Icon from '../../icon/glyph/flag-filled';
import Popup from '../index';

const DefaultPopup: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popup
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      placement='bottom-start'
      content={() => (
        <div
          css={{
            width: 175,
            height: 250
          }}
        />
      )}
      trigger={triggerProps => (
        <Button
          {...triggerProps}
          isSelected={isOpen}
          onClick={() => setIsOpen(!isOpen)}
          iconBefore={<Icon label='Add' />}
        />
      )}
    />
  );
};

export default DefaultPopup;
