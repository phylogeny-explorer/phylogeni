import { Box } from '@chakra-ui/react';

import CladeSidebar from '~/lib/components/CladeSidebar';

import Dendrogram from './dendrogram';
import getTree from './getSubtree';
import getClade from './getClade';

export const metadata = {
  title: 'Tree view',
};

export default async function TreePage({
  searchParams,
}: {
  searchParams: Promise<{ node_id: string; selected_node_id: string }>;
}) {
  const { node_id, selected_node_id } = await searchParams;
  const data = await getTree(node_id);

  const clade = selected_node_id ? await getClade(selected_node_id) : null;

  if (!data) {
    return null;
  }

  return (
    <Box
      as="main"
      width="100%"
      height="calc(100vh - 72px)"
      background={{ base: 'gray.50', _dark: 'gray.900' }}
    >
      {clade && <CladeSidebar data={clade} />}
      <Dendrogram data={data} />
    </Box>
  );
}
