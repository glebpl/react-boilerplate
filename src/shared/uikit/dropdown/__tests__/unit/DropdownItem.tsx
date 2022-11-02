import { mount } from 'enzyme';
import * as React from 'react';
import DropdownItem from '../../DropdownItem';
import { act } from 'react-dom/test-utils';

describe('DropdownItem', () => {
  it('can have href', () => {
    const item = mount(
      <DropdownItem testId='item' href='https://alm.works' target='_blank'>
        Go
      </DropdownItem>
    );
    const el = item.find('a[data-testid="item"]');
    expect(el.length).toEqual(1);
    expect(el.prop('href')).toEqual('https://alm.works');
    expect(el.prop('target')).toEqual('_blank');
    expect(el.prop('aria-disabled')).toEqual(undefined);
  });

  it('can be disabled', () => {
    const item = mount(
      <DropdownItem testId='item' isDisabled href='https://alm.works'>
        Disabled
      </DropdownItem>
    );
    const el = item.find('div[data-testid="item"]');
    expect(el.length).toEqual(1);
    expect(el.prop('aria-disabled')).toEqual(true);
  });

  /**
   * Calling click handler on Enter click to <a> is default behavior,
   * but enzyme can't mock it without Full Rendering API.
   *
   * Since we need that functionality here
   * we have to ensure preventDefault is not called
   * as well as click handler is called programmatically
   * on Enter pressing only when href property is set
   */
  it('preventDefault not called inside keydown handler', () => {
    const item = mount(
      <DropdownItem testId='item' href='https://alm.works' onClick={() => null}>
        DropdownItem
      </DropdownItem>
    );

    let defaultPrevented = false;
    item.simulate('keydown', {
      key: 'Enter',
      code: 'Enter',
      preventDefault: () => (defaultPrevented = true)
    });

    expect(defaultPrevented).toEqual(false);
  });

  it('click handler is not called programmatically on Enter pressing if href prop is set', () => {
    let clickCounter = 0;
    const item = mount(
      <DropdownItem testId='item' href='https://alm.works' onClick={() => clickCounter++}>
        DropdownItem
      </DropdownItem>
    );

    act(() => {
      item.simulate('keydown', {
        key: 'Enter',
        code: 'Enter'
      });
    });

    expect(clickCounter).toEqual(0);
  });

  it('click handler IS called programmatically on Enter pressing if href prop is NOT set', () => {
    let clickCounter = 0;
    const item = mount(
      <DropdownItem testId='item' onClick={() => clickCounter++}>
        DropdownItem
      </DropdownItem>
    );

    act(() => {
      item.simulate('keydown', {
        key: 'Enter',
        code: 'Enter'
      });
    });

    expect(clickCounter).toEqual(1);
  });
});
