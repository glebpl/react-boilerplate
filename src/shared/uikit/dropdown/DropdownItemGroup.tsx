import * as React from 'react';
import { forwardRef } from 'react';
import { Group, GroupTitle, GroupTitleAfter, GroupTitleText } from './styled';
import { DropdownItemGroupProps } from './types';

const DropdownItemGroup = forwardRef<HTMLDivElement, DropdownItemGroupProps>((props, ref) => {
  const { children, elemAfter, title, ...htmlProps } = props;
  return (
    <Group {...htmlProps} ref={ref}>
      {title ? (
        'string' === typeof title ? (
          <GroupTitle>
            <GroupTitleText>{title}</GroupTitleText>
            {elemAfter ? <GroupTitleAfter>{elemAfter}</GroupTitleAfter> : null}
          </GroupTitle>
        ) : (
          title
        )
      ) : null}
      {children}
    </Group>
  );
});

export default DropdownItemGroup;
