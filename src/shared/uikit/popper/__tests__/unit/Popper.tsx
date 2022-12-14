import * as React from 'react';
import { mount } from 'enzyme';
import { waitFor } from '@testing-library/react';
import { Popper as PopperCompo } from '../../index';

const staticDefaultModifiers = [
  {
    name: 'flip',
    options: {
      boundary: 'clippingParents',
      flipVariations: false,
      padding: 5,
      rootBoundary: 'viewport'
    }
  },
  {
    name: 'preventOverflow',
    options: {
      padding: 5,
      rootBoundary: 'viewport'
    }
  }
];

const Content = () => <div className='content'>Hello</div>;

const referenceElement = document.createElement('div');

const mountPopper = (props: { referenceElement: HTMLDivElement }) =>
  mount(
    <PopperCompo {...props}>
      {({ ref, style, placement, arrowProps }) => (
        <div ref={ref} style={style} data-placement={placement}>
          <div {...arrowProps} />
        </div>
      )}
    </PopperCompo>
  );

test('Popper should be defined', async () => {
  const wrapper = mountPopper({ referenceElement });
  await waitFor(() => {
    expect(wrapper).not.toBeNull();
  });
});

test('Popper should pass its children', () => {
  expect(mount(<PopperCompo />).children()).toHaveLength(1);
});

test('should render content into popup', async () => {
  const wrapper = mount(
    <PopperCompo referenceElement={referenceElement}>
      {({ ref, style, placement }) => (
        <div ref={ref} style={style} data-placement={placement}>
          <Content />
        </div>
      )}
    </PopperCompo>
  );
  await waitFor(() => {
    expect(wrapper.childAt(0).find(Content)).toHaveLength(1);
  });
});

describe('should generate modifiers prop correctly', () => {
  const defaultModifiers = [
    ...staticDefaultModifiers,
    {
      name: 'offset',
      options: {
        offset: [0, 8]
      }
    }
  ];

  test('with default props', () => {
    const wrapperDefault = mount(<PopperCompo />);
    expect(wrapperDefault.childAt(0).props().strategy).toBe('fixed');
    expect(wrapperDefault.childAt(0).props().modifiers).toEqual(defaultModifiers);
  });

  test('with offset props', () => {
    const wrapper = mount(<PopperCompo placement='top-start' offset={[16, 16]} />);
    expect(wrapper.childAt(0).props().strategy).toBe('fixed');
    expect(wrapper.childAt(0).props().modifiers).toEqual([
      ...staticDefaultModifiers,
      {
        name: 'offset',
        options: {
          offset: [16, 16]
        }
      }
    ]);
  });

  test('with custom modifiers props', () => {
    const modifiers = [
      {
        name: 'offset',
        enabled: true,
        options: {
          offset: [8, 8]
        }
      },
      {
        name: 'hide',
        enabled: false
      }
    ];
    const wrapper = mount(<PopperCompo modifiers={modifiers} />);
    const expected = [...defaultModifiers, ...modifiers];
    expect(wrapper.childAt(0).props().modifiers).toEqual(expected);
  });

  test('with offset and modifiers props, modifiers props should be placed afterwards (and thus receive higher priority)', () => {
    const modifiers = [
      {
        name: 'offset',
        enabled: false,
        options: {
          offset: [16, 16]
        }
      },
      {
        name: 'hide',
        enabled: false
      }
    ];
    const wrapper = mount(<PopperCompo offset={[16, 16]} modifiers={modifiers} />);
    const expected = [
      ...staticDefaultModifiers,
      {
        name: 'offset',
        options: {
          offset: [16, 16]
        }
      },
      ...modifiers
    ];
    expect(wrapper.childAt(0).props().modifiers).toEqual(expected);
  });
});
