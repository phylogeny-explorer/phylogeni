import { Combobox } from '@ark-ui/react';
import { Stack, Text, chakra } from '@chakra-ui/react';

const ComboboxItemWrapper = chakra(Combobox.Item, {
  base: {
    borderRadius: 'md',
    _hover: {
      bg: 'gray.subtle',
      cursor: 'pointer',
    },
    _selected: {
      bg: 'gray.subtle',
    },
  },
});

interface Item {
  label: string;
  value: string;
  category?: string | null;
}

interface Props {
  item: Item;
}

export const ComboboxItem = ({ item }: Props) => {
  return (
    <ComboboxItemWrapper
      key={item.value}
      item={item}
      persistFocus
      height="auto"
      px="4"
      py="3"
    >
      <Stack gap="0">
        <Text fontWeight="medium">{item.label}</Text>
        <Text color="fg.muted">{item.category}</Text>
      </Stack>
    </ComboboxItemWrapper>
  );
};
