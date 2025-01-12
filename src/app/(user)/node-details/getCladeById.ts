import { createClient } from '~/lib/utils/supabase/server';
import { Database } from '~/types/supabase';

type Clade = Database['public']['Tables']['clades']['Row'];

type CladeWithChildrenAndLineage = Clade & {
  children: Clade[];
  lineage: Clade[];
};

const getCladeById = async (id: string) => {
  const supabase = await createClient();

  // find exact matches
  const { data, error } = await supabase.rpc('get_clade_details', {
    clade_id: id,
  });

  if (error) {
    console.error('error', error);
    return null;
  }

  // console.log('data', data);

  return data as CladeWithChildrenAndLineage | null;
};

export default getCladeById;
