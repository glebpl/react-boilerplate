import * as React from 'react';
import { KeyboardEvent, MouseEvent, useCallback, useState } from 'react';
import Tooltip from '../../tooltip';
import { Dropdown, RadioDropdownItem } from '../index';

const RadioDropdown: React.FC = () => {
  const [selected, setSelected] = useState('a');

  const handleClick = useCallback((e: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>) => {
    setSelected(e.currentTarget.id);
  }, []);

  return (
    <Dropdown trigger={'Select item'}>
      <RadioDropdownItem id={'a'} isSelected={selected === 'a'} onClick={handleClick}>
        Default selected
      </RadioDropdownItem>
      <RadioDropdownItem id={'b'} isDisabled>
        Disabled
      </RadioDropdownItem>
      <RadioDropdownItem id={'c'} isSelected isDisabled>
        Selected disabled
      </RadioDropdownItem>
      <Tooltip content={'Press space to select item'} position={'right'}>
        {targetProps => (
          <RadioDropdownItem {...targetProps} id={'d'} isSelected={selected === 'd'} onClick={handleClick}>
            Item 1
          </RadioDropdownItem>
        )}
      </Tooltip>
      <Tooltip content={'Tooltip for radio dropdown item'} position={'right'}>
        {targetProps => (
          <RadioDropdownItem {...targetProps} id={'b'} isDisabled>
            Disabled with tooltip
          </RadioDropdownItem>
        )}
      </Tooltip>
    </Dropdown>
  );
};

export default RadioDropdown;
