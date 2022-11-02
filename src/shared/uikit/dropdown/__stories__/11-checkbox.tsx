import * as React from 'react';
import { KeyboardEvent, MouseEvent, useCallback, useState } from 'react';
import Tooltip from '../../tooltip';
import { CheckboxDropdownItem, Dropdown } from '../index';

const CheckboxDropdown: React.FC = () => {
  const [selected, setSelected] = useState(['a']);

  const handleClick = useCallback(
    (e: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>) => {
      const newSelected = selected.includes(e.currentTarget.id)
        ? selected.filter(item => item !== e.currentTarget.id)
        : [...selected, e.currentTarget.id];

      setSelected(newSelected);
    },
    [selected]
  );

  return (
    <Dropdown trigger={'Select item'}>
      <CheckboxDropdownItem id={'a'} isSelected={selected.includes('a')} onClick={handleClick}>
        Default selected
      </CheckboxDropdownItem>
      <CheckboxDropdownItem id={'b'} isDisabled>
        Disabled
      </CheckboxDropdownItem>
      <CheckboxDropdownItem id={'c'} isSelected isDisabled>
        Selected disabled
      </CheckboxDropdownItem>
      <Tooltip content={'Press space to select item'} position={'right'}>
        {targetProps => (
          <CheckboxDropdownItem {...targetProps} id={'d'} isSelected={selected.includes('d')} onClick={handleClick}>
            Item 1
          </CheckboxDropdownItem>
        )}
      </Tooltip>
      <Tooltip content={'Tooltip for checkbox dropdown item'} position={'right'}>
        {targetProps => (
          <CheckboxDropdownItem {...targetProps} id={'b'} isDisabled>
            Disabled with tooltip
          </CheckboxDropdownItem>
        )}
      </Tooltip>
    </Dropdown>
  );
};

export default CheckboxDropdown;
