import { actions as storybookActions } from '@storybook/addon-actions';
import * as faker from 'faker';
import * as React from 'react';
import { Dropdown, DropdownItem, DropdownProps, DropdownItemProps } from '../index';

const dropdownActions = storybookActions('onOpen');
const itemActions = storybookActions('onClick');

interface ExampleDropdownProps extends Partial<DropdownProps> {
  items?: DropdownItemData[];
  numberOfItems?: number;
}

export interface DropdownItemData extends Partial<DropdownItemProps> {
  text: string;
}

export const randomWords = (n = 3): string => faker.random.words(n);

export const ExampleDropdown: React.FC<ExampleDropdownProps> = props => {
  const { items: propItems, numberOfItems = 3, placement = 'bottom-start', trigger = 'Show dropdown', ...rest } = props;

  const items = React.useMemo(() => {
    let itemsData: DropdownItemData[] = [];
    if (propItems) {
      itemsData = propItems;
    } else {
      // TODO: Fix this the next time the file is edited.
      // eslint-disable-next-line @typescript-eslint/naming-convention
      itemsData = new Array(numberOfItems).fill(null).map((_, i) => ({
        text: randomWords(3)
      }));
    }
    return itemsData.map((item, i) => {
      const { text, onClick, ...itemProps } = item;
      const handleClick = (e: React.MouseEvent | React.KeyboardEvent) => {
        itemActions.onClick(e);
        onClick && onClick(e);
      };
      return (
        <DropdownItem key={i} {...itemProps} onClick={handleClick}>
          {text}
        </DropdownItem>
      );
    });
  }, [propItems, numberOfItems]);

  return (
    <Dropdown trigger={trigger} placement={placement} onOpen={dropdownActions.onOpen} {...rest}>
      {items}
    </Dropdown>
  );
};
