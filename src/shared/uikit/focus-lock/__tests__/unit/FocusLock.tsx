import { fireEvent, render } from '@testing-library/react';
import * as React from 'react';
import { useState } from 'react';
import { FocusLock } from '../../index';
import Button from '../../../button';

const Component: React.FC<{ shouldReturnFocus?: boolean }> = ({ shouldReturnFocus }) => {
  const [isFocusLocked, setIsFocusLocked] = useState(false);
  return (
    <div>
      <Button autoFocus onClick={() => setIsFocusLocked(value => !value)} testId='btn'>
        Show focus lock
      </Button>
      {isFocusLocked ? (
        <FocusLock data-testid='lock' autoFocus shouldReturnFocus={shouldReturnFocus}>
          <input data-testid='input' type='text' />
        </FocusLock>
      ) : null}
    </div>
  );
};

const check = (shouldReturnFocus?: boolean) => {
  const { getByTestId } = render(<Component shouldReturnFocus={shouldReturnFocus} />);
  const btn = getByTestId('btn');
  expect(btn).toBe(document.activeElement);
  fireEvent.click(btn);
  expect(getByTestId('input')).toBe(document.activeElement);
  fireEvent.click(btn);
  expect(shouldReturnFocus ? btn : document.body).toBe(document.activeElement);
};

const checkPropChange = () => {
  const { getByTestId, rerender } = render(<Component shouldReturnFocus={true} />);
  const btn = getByTestId('btn');
  expect(btn).toBe(document.activeElement);
  fireEvent.click(btn);
  rerender(<Component shouldReturnFocus={false} />);
  expect(getByTestId('input')).toBe(document.activeElement);
  fireEvent.click(btn);
  expect(document.body).toBe(document.activeElement);
};

describe('shouldReturnFocus', () => {
  it('default is false, focus returns to body', () => {
    check();
  });

  it('returns focus when true', () => {
    check(true);
  });

  it('initially was true, but changed to false, focus returns to body', () => {
    // changing from false to true is not possible
    checkPropChange();
  });
});
