'use client';

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
import type { NodeDetails } from '~/types/database';
import type { OttNodeDetails } from '~/types/ott';

import MatchText from './MatchText';

type Props = {
  openTreeResult: OttNodeDetails;
  databaseResult?: NodeDetails | null;
};

const OttResultCard = ({ databaseResult, openTreeResult }: Props) => {
  return (
    <Card>
      <CardBody>
        <Stack>
          <DescriptionList
            items={[
              { key: 'Node ID', value: openTreeResult.id },
              {
                key: 'Name',
                value: openTreeResult.name && (
                  <MatchText match={databaseResult?.name}>
                    {openTreeResult.name}
                  </MatchText>
                ),
              },
              { key: 'Unique name', value: openTreeResult.unique_name },
              {
                key: 'Rank',
                value: openTreeResult.rank && (
                  <MatchText match={databaseResult?.rank}>
                    {openTreeResult.rank}
                  </MatchText>
                ),
              },
              {
                key: 'Status',
                value: (
                  <MatchText
                    match={databaseResult?.extant ? 'Extant' : 'Extinct'}
                  >
                    {openTreeResult.extinct ? 'Extinct' : 'Extant'}
                  </MatchText>
                ),
              },
            ]}
          />

          {openTreeResult.lineage?.length && (
            <>
              <Divider />
              <Heading size="sm">Lineage</Heading>
              <DescriptionList
                items={openTreeResult.lineage?.map((item) => ({
                  key:
                    !item.rank || item.rank === 'no rank' ? 'Clade' : item.rank,
                  value: (
                    <Link
                      as={NextLink}
                      href={`/node-details?ott_id=${item.id}`}
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
          {openTreeResult.children && (
            <DescriptionList
              items={openTreeResult.children?.map((item, i) => ({
                key: `${i + 1}`,
                value: (
                  <Link as={NextLink} href={`/node-details?ott_id=${item.id}`}>
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
              openTreeResult.sources?.map((source) => ({
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

export default OttResultCard;
