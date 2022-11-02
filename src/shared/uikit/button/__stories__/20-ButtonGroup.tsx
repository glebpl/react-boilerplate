/** @jsx jsx */
// noinspection ES6UnusedImports
import { jsx } from '@emotion/react';
import * as React from 'react';
import Button, { ButtonGroup } from '../index';

const Row = (props: React.HTMLProps<HTMLDivElement>) => <div css={{ padding: 8 }} {...props} />;

// TODO: Fix this the next time the file is edited.
// eslint-disable-next-line @typescript-eslint/naming-convention
export default function ButtonGroupExample() {
  return (
    <Row>
      <Row>
        <ButtonGroup appearance='primary'>
          <Button>First Button</Button>
          <Button>Second Button</Button>
          <Button>Third Button</Button>
        </ButtonGroup>
      </Row>
    </Row>
  );
}
