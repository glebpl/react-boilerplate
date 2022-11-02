import * as React from 'react';
import { StyledForm } from './styled';

export interface FormProps {
  onSubmit: () => void;
}

export const Form: React.FC<FormProps> = props => {
  const { onSubmit } = props;
  return (
    <StyledForm autoComplete="off" method="post" action="" onSubmit={onSubmit}>
      <input type="text" />
      <button type="submit">Submit</button>
    </StyledForm>
  );
};
