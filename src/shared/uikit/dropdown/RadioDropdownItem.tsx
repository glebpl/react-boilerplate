import * as React from 'react';
import { forwardRef, ForwardRefRenderFunction } from 'react';
import { Radio } from '../radio';
import { SelectableDropdownItemProps } from './types';
import DropdownItem from './DropdownItem';

const RadioDropdownItem: ForwardRefRenderFunction<HTMLElement, SelectableDropdownItemProps> = (props, ref) => (
  <DropdownItem
    {...props}
    elemBefore={<Radio isChecked={props.isSelected} isDisabled={props.isDisabled} tabIndex={-1} />}
    ref={ref}
  />
);

export default forwardRef(RadioDropdownItem);
