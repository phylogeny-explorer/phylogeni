import { Stack, Text, useColorModeValue } from '@chakra-ui/react';
import type { ReactNode } from 'react';

type DescriptionListProps = {
  items: { key: string; value?: ReactNode }[];
};

const DescriptionList = ({ items }: DescriptionListProps) => {
  const textColor = useColorModeValue('gray.800', 'gray.300');

  const filteredItems = items.filter(({ value }) => value);

  return (
    <Stack as="dl" spacing={1}>
      {filteredItems.map(({ key, value }) => (
        <Stack key={key} direction="row" spacing={2}>
          <Text
            as="dt"
            color={textColor}
            w="109px"
            textAlign="end"
            casing="capitalize"
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
