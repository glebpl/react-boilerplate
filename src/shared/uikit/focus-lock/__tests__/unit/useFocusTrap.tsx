import { render } from '@testing-library/react';
import * as React from 'react';
import { useRef } from 'react';
import { useFocusTrap } from '../../useFocusTrap';

it('forces return focus to focus lock container', () => {
  const Component: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    useFocusTrap(ref);
    return (
      <div>
        <div data-testid='trap' tabIndex={-1} ref={ref}>
          <input type='text' />
        </div>
        <button data-testid='btn'>Try focus</button>
      </div>
    );
  };
  const { getByTestId } = render(<Component />);
  const btn = getByTestId('btn');
  const trap = getByTestId('trap');
  btn.focus();
  expect(trap).toBe(document.activeElement);
});
