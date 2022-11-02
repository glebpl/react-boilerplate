import { fireEvent, render, waitFor } from '@testing-library/react';
import { mount } from 'enzyme';
import * as React from 'react';
import { useRef } from 'react';
import * as raf from '../../../utils/_testutils/raf';
import Popup from '../../Popup';
import { ContentProps, PopupProps, TriggerProps } from '../../types';

// override requestAnimationFrame letting us execute it when we need
raf.replace();

type ButtonRef = React.Ref<HTMLButtonElement>;

const defaultProps: PopupProps = {
  content: () => <div>content</div>,
  isOpen: false,
  trigger: (props: TriggerProps) => (
    <button {...props} ref={props.ref as ButtonRef}>
      trigger
    </button>
  )
};

it('renders the trigger correctly when the popup is not open', () => {
  const trigger = (props: TriggerProps) => (
    <button {...props} ref={props.ref as ButtonRef}>
      trigger
    </button>
  );

  const { getByText } = render(<Popup {...defaultProps} isOpen={false} trigger={trigger} />);
  const triggerEl = getByText('trigger');

  expect({
    'aria-expanded': triggerEl.getAttribute('aria-expanded'),
    'aria-haspopup': triggerEl.getAttribute('aria-haspopup')
  }).toEqual({
    'aria-expanded': 'false',
    'aria-haspopup': 'true'
  });
});

it('renders the trigger correctly when the popup is open', async () => {
  const trigger = (props: TriggerProps) => (
    <button {...props} ref={props.ref as ButtonRef}>
      trigger
    </button>
  );
  const { getByText } = render(<Popup {...defaultProps} isOpen trigger={trigger} />);

  const triggerEl = getByText('trigger');

  await waitFor(() => {
    expect({
      'aria-expanded': triggerEl.getAttribute('aria-expanded'),
      'aria-haspopup': triggerEl.getAttribute('aria-haspopup')
    }).toEqual({
      'aria-expanded': 'true',
      'aria-haspopup': 'true'
    });
  });
});

it('does not render the content when the popup is not open', () => {
  const { queryByText } = render(<Popup {...defaultProps} />);
  expect(queryByText('content')).not.toBeInTheDocument();
});

it('renders the content correctly when the popup is open', async () => {
  const { getByText } = render(<Popup {...defaultProps} isOpen />);
  await waitFor(() => {
    expect(getByText('content')).toBeInTheDocument();
  });
});

it('renders the content correctly when the popup is opened', async () => {
  const { getByText, rerender } = render(<Popup {...defaultProps} />);
  rerender(<Popup {...defaultProps} isOpen />);
  await waitFor(() => {
    expect(getByText('content')).toBeInTheDocument();
  });
});

it('does not call onClose after pressing escape when the popup is not open', () => {
  const onClose = jest.fn();
  const { baseElement } = render(<Popup {...defaultProps} onClose={onClose} />);

  fireEvent.keyDown(baseElement, { key: 'Escape', code: 'Escape' });

  expect(onClose).not.toHaveBeenCalled();
});

