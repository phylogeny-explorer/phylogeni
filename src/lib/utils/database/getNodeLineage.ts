import type { Clade, Node, Result } from '~/types/database';

import client, { Vars, select, triple, path, optional } from './client';

const getNodeLineage = async (id: string): Promise<Node[]> => {
  // console.log('getNodeLineage', id);
  const v = Vars('node', 'id', 'name', 'rank', 'extant', 'parent', 'ott_id');

  const query = select(v.id, v.name, v.rank, v.extant, v.ott_id)
    .and(
      triple(v.node, 'parent', v.parent),
      path(v.parent, 'parent*', v.id),
      triple(v.id, 'name', v.name),
      optional(triple(v.id, 'ott_id', v.ott_id)),
      optional(triple(v.id, 'rank', v.rank)),
      optional(triple(v.id, 'extant', v.extant))
    )
    .eq(v.node, `Clade/${id}`);

  const queryResult: Result<Clade> = await client.query(query);

  // console.log(queryResult.bindings);

  return queryResult.bindings.map((item) => ({
    id: item.id.split('/').pop() || '',
    name: item.name?.['@value'] || 'Unnamed Clade',
    rank: item.rank?.['@value'] || 'no rank',
    extant: item.extant?.split('/').pop(),
    ott_id: item.ott_id?.['@value'] || '',
  }));
};

export default getNodeLineage;
