import type { Clade, Result } from '~/types/database';

import client, { Vars, select, string } from './client';

const queryByOttId = async (id?: string) => {
  if (!id) return null;

  // console.log('queryByOttId', id);
  const v = Vars('id');

  const query = select(v.id).triple(v.id, 'ott_id', string(id));

  const queryResult: Result<Clade> = await client.query(query);

  // console.log('queryByOttId', queryResult.bindings);

  const results = queryResult.bindings.map((item) => ({
    id: item.id.split('/').pop() || '',
  }));

  return results[0];
};

export default queryByOttId;
