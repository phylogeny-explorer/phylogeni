import { createClient } from '~/lib/utils/supabase/server';

import AccountForm from './account-form';

export default async function Account() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data, error, status } = await supabase
    .from('profiles')
    .select('full_name, avatar_url')
    .eq('id', user?.id || '')
    .single();

  if (error && status !== 406) {
    throw new Error(error.message);
  }

  const profile = {
    ...user,
    full_name: data?.full_name || '',
    avatar_url: data?.avatar_url || '',
  };

  return <AccountForm {...profile} />;
}
