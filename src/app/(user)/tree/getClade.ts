import { createClient } from '~/lib/utils/supabase/server';
import { Database } from '~/types/supabase';
import findImagesByName from './findImagesByName';

type Clade = Database['public']['Tables']['clades']['Row'];
type CladeWithImage = Clade & { image?: string };

const getClade = async (id?: string): Promise<CladeWithImage | null> => {
  if (!id) return null;

  const supabase = await createClient();

  const { data, error } = await supabase
    .from('clades')
    .select('*')
    .eq('id', id);
  // console.log(data, error);

  if (error) {
    console.error('error', error);
    return null;
  }
  // console.log('data', data);

  const item = data[0];

  const images = await findImagesByName(item.name);
  // console.log('images', images);

  return {
    ...item,
    image: images[0]?.url,
  };
};

export default getClade;
