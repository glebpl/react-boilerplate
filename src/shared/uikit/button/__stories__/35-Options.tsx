/** @jsx jsx */
// noinspection ES6UnusedImports
import { jsx } from '@emotion/react';
import styled from '@emotion/styled';
import * as React from 'react';
import { DownloadIcon } from '../../icon';
import Button, { ButtonText } from '../index';

const Icon = <DownloadIcon label='Test icon' size='small' />;

const ButtonWrapper = ({ inline = true, children }: { inline?: boolean; children: React.ReactNode }) => (
  <div css={{ display: inline ? 'inline-block' : 'block', padding: 4 }}>{children}</div>
);

const ButtonOptions = () => (
  <div>
    <ButtonWrapper>
      <StyledButton autoFocus>Auto focused button</StyledButton>
    </ButtonWrapper>
    <ButtonWrapper>
      <Button iconBefore={Icon}>Icon Before</Button>
    </ButtonWrapper>
    <ButtonWrapper>
      <Button iconAfter={Icon}>Icon After</Button>
    </ButtonWrapper>
    <ButtonWrapper inline={false}>
      <Button shouldFitContainer>Fit Container</Button>
    </ButtonWrapper>
  </div>
);

const StyledButton = styled(Button)`
  span {
    color: green;
    @media (max-width: 768px) {
      color: blue;
    }
  }
`;

export default ButtonOptions;
