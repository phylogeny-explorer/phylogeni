import {
  Card,
  CardBody,
  Divider,
  Flex,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
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
    <Stack p={8} spacing={8}>
      <Search placeholder="search" />
      <Flex direction={['column', 'row']} gap={8}>
        <Stack w="full">
          <Heading size="lg">Database results</Heading>
          {!results.length && <Text>No results</Text>}
          {results.map((item) => (
            <Link key={item.id} href={`/node-details?id=${item.id}`}>
              <Card key={item.id} size="sm">
                <CardBody>
                  <Heading size="md">
                    {item.extant === 'True' ? '🌱' : '🦕'} {item.name}
                  </Heading>
                  <Text color="GrayText">{item.rank}</Text>
                </CardBody>
              </Card>
            </Link>
          ))}
        </Stack>
        <Divider orientation="vertical" />
        <Stack w="full">
          <Heading size="lg">Open Tree of Life results</Heading>
          {!openTreeResults.length && <Text>No results</Text>}
          {openTreeResults.map((item) => (
            <Link key={item.id} href={`/node-details?ott_id=ott${item.id}`}>
              <Card key={item.id} size="sm">
                <CardBody>
                  <Heading size="md">
                    {item.extant ? '🌱' : '🦕'} {item.name}
                  </Heading>
                  <Text color="GrayText">{item.rank}</Text>
                </CardBody>
              </Card>
            </Link>
          ))}
        </Stack>
      </Flex>
    </Stack>
  );
};

export default Page;
