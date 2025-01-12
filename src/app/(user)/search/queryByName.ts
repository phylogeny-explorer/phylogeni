import { createClient } from '~/lib/utils/supabase/server';

const queryByName = async (q: string) => {
  const supabase = await createClient();

  // find exact matches
  const { data: exactMatches, error: exactError } = await supabase
    .from('clades')
    .select()
    .ilike('name', q)
    .limit(10);

  if (exactError) {
    console.error('error', exactError);
    return [];
  }
  console.log('exactMatches', exactMatches);

  // find partial matches
  const { data, error } = await supabase
    .from('clades')
    .select()
    .ilike('name', `%${q}%`)
    .limit(10);

  if (error) {
    console.error('error', error);
    return [];
  }

  // combine results, exact matches first
  const combinedResults = [
    ...exactMatches,
    ...data.filter(
      (item) => !exactMatches.some((exact) => exact.id === item.id)
    ),
  ];

  // console.log('data', combinedResults);

  return combinedResults;
};

export default queryByName;
