import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  Heading,
  UnorderedList,
  ListItem,
  Stack,
  Text,
  Link,
  Button,
} from '@chakra-ui/react';
import NextLink from 'next/link';

import getNodeDetails from '~/lib/utils/database/getNodeDetails';
import queryByName from '~/lib/utils/database/queryByName';
import { getSpecies as getGbifData } from '~/lib/utils/gbif';
import { getNodeDetails as getOttData } from '~/lib/utils/ott';

import GbifResultCard from './GbifResultCard';
import MatchText from './MatchText';

const Page = async ({
  searchParams: { id, ott_id },
}: {
  searchParams: { id?: string; ott_id?: string };
}) => {
  // console.log(id, ott_id);
  const nodeDetails = id ? await getNodeDetails(id) : null;

  // console.log(nodeDetails);

  const openTreeResult = ott_id ? await getOttData(ott_id) : null;

  // console.log(openTreeResult);

  const gbifId = openTreeResult?.sources?.find((s) => s.name === 'gbif')?.id;

  // console.log(gbifId);

  const gbifResult = gbifId ? await getGbifData(gbifId) : null;

  // console.log(gbifResult);

  const queryResults =
    !id && openTreeResult?.name ? await queryByName(openTreeResult.name) : null;

  // console.log(queryResults);

  const result = nodeDetails || queryResults?.[0];

  return (
    <Flex p={8} direction={['column', 'row']} gap={8}>
      <Stack w="full" spacing={8}>
        <Heading size="lg">Database result</Heading>
        {!result && (
          <Stack>
            <Text>No result</Text>
            <Button>Create Node from Data</Button>
          </Stack>
        )}
        {result && (
          <Card>
            <CardHeader>
              <Heading size="md">{result.name}</Heading>
            </CardHeader>
            <CardBody>
              <Stack>
                <Text>Node ID: {result.id}</Text>
                <Text>
                  Name:{' '}
                  <MatchText match={openTreeResult?.name}>
                    {result.name}
                  </MatchText>
                </Text>
                <Text>Parent: {result.parentName}</Text>
                <Text>
                  Rank:{' '}
                  {result.rank ? (
                    <MatchText match={openTreeResult?.rank}>
                      {result.rank}
                    </MatchText>
                  ) : (
                    'no rank'
                  )}
                </Text>
                <Text>Extant: {result.extant}</Text>
              </Stack>
            </CardBody>
          </Card>
        )}
      </Stack>
      <Divider orientation="vertical" />
      <Stack w="full" spacing={8}>
        <Heading size="lg">Open Tree of Life result</Heading>
        {!openTreeResult && <Text>No result</Text>}
        {openTreeResult && (
          <Card>
            <CardBody>
              <Stack>
                <Text>Node ID: {openTreeResult.id}</Text>
                <Text>
                  Name:{' '}
                  <MatchText match={result?.name}>
                    {openTreeResult.name}
                  </MatchText>
                </Text>
                {openTreeResult.parent.id && (
                  <Text>
                    Parent:{' '}
                    <Link
                      as={NextLink}
                      href={`/node-details?ott_id=${openTreeResult.parent.id}`}
                    >
                      {openTreeResult.parent.name}
                    </Link>
                  </Text>
                )}

                <Text>
                  Rank:{' '}
                  <MatchText match={result?.rank}>
                    {openTreeResult.rank}
                  </MatchText>
                </Text>
                <Text>Unique name: {openTreeResult.unique_name}</Text>

                <Heading size="sm">Sources</Heading>
                <UnorderedList>
                  {openTreeResult.sources?.map((source) => (
                    <ListItem key={source.id}>
                      {source.name}: {source.id}{' '}
                      {source.link && (
                        <Link color="teal.500" href={source.link} isExternal>
                          See more
                        </Link>
                      )}
                    </ListItem>
                  ))}
                </UnorderedList>
              </Stack>
            </CardBody>
          </Card>
        )}
        <Heading size="lg">GBIF result</Heading>
        {!gbifResult && <Text>No result</Text>}
        {gbifResult && <GbifResultCard {...gbifResult} />}
      </Stack>
    </Flex>
  );
};

export default Page;
