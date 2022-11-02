import { render } from '@testing-library/react';
import * as React from 'react';
import { useRef } from 'react';
import { MoveFocusInside } from '../../MoveFocusInside';
import { FocusLockProps } from '../../types';
import { useAutoFocus } from '../../useAutoFocus';

const Test: React.FC<
  Pick<FocusLockProps, 'autoFocus' | 'testId'> & {
    addMoveFocusInside?: boolean;
    enableMoveFocusInside?: boolean;
  }
> = ({ autoFocus, testId, addMoveFocusInside = true, enableMoveFocusInside = true }) => {
  const ref = useRef<HTMLDivElement>(null);
  useAutoFocus(ref, autoFocus, true);
  return (
    <div data-testid={testId} tabIndex={-1} ref={ref}>
      <input data-testid={`${testId}--input-1`} type='text' />
      {addMoveFocusInside ? (
        <MoveFocusInside isEnabled={enableMoveFocusInside}>
          <button disabled>Disabled</button>
          <button disabled={!enableMoveFocusInside} data-testid={`${testId}--btn-1`}>
            Button
          </button>
        </MoveFocusInside>
      ) : null}
    </div>
  );
};

it('sets focus to first enabled tabbable inside MoveFocusInside', () => {
  const { getByTestId } = render(<Test autoFocus={true} testId='test' />);
  const btn: HTMLElement = getByTestId('test--btn-1');
  expect(btn).toBe(document.activeElement);
});

it('moves focus to inside MoveFocusInside added after rerender', () => {
  const { getByTestId, rerender } = render(<Test addMoveFocusInside={false} autoFocus={true} testId='test' />);
  const input: HTMLElement = getByTestId('test--input-1');
  expect(input).toBe(document.activeElement);
  rerender(<Test addMoveFocusInside={true} autoFocus={true} testId='test' />);
  const btn: HTMLElement = getByTestId('test--btn-1');
  expect(btn).toBe(document.activeElement);
});

it('moves focus to inside MoveFocusInside added after rerender and enabled later', () => {
  const { getByTestId, rerender } = render(
    <Test addMoveFocusInside={false} enableMoveFocusInside={false} autoFocus={true} testId='test' />
  );
  const input: HTMLElement = getByTestId('test--input-1');
  expect(input).toBe(document.activeElement);
  rerender(<Test addMoveFocusInside={true} enableMoveFocusInside={false} autoFocus={true} testId='test' />);
  expect(input).toBe(document.activeElement);
  rerender(<Test addMoveFocusInside={true} enableMoveFocusInside={true} autoFocus={true} testId='test' />);
  const btn: HTMLElement = getByTestId('test--btn-1');
  expect(btn).toBe(document.activeElement);
});
