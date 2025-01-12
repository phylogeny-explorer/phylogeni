import { createClient } from '~/lib/utils/supabase/server';
import { Database } from '~/types/supabase';

type Clade = Database['public']['Tables']['clades']['Row'];

const getClade = async (id?: string): Promise<Clade | null> => {
  if (!id) return null;

  const supabase = await createClient();

  const { data, error } = await supabase
    .from('clades')
    .select('*')
    .eq('id', id);
  console.log(data, error);

  if (error) {
    console.error('error', error);
    return null;
  }
  console.log('data', data);

  const item = data[0];

  return item;
};

export default getClade;
