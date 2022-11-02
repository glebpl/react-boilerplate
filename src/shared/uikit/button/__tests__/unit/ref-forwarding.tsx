import * as React from 'react';
import { useCallback } from 'react';
import { render } from '@testing-library/react';
import forEachType from '../../_testutil/for-each-type';

forEachType(({ name, Component }) => {
  it(`${name}: should return a HTMLElement as it's ref`, () => {
    const mock = jest.fn();
    // TODO: Fix this the next time the file is edited.
    // eslint-disable-next-line @typescript-eslint/naming-convention
    function App() {
      const setRef = useCallback((ref: HTMLElement) => {
        mock(ref);
      }, []);
      return <Component ref={setRef}>Hey</Component>;
    }

    render(<App />);

    expect(mock).toHaveBeenCalledTimes(1);
    expect(mock.mock.calls[0][0]).toBeInstanceOf(HTMLElement);
  });
});
