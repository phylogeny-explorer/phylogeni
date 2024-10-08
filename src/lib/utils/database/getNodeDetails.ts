import type { Clade, Result, NodeDetails } from '~/types/database';

import client, { Vars, select, triple } from './client';

const getNodeDetails = async (id?: string): Promise<NodeDetails | null> => {
  if (!id) return null;

  const v = Vars(
    'id',
    'name',
    'rank',
    'extant',
    'parent',
    'ott_id',
    'common_name'
  );

  const query = select(
    v.id,
    v.name,
    v.rank,
    v.extant,
    v.parent,
    v.ott_id,
    v.common_name
  )
    .triple(v.id, 'name', v.name)
    .eq(v.id, `Clade/${id}` || '')
    .triple(v.id, 'ott_id', v.ott_id)
    .optional(triple(v.id, 'rank', v.rank))
    .optional(triple(v.id, 'extant', v.extant))
    .optional(triple(v.id, 'parent', v.parent))
    .optional(triple(v.id, 'common_name', v.common_name));

  const queryResult: Result<Clade> = await client.query(query);

  // console.log('bindings', queryResult.bindings);

  const item = queryResult.bindings[0];

  return {
    id: item.id.split('/').pop() || '',
    name: item.name['@value'],
    commonNames: item.common_name?.['@value'],
    rank: item.rank?.['@value'] || 'no rank',
    extant: item.extant?.split('/').pop(),
    parent: item.parent?.split('/').pop(),
    ott_id: item.ott_id?.['@value'] || '',
    sources: queryResult.bindings.map((i) => ({
      name: 'ott',
      id: i.ott_id?.['@value'] || '',
      link: `https://tree.opentreeoflife.org/opentree/opentree15.1@${item.ott_id?.['@value']}`,
    })),
  };
};

export default getNodeDetails;
