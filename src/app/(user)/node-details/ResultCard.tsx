import {
  Card,
  CardBody,
  Heading,
  Stack,
  Divider,
  Link,
} from '@chakra-ui/react';
import NextLink from 'next/link';

import DescriptionList from '~/lib/components/DescriptionList';
import type { NodeDetails, Node } from '~/types/database';
import type { OttNodeDetails } from '~/types/ott';

import MatchText from './MatchText';

type Props = {
  openTreeResult?: OttNodeDetails | null;
  databaseResult: NodeDetails;
  lineage?: Node[] | null;
  directChildren?: Node[] | null;
};

const ResultCard = ({
  databaseResult,
  openTreeResult,
  lineage,
  directChildren,
}: Props) => {
  return (
    <Card>
      <CardBody>
        <Stack>
          <DescriptionList
            items={[
              { key: 'Node ID', value: databaseResult.id },
              {
                key: 'Name',
                value: databaseResult.name && (
                  <MatchText match={openTreeResult?.name}>
                    {databaseResult.name}
                  </MatchText>
                ),
              },
              {
                key: 'Rank',
                value: databaseResult.rank && (
                  <MatchText match={openTreeResult?.rank}>
                    {databaseResult.rank}
                  </MatchText>
                ),
              },
              {
                key: 'Status',
                value: (
                  <MatchText
                    match={openTreeResult?.extinct ? 'Extinct' : 'Extant'}
                  >
                    {databaseResult.extant ? 'Extant' : 'Extinct'}
                  </MatchText>
                ),
              },
            ]}
          />

          {lineage?.length && (
            <>
              <Divider />
              <Heading size="sm">Lineage</Heading>
              <DescriptionList
                items={lineage?.map((item) => ({
                  key:
                    !item.rank || item.rank === 'no rank' ? 'Clade' : item.rank,
                  value: (
                    <Link
                      as={NextLink}
                      href={`/node-details?id=${item.id}&ott_id=${item.ott_id}`}
                    >
                      {item.name}
                    </Link>
                  ),
                }))}
              />
            </>
          )}

          <Divider />

          <Heading size="sm">Children</Heading>
          {directChildren && (
            <DescriptionList
              items={directChildren?.map((item, i) => ({
                key: `${i + 1}`,
                value: (
                  <Link
                    as={NextLink}
                    href={`/node-details?id=${item.id}&ott_id=${item.ott_id}`}
                  >
                    {item.name}
                  </Link>
                ),
              }))}
            />
          )}

          <Divider />

          <Heading size="sm">External Sources</Heading>
          <DescriptionList
            items={
              databaseResult.sources?.map((source) => ({
                key: source.name.toUpperCase(),
                value: source.link ? (
                  <>
                    {source.id}{' '}
                    <Link color="teal.500" href={source.link} isExternal>
                      See more
                    </Link>
                  </>
                ) : (
                  source.id
                ),
              })) || []
            }
          />
        </Stack>
      </CardBody>
    </Card>
  );
};

export default ResultCard;
