import * as React from 'react';
import { Textfield } from '../../textfield';
import { Dropdown, DropdownItem } from '../index';

const WithTextfield: React.FC = () => (
  <Dropdown trigger={'Open'}>
    <DropdownItem href={'https://alm.works'}>Link with href</DropdownItem>
    <DropdownItem isDisabled={true}>
      <Textfield autoFocus={true} />
    </DropdownItem>
    <DropdownItem href={'https://alm.works'} isDisabled={true}>
      Disabled link with href
    </DropdownItem>
    <DropdownItem isDisabled={true}>
      <Textfield />
    </DropdownItem>
  </Dropdown>
);

export default WithTextfield;
