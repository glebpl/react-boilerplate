/** @jsx jsx */
// noinspection ES6UnusedImports
import { jsx } from '@emotion/react';
import * as React from 'react';
import Button from '../index';

const Table = (props: React.HTMLProps<HTMLDivElement>) => <div css={{ display: 'table' }} {...props} />;
const Row = (props: React.HTMLProps<HTMLDivElement>) => <div css={{ display: 'table-row' }} {...props} />;
const Cell = (props: React.HTMLProps<HTMLDivElement>) => <div css={{ display: 'table-cell', padding: 4 }} {...props} />;

const ButtonSpacing = () => (
  <Table>
    <Row>
      <Cell>
        <Button>Default</Button>
      </Cell>
      <Cell>
        <Button spacing='compact'>Compact</Button>
      </Cell>
    </Row>
    <Row>
      <Cell>
        <Button appearance='primary'>Primary</Button>
      </Cell>
      <Cell>
        <Button appearance='primary' spacing='compact'>
          Compact primary
        </Button>
      </Cell>
    </Row>
    <Row>
      <Cell>
        <Button appearance='accent'>Accent</Button>
      </Cell>
      <Cell>
        <Button appearance='accent' spacing='compact'>
          Compact accent
        </Button>
      </Cell>
    </Row>
    <Row>
      <Cell>
        <Button appearance='link'>Default link</Button>
      </Cell>
      <Cell>
        <Button appearance='link' spacing='compact'>
          Compact link
        </Button>
      </Cell>
    </Row>
  </Table>
);

export default ButtonSpacing;