it('calls onClose after pressing escape when the popup is open', async () => {
  const onClose = jest.fn();
  const { baseElement } = render(<Popup {...defaultProps} isOpen onClose={onClose} />);

  fireEvent.keyDown(baseElement, { key: 'Escape', code: 'Escape' });

  await waitFor(() => {
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

it('calls onClose after pressing escape when the popup is opened', async () => {
  const onClose = jest.fn();
  const { baseElement, rerender } = render(<Popup {...defaultProps} onClose={onClose} />);

  rerender(<Popup {...defaultProps} isOpen onClose={onClose} />);

  fireEvent.keyDown(baseElement, { key: 'Escape', code: 'Escape' });

  await waitFor(() => {
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

it('calls onClose after clicking on the trigger when the popup is open', () => {
  const onClose = jest.fn();
  const { getByText } = render(
    <Popup {...defaultProps} isOpen onClose={onClose} trigger={() => <button>trigger</button>} />
  );

  fireEvent.click(getByText('trigger'));

  expect(onClose).toHaveBeenCalledTimes(1);
});

it('calls onClose after clicking on the trigger when the popup is opened', () => {
  const onClose = jest.fn();
  const trigger = () => <button>trigger</button>;
  const { getByText, rerender } = render(<Popup {...defaultProps} onClose={onClose} trigger={trigger} />);

  rerender(<Popup {...defaultProps} isOpen onClose={onClose} trigger={trigger} />);

  fireEvent.click(getByText('trigger'));

  expect(onClose).toHaveBeenCalledTimes(1);
});

it('calls onClose after clicking outside of the popup when the popup is open', async () => {
  const onClose = jest.fn();
  const { baseElement } = render(<Popup {...defaultProps} isOpen onClose={onClose} />);

  fireEvent.click(baseElement);

  await waitFor(() => {
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

it('calls onClose after clicking outside of the popup when the popup is opened', async () => {
  const onClose = jest.fn();
  const { baseElement, rerender } = render(<Popup {...defaultProps} onClose={onClose} />);
  rerender(<Popup {...defaultProps} isOpen onClose={onClose} />);

  fireEvent.click(baseElement);

  await waitFor(() => {
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

it('calls onClose when calling onClose within the content', async () => {
  const onClose = jest.fn();
  const { getByText } = render(
    <Popup
      {...defaultProps}
      content={({ onClose: onClick }) => <button onClick={onClick}>x</button>}
      isOpen
      onClose={onClose}
    />
  );

  fireEvent.click(getByText('x'));

  await waitFor(() => {
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

it('does not focus the content when the popup is open', async () => {
  const { getByText } = render(<Popup {...defaultProps} isOpen />);
  await waitFor(() => {
    expect(getByText('content')).not.toHaveFocus();
  });
});

it('does not focus the content when the popup is opened', async () => {
  const { getByText, rerender } = render(<Popup {...defaultProps} />);
  rerender(<Popup {...defaultProps} isOpen />);
  await waitFor(() => {
    expect(getByText('content')).not.toHaveFocus();
  });
});

it('focuses the first focusable element inside of the content when the popup is opened', async () => {
  const { getByText } = render(
    <Popup
      trigger={(props: TriggerProps) => (
        <button {...props} ref={props.ref as ButtonRef}>
          trigger
        </button>
      )}
      content={({ setInitialFocusRef }) => <button ref={setInitialFocusRef}>focused content</button>}
      isOpen
    />
  );

  raf.step();
  raf.step();

  await waitFor(() => {
    expect(getByText('focused content')).toHaveFocus();
  });
});

it('focuses the specified element inside of the content when the popup is opened', async () => {
  const content = ({ setInitialFocusRef }: ContentProps) => <button ref={setInitialFocusRef}>focused content</button>;

  const { getByText, rerender } = render(<Popup {...defaultProps} content={content} />);

  rerender(<Popup {...defaultProps} content={content} isOpen />);

  raf.step();
  raf.step();

  await waitFor(() => {
    expect(getByText('focused content')).toHaveFocus();
  });
});

it('popup stays open if propagation is stopped on an event before it reaches window', async () => {
  const content = () => (
    <button
      onClick={event => {
        event.stopPropagation();
      }}
    >
      Popup content
    </button>
  );

  const { findAllByText } = render(
    <div>
      <Popup {...defaultProps} content={content} isOpen />
      <Popup {...defaultProps} content={content} isOpen />
    </div>
  );

  fireEvent.click((await findAllByText('Popup content'))[0]);

  expect((await findAllByText('Popup content'))[1]).toBeDefined();
});

it('popup stays open when clicked element (which is inside content) is removed from the DOM', async () => {
  const onClose = jest.fn();
  const Component = () => {
    const ref = useRef<HTMLButtonElement | null>(null);

    return (
      <button ref={ref} onClick={() => ref.current && ref.current.remove()}>
        Button content
      </button>
    );
  };

  const { getByText } = render(<Popup {...defaultProps} onClose={onClose} content={() => <Component />} isOpen />);

  fireEvent.click(getByText('Button content'));

  await waitFor(() => {
    expect(onClose).toHaveBeenCalledTimes(0);
  });
});

it('matches snapshot', async () => {
  const popup = mount(<Popup {...defaultProps} isOpen />);
  await waitFor(() => {
    expect(popup).toMatchSnapshot();
  });
});
