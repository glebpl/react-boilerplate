/** @jsx jsx */
// noinspection ES6UnusedImports
import { jsx } from '@emotion/react';
import * as React from 'react';
import { ReactElement } from 'react';
import { DownloadIcon } from '../../icon';
import Button, { ButtonProps } from '../index';

const Component = React.forwardRef<HTMLElement, ButtonProps>((props, ref) => (
  <header {...props} ref={ref} css={{ backgroundColor: 'pink' }} />
));

// TODO: Fix this the next time the file is edited.
// eslint-disable-next-line @typescript-eslint/naming-convention
export default function CustomComponent(): ReactElement {
  return (
    <div className='sample'>
      <Button iconBefore={<DownloadIcon size='small' label='app switcher' />} component={Component}>
        App Switcher custom component
      </Button>
    </div>
  );
}
