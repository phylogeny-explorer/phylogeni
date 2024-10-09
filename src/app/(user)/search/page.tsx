import { Card, Heading, Stack, StackSeparator, Text } from '@chakra-ui/react';
import Link from 'next/link';

import queryByName from '~/lib/utils/database/queryByName';
import { matchName } from '~/lib/utils/ott';

import Search from './search';

const Page = async ({
  searchParams: { q },
}: {
  searchParams: { q: string };
}) => {
  const results = await queryByName(q);

  const openTreeResults = await matchName(q);

  return (
    <Stack p={8} gap={8}>
      <Search placeholder="search" />
      <Stack
        direction={['column', 'row']}
        gap={8}
        separator={<StackSeparator />}
      >
        <Stack w="full">
          <Heading size="lg">Database results</Heading>
          {!results.length && <Text>No results</Text>}
          {results.map((item) => (
            <Link key={item.id} href={`/node-details?id=${item.id}`}>
              <Card.Root key={item.id} size="sm">
                <Card.Body>
                  <Heading size="md">
                    {item.extant === 'True' ? '🌱' : '🦕'} {item.name}
                  </Heading>
                  <Text color="GrayText">{item.rank}</Text>
                </Card.Body>
              </Card.Root>
            </Link>
          ))}
        </Stack>
        <Stack w="full">
          <Heading size="lg">Open Tree of Life results</Heading>
          {!openTreeResults.length && <Text>No results</Text>}
          {openTreeResults.map((item) => (
            <Link key={item.id} href={`/node-details?ott_id=ott${item.id}`}>
              <Card.Root key={item.id} size="sm">
                <Card.Body>
                  <Heading size="md">
                    {item.extant ? '🌱' : '🦕'} {item.name}
                  </Heading>
                  <Text color="GrayText">{item.rank}</Text>
                </Card.Body>
              </Card.Root>
            </Link>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Page;
