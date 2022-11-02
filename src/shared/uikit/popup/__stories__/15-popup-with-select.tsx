/** @jsx jsx */
// noinspection ES6UnusedImports
import { jsx } from '@emotion/react';
import * as React from 'react';
import { Fragment, useState } from 'react';
import Lorem from 'react-lorem-ipsum';
import Button from '../../button';
import Icon from '../../icon/glyph/flag-filled';
import { Select, SelectOption } from '../../select';
import Popup from '../index';

const options = [
  { label: 'Adelaide', value: 'adelaide', extra: 'extra' },
  { label: 'Brisbane', value: 'brisbane' },
  { label: 'Canberra', value: 'canberra' },
  { label: 'Darwin', value: 'darwin' },
  { label: 'Hobart', value: 'hobart' },
  { label: 'Melbourne', value: 'melbourne' },
  { label: 'Perth', value: 'perth' },
  { label: 'Sydney', value: 'sydney' }
];

const PopupWithSelect: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cities, setCities] = useState<SelectOption[]>([]);

  return (
    <Fragment>
      Popup with select
      <br />
      <Popup
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        placement='bottom-start'
        content={() => (
          <div
            css={{
              padding: 8,
              width: 240
            }}
          >
            <Select
              isMulti
              isSearchable={false}
              onChange={(selected: SelectOption[]): void => setCities(selected)}
              option={cities}
              options={options}
              placeholder='Choose a City'
            />
            <Lorem p={1} />
          </div>
        )}
        trigger={triggerProps => (
          <Button
            {...triggerProps}
            isSelected={isOpen}
            onClick={() => setIsOpen(!isOpen)}
            value='Add'
            iconBefore={<Icon label='Add' />}
          />
        )}
      />
    </Fragment>
  );
};

export default PopupWithSelect;
