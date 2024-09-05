import type { Clade, Result } from '~/types/database';

import client, { Vars, select, triple, and } from './client';

const getNodeDetails = async (id: string) => {
  const v = Vars('id', 'name', 'rank', 'extant', 'parent', 'parent_name');

  const query = select(v.id, v.name, v.rank, v.extant, v.parent, v.parent_name)
    .triple(v.id, 'name', v.name)
    .eq(v.id, `Clade/${id}` || '')
    .optional(triple(v.id, 'rank', v.rank))
    .optional(triple(v.id, 'extant', v.extant))
    .optional(triple(v.id, 'parent', v.parent))
    .optional(and(triple(v.parent, 'name', v.parent_name)));

  const queryResult: Result<Clade> = await client.query(query);

  const results = queryResult.bindings.map((item) => ({
    id: item.id.split('/').pop(),
    name: item.name['@value'],
    rank: item.rank?.['@value'] || 'no rank',
    extant: item.extant?.split('/').pop(),
    parent: item.parent?.split('/').pop(),
    parentName: item.parent_name?.['@value'],
  }));

  return results[0];
};

export default getNodeDetails;
