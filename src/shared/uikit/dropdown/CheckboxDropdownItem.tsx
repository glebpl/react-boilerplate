import * as React from 'react';
import { forwardRef, ForwardRefRenderFunction, KeyboardEvent, MouseEvent, useCallback } from 'react';
import { SelectableDropdownItemProps } from './types';
import DropdownItem from './DropdownItem';
import { Checkbox } from '../checkbox';
import { OverridesType } from '../checkbox/types';
import { gridSize } from '../theme';
import styled from '@emotion/styled';

const CheckboxDropdownItem: ForwardRefRenderFunction<HTMLElement, SelectableDropdownItemProps> = (props, ref) => {
  const { onClick, ...rest } = props;

  const handleClick = (event: MouseEvent | KeyboardEvent) => {
    if (event.target instanceof HTMLInputElement) {
      if (event.currentTarget instanceof HTMLDivElement) {
        event.currentTarget.focus();
      }

      return;
    }

    onClick && onClick(event);
  };

  return (
    <DropdownItem
      {...rest}
      onClick={handleClick}
      elemBefore={
        <CheckboxWrapper>
          <Checkbox isChecked={props.isSelected} isDisabled={props.isDisabled} overrides={checkboxOverrides} />
        </CheckboxWrapper>
      }
      ref={ref}
    />
  );
};

const checkboxOverrides: OverridesType = {
  HiddenCheckbox: {
    attributesFn: attributes => ({
      tabIndex: -1,
      disabled: attributes.disabled,
      checked: attributes.checked,
      required: attributes.required
    })
  }
};

const CheckboxWrapper = styled.div`
  margin-right: ${-1.5 * gridSize()}px;
`;

export default forwardRef(CheckboxDropdownItem);
