import type { Clade, Node, Result } from '~/types/database';

import client, { Vars, select, triple } from './client';

const getNodeChildren = async (id: string): Promise<Node[]> => {
  // console.log('getNodeChildren', id);
  const v = Vars('id', 'name', 'rank', 'extant', 'ott_id');

  const query = select(v.id, v.name, v.rank, v.extant, v.ott_id)
    .triple(v.id, 'parent', `Clade/${id}`)
    .triple(v.id, 'name', v.name)
    .optional(triple(v.id, 'ott_id', v.ott_id))
    .optional(triple(v.id, 'rank', v.rank))
    .optional(triple(v.id, 'extant', v.extant));

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

export default getNodeChildren;
