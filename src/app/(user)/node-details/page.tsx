import { Divider, Flex, Heading, Stack, Text } from '@chakra-ui/react';

import getNodeChildren from '~/lib/utils/database/getNodeChildren';
import getNodeDetails from '~/lib/utils/database/getNodeDetails';
import getNodeLineage from '~/lib/utils/database/getNodeLineage';
import queryByOttId from '~/lib/utils/database/queryByOttId';
import { getSpecies as getGbifData } from '~/lib/utils/gbif';
import { getNodeDetails as getOttData } from '~/lib/utils/ott';

import GbifResultCard from './GbifResultCard';
import NodeDetails from './NodeDetails';
import OttResultCard from './OttResultCard';

const Page = async ({
  searchParams: { id, ott_id },
}: {
  searchParams: { id?: string; ott_id?: string };
}) => {
  // console.log(id, ott_id);

  const openTreeResult = await getOttData(ott_id);

  // console.log(openTreeResult);

  const gbifId = openTreeResult?.sources?.find((s) => s.name === 'gbif')?.id;

  // console.log(gbifId);

  const gbifResult = await getGbifData(gbifId);

  // console.log(gbifResult);

  const queryResult = !id ? await queryByOttId(openTreeResult?.id) : null;

  // console.log(queryResults);

  const result = await getNodeDetails(id || queryResult?.id);

  // console.log(result);

  const children = result?.id ? await getNodeChildren(result.id) : null;

  const lineage = result?.id ? await getNodeLineage(result.id) : null;
  // console.log(lineage);

  return (
    <Flex p={8} direction={['column', 'row']} gap={8}>
      <NodeDetails
        databaseResult={result}
        lineage={lineage}
        directChildren={children}
        openTreeResult={openTreeResult}
      />
      <Divider orientation="vertical" />
      <Stack w="full" spacing={8}>
        <Heading size="lg">Open Tree of Life result</Heading>
        {!openTreeResult && <Text>No result</Text>}
        {openTreeResult && (
          <OttResultCard
            databaseResult={result}
            openTreeResult={openTreeResult}
          />
        )}
        <Heading size="lg">GBIF result</Heading>
        {!gbifResult && <Text>No result</Text>}
        {gbifResult && <GbifResultCard {...gbifResult} />}
      </Stack>
    </Flex>
  );
};

export default Page;
