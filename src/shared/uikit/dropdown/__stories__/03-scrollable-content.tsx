import styled from '@emotion/styled';
import * as React from 'react';
import Lorem from 'react-lorem-ipsum';
import { MoreIcon } from '../../icon/glyph';
import { gridSize } from '../../theme';
import { ExampleDropdown } from './ExampleDropdown';

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 ${-gridSize()}px;
`;

const Span = styled.div`
  display: block;
  padding: 0 ${gridSize()}px;
`;

const ScrollableContent: React.FC = () => (
  <>
    <Lorem p={2} />
    <div style={{ width: '50%', height: '200px', overflow: 'auto', border: '1px #ccc solid' }}>
      <Row>
        <Span>
          <ExampleDropdown
            numberOfItems={5}
            tooltip={'Here is tooltip'}
            trigger={'Will not close on trigger escape'}
            closeOnTriggerEscape={false}
          />
        </Span>
        <Span>
          <ExampleDropdown
            numberOfItems={4}
            trigger={null}
            triggerButtonProps={{
              iconAfter: <MoreIcon />
            }}
            tooltip={'Only icon in button'}
          />
        </Span>
        <Span>
          <ExampleDropdown numberOfItems={5} placement={'bottom-end'} />
        </Span>
      </Row>
      <Lorem p={4} />
      <Row>
        <Span>
          <ExampleDropdown
            numberOfItems={5}
            tooltip={'Here is tooltip'}
            trigger={'Will not close on trigger escape'}
            closeOnTriggerEscape={false}
          />
        </Span>
        <Span>
          <ExampleDropdown numberOfItems={5} />
        </Span>
        <Span>
          <ExampleDropdown numberOfItems={5} placement={'bottom-end'} />
        </Span>
      </Row>
      <Lorem p={2} />
    </div>
    <div style={{ width: '180%' }}>
      <Lorem p={2} />
      <Row>
        <Span>
          <ExampleDropdown numberOfItems={5} tooltip={'Here is tooltip'} />
        </Span>
        <Span>
          <ExampleDropdown numberOfItems={3} trigger='Three items' />
        </Span>
        <Span>
          <ExampleDropdown numberOfItems={3} placement={'bottom-end'} trigger='Three items' />
        </Span>
        <Span>
          <ExampleDropdown numberOfItems={5} placement={'bottom-end'} />
        </Span>
      </Row>
      <Lorem p={2} />
      <Row>
        <Span>
          <ExampleDropdown numberOfItems={5} />
        </Span>
        <Span>
          <ExampleDropdown numberOfItems={10} trigger='Tall dropdown' />
        </Span>
        <Span>
          <ExampleDropdown numberOfItems={10} placement={'bottom-end'} trigger='Tall dropdown' />
        </Span>
        <Span>
          <ExampleDropdown numberOfItems={5} placement={'bottom-end'} />
        </Span>
      </Row>
      <Lorem p={4} />
    </div>
  </>
);

export default ScrollableContent;
