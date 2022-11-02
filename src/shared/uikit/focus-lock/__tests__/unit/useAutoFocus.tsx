import { render } from '@testing-library/react';
import * as React from 'react';
import { createRef, useRef, useState } from 'react';
import { FocusLockProps } from '../../types';
import { useAutoFocus } from '../../useAutoFocus';

const Test: React.FC<
  Pick<FocusLockProps, 'autoFocus' | 'testId'> & {
    addInternalAutoFocus?: boolean;
    autoFocusRef?: React.RefObject<HTMLInputElement>;
    disableInputs?: boolean;
    isEmpty?: boolean;
  }
> = ({ addInternalAutoFocus, autoFocus, autoFocusRef, disableInputs = false, isEmpty = false, testId }) => {
  const ref = useRef<HTMLDivElement>(null);
  useAutoFocus(ref, autoFocus, true);
  return (
    <div data-testid={testId} tabIndex={-1} ref={ref}>
      {isEmpty ? null : (
        <>
          <input data-testid={`${testId}--input-1`} disabled={disableInputs} type='text' />
          <input
            autoFocus={addInternalAutoFocus}
            data-testid={`${testId}--input-2`}
            disabled={disableInputs}
            type='text'
            ref={autoFocusRef}
          />
        </>
      )}
    </div>
  );
};

it('sets focus to first tabbable if value is true', () => {
  const { getByTestId } = render(<Test autoFocus={true} testId='test' />);
  const input: HTMLElement = getByTestId('test--input-1');
  expect(input).toBe(document.activeElement);
});

it('sets focus to specified element', () => {
  const Component: React.FC = () => {
    const [initialFocusRef, setInitialFocusRef] = useState<HTMLElement | null>(null);
    const ref = useRef<HTMLDivElement>(null);
    useAutoFocus(ref, initialFocusRef, true);
    return (
      <div ref={ref}>
        <input data-testid={'test--input-1'} type='text' />
        <button data-testid={'test--btn-1'} ref={el => setInitialFocusRef(el)}>
          Button
        </button>
      </div>
    );
  };
  const { getByTestId } = render(<Component />);
  const input: HTMLElement = getByTestId('test--btn-1');
  expect(input).toBe(document.activeElement);
});

it('sets focus to element returned by function', () => {
  const autoFocusRef = createRef<HTMLInputElement>();
  const { getByTestId } = render(
    <Test autoFocus={() => autoFocusRef.current} autoFocusRef={autoFocusRef} testId='test' />
  );
  const input: HTMLElement = getByTestId('test--input-2');
  expect(input).toBe(document.activeElement);
});

it('sets focus to container if there is no tabbable elements inside and value is true', () => {
  const { getByTestId } = render(<Test autoFocus={true} isEmpty testId='test' />);
  const div: HTMLElement = getByTestId('test');
  expect(div).toBe(document.activeElement);
});

it('sets focus to container if there is only disabled elements inside and value is true', () => {
  const { getByTestId } = render(<Test autoFocus={true} disableInputs testId='test' />);
  const div: HTMLElement = getByTestId('test');
  expect(div).toBe(document.activeElement);
});

it('sets focus to container if value is false', () => {
  const { getByTestId } = render(<Test autoFocus={false} testId='test' />);
  const div: HTMLElement = getByTestId('test');
  expect(div).toBe(document.activeElement);
});

it('sets focus to first component with autofocus attribute if exists', () => {
  let container = render(<Test autoFocus={true} addInternalAutoFocus testId='test-1' />);
  let input: HTMLElement = container.getByTestId('test-1--input-2');
  expect(input).toBe(document.activeElement);
  container = render(<Test autoFocus={false} addInternalAutoFocus testId='test-2' />);
  input = container.getByTestId('test-2--input-2');
  expect(input).toBe(document.activeElement);
});
