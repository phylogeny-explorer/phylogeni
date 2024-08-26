import { type OttNode, type Node, Rank } from '~/types/tree';

const getTree = async (nodeId = 'ott93302') => {
  const baseUrl = 'https://api.opentreeoflife.org/v3/';

  const { arguson } = await fetch(`${baseUrl}tree_of_life/subtree`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      node_id: nodeId,
      format: 'arguson',
      height_limit: 3,
      include_lineage: true,
    }),
  }).then((res) => res.json());

  if (!arguson) {
    return null;
  }

  const nodeReducer = (node: OttNode): Node => ({
    id: node.node_id,
    name: node.taxon?.name || 'Unnamed Clade',
    attributes: {
      id: node.node_id,
      leaves: node.num_tips,
      hasChildren: node.num_tips > 0,
      extant: !node.extinct,
      rank: (node.taxon?.rank || Rank.NO_RANK) as Rank,
      lineage: node.lineage?.map((ancestor) => ancestor.node_id),
      // lineage: node.lineage?.map((ancestor) => ({
      //   id: ancestor.node_id,
      //   name: node.taxon?.name || 'Unnamed Clade',
      //   extant: !ancestor.extinct,
      // })),
    },
    children: node.children?.map(nodeReducer),
  });

  return nodeReducer(arguson);
};

export default getTree;
