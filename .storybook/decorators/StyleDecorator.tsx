import styled from '@emotion/styled';
import { DecoratorFn } from '@storybook/react';
import * as React from 'react';

const Container = styled.div`
  background: #e8e8e8;
`;

export const StyleDecorator: DecoratorFn = Story => <Container>{Story()}</Container>;
