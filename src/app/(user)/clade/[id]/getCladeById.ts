import { createClient } from '~/lib/utils/supabase/server';
import findImagesByName from '~/lib/utils/wiki/findImagesByName';
import { Database } from '~/types/supabase';

type Clade = Database['public']['Tables']['clades']['Row'];

type CladeWithChildrenAndLineage = Clade & {
  image?: string;
  children: Clade[];
  lineage: Clade[];
};

const getCladeById = async (id: string) => {
  const supabase = await createClient();

  // find exact matches
  const { data, error } = await supabase.rpc('get_clade_details', {
    clade_id: id,
  });

  const { data: extraData } = await supabase
    .from('clades')
    .select('*')
    .eq('id', id);

  if (error) {
    console.error('error', error);
    return null;
  }

  // console.log('data', data);

  const clade = data as CladeWithChildrenAndLineage;
  const extraCladeDetails = extraData?.[0];

  const images = await findImagesByName(clade.name);

  return {
    ...clade,
    ...extraCladeDetails,
    image: images[0]?.url,
  };
};

export default getCladeById;
