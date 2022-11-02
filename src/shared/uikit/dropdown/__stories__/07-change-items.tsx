import * as faker from 'faker';
import * as React from 'react';
import { useState } from 'react';
import { ExampleDropdown, DropdownItemData } from './ExampleDropdown';

export const randomWords = (n = 3): string => faker.random.words(n);

const useAdd = (items: DropdownItemData[], setItems: (items: DropdownItemData[]) => void) => ({
  shouldCloseDropdown: false,
  text: 'Add items',
  onClick: () =>
    setItems([
      ...items,
      {
        text: randomWords()
      }
    ])
});

const ChangeItems: React.FC = () => {
  const [items, setItems] = useState<DropdownItemData[]>([]);
  const add = useAdd(items, setItems);
  return <ExampleDropdown trigger='Dropdown with changable items' items={[add, ...items]} />;
};

export default ChangeItems;
