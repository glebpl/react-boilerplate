import * as React from 'react';
import { ReactElement } from 'react';
import { Spinner, Appearance, SpinnerSize as Size } from '../../spinner';
import { BaseProps } from '../types';

type Props = Pick<BaseProps, 'appearance' | 'isDisabled' | 'isSelected' | 'spacing'>;

function getSpinnerAppearance({ appearance, isDisabled, isSelected }: Props): Appearance {
  if (isDisabled) {
    return 'inherit';
  }
  if (isSelected) {
    return 'invert';
  }
  if (appearance === 'primary' || appearance === 'accent' || appearance === 'danger') {
    return 'invert';
  }
  return 'inherit';
}

// TODO: Fix this the next time the file is edited.
// eslint-disable-next-line @typescript-eslint/naming-convention
export default function LoadingSpinner({ spacing = 'default', ...rest }: Props): ReactElement {
  const size: Size = spacing === 'default' ? 'medium' : 'small';

  return <Spinner size={size} appearance={getSpinnerAppearance(rest)} />;
}
