import { Stack, Text } from '@chakra-ui/react';
import type { ReactNode } from 'react';

type DescriptionListProps = {
  items: { key: string; value?: ReactNode }[];
};

const DescriptionList = ({ items }: DescriptionListProps) => {
  const filteredItems = items.filter(({ value }) => value);

  return (
    <Stack as="dl" gap={1}>
      {filteredItems.map(({ key, value }, i) => (
        <Stack key={`${key}-${i}`} direction="row" gap={2}>
          <Text
            as="dt"
            color={{ base: 'gray.800', _dark: 'gray.300' }}
            w="109px"
            textAlign="end"
            textTransform="capitalize"
          >
            {key}:
          </Text>
          <Text as="dd">{value}</Text>
        </Stack>
      ))}
    </Stack>
  );
};

export default DescriptionList;
