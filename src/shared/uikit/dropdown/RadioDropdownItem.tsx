import * as React from 'react';
import { forwardRef, ForwardRefRenderFunction } from 'react';
import { SelectableDropdownItemProps } from './types';
import DropdownItem from './DropdownItem';

const Radio: React.FC<JSX.IntrinsicElements['input']> = props => <input type={'radio'} {...props} />;

const RadioDropdownItem: ForwardRefRenderFunction<HTMLElement, SelectableDropdownItemProps> = (props, ref) => (
  <DropdownItem
    {...props}
    elemBefore={<Radio checked={props.isSelected} disabled={props.isDisabled} tabIndex={-1} />}
    ref={ref}
  />
);

export default forwardRef(RadioDropdownItem);
