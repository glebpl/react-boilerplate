/** @jsx jsx */
// noinspection ES6UnusedImports
import { jsx } from '@emotion/react';
import { ArrowDownIcon, QuestionIcon } from '../../icon';
import Button from '../index';

const narrowWrapperStyle = {
  margin: '10px',
  padding: '10px',
  width: '190px',
  border: '1px solid red',

  '& > *': {
    marginBottom: '10px',
    '&:last-child': {
      marginBottom: 0
    }
  }
};

const Truncation = () => (
  <div css={narrowWrapperStyle}>
    <div>
      <Button appearance='primary'>I am wider than my parent</Button>
    </div>
    <div>
      <Button appearance='primary' iconBefore={<QuestionIcon label='Icon before' />}>
        I am wider than my parent
      </Button>
    </div>
    <div>
      <Button appearance='primary' iconAfter={<ArrowDownIcon label='Icon after' />}>
        I am wider than my parent
      </Button>
    </div>
  </div>
);

export default Truncation;
