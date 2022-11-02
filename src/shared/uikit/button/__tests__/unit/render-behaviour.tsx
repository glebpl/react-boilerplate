import { render } from '@testing-library/react';
import * as React from 'react';
import forEachType from '../../_testutil/for-each-type';

forEachType(({ name, Component }) => {
  it(`${name}: should only render once on initial render`, () => {
    const mock = jest.fn();
    // TODO: Fix this the next time the file is edited.
    // eslint-disable-next-line @typescript-eslint/naming-convention
    function App() {
      mock();
      return null;
    }

    render(
      <Component>
        <App />
      </Component>
    );

    expect(mock).toHaveBeenCalledTimes(1);
  });
});
