/** @jsx jsx */
// noinspection ES6UnusedImports
import { jsx } from '@emotion/react';
import * as React from 'react';
import { useState } from 'react';
import { Checkbox } from '../../checkbox';
import { Appearance, LoadingButton as Button } from '../index';

const appearances: Appearance[] = [
  'default',
  'subtle',
  'primary',
  'link',
  'warning',
  'danger',
  'accent',
  'accent-subtle'
];

const Table = (props: React.HTMLProps<HTMLDivElement>) => <div css={{ display: 'table' }} {...props} />;
const Row = (props: React.HTMLProps<HTMLDivElement>) => <div css={{ display: 'flex', flexWrap: 'wrap' }} {...props} />;
const Cell = (props: React.HTMLProps<HTMLDivElement>) => <div css={{ width: '100px', padding: '4px 0' }} {...props} />;

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// TODO: Fix this the next time the file is edited.
// eslint-disable-next-line @typescript-eslint/naming-convention
export default function Example() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <React.Fragment>
      <Checkbox label='Show Loading State' isChecked={isLoading} onChange={() => setIsLoading(value => !value)} />
      <Table>
        {appearances.map(a => (
          <Row key={a}>
            <Cell>
              <Button isLoading={isLoading} appearance={a}>
                {capitalize(a)}
              </Button>
            </Cell>
            <Cell>
              <Button isLoading={isLoading} appearance={a} isDisabled={true}>
                Disabled
              </Button>
            </Cell>
            <Cell>
              <Button isLoading={isLoading} appearance={a} isSelected={true}>
                Selected
              </Button>
            </Cell>
          </Row>
        ))}
      </Table>
    </React.Fragment>
  );
}
