import type { Clade, Result } from '~/types/database';

import client, { Vars, select, triple, like, greater, and } from './client';

const queryByName = async (q: string) => {
  const v = Vars(
    'id',
    'name',
    'pattern',
    'rank',
    'extant',
    'parent',
    'dist',
    'parent_name'
  );

  const query = select(
    v.id,
    v.name,
    v.rank,
    v.extant,
    v.parent,
    v.dist,
    v.parent_name
  )
    .order_by(v.dist, 'asc')
    .limit(10)
    .and(
      triple(v.id, 'name', v.name),
      like(`%${q}%`, v.name, v.dist),
      greater(v.dist, 0)
    )
    .optional(triple(v.id, 'rank', v.rank))
    .optional(triple(v.id, 'extant', v.extant))
    .optional(triple(v.id, 'parent', v.parent))
    .optional(and(triple(v.parent, 'name', v.parent_name)));

  const queryResult: Result<Clade> = await client.query(query);

  return queryResult.bindings.map((item) => ({
    id: item.id.split('/').pop(),
    name: item.name['@value'],
    rank: item.rank?.['@value'] || 'no rank',
    extant: item.extant?.split('/').pop(),
    parent: item.parent?.split('/').pop(),
    parentName: item.parent_name?.['@value'],
  }));
};

export default queryByName;
