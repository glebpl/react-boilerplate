import * as React from 'react';
import { render } from '@testing-library/react';
import Button from '../../index';

it('should render a custom component if provided', () => {
  // TODO: Fix this the next time the file is edited.
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const Custom = React.forwardRef(function Custom({ children, ...rest }, ref: React.Ref<HTMLDivElement>) {
    return (
      <div ref={ref} {...rest}>
        {children} World
      </div>
    );
  });

  const { getByTestId } = render(
    <Button testId='button' href='http://google.com' component={Custom}>
      Hello
    </Button>
  );
  const button: HTMLElement = getByTestId('button');

  expect(button.tagName.toLowerCase()).toBe('div');
  expect(button.textContent).toBe('Hello World');
  expect(button.getAttribute('href')).toBe('http://google.com');
});

it('should support having a custom component with extra strange props', () => {
  type Props = React.AllHTMLAttributes<HTMLElement> & {
    to: string;
  };
  // TODO: Fix this the next time the file is edited.
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const Link = React.forwardRef(function Link({ children, to, ...rest }: Props, ref: React.Ref<HTMLElement>) {
    return (
      <span ref={ref} {...rest} data-href={to}>
        {children} World
      </span>
    );
  });

  const { getByTestId } = render(
    // @ts-expect-error: incorrect typing at this stage
    <Button testId='button' to='http://google.com' component={Link}>
      Hello
    </Button>
  );
  const button: HTMLElement = getByTestId('button');

  expect(button.tagName.toLowerCase()).toBe('span');
  expect(button.getAttribute('data-href')).toBe('http://google.com');
});
