import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import type { Database } from '~/types/supabase';

import AccountForm from './account-form';

export default async function Account() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error, status } = await supabase
    .from('profiles')
    .select(`full_name`)
    .eq('id', user?.id || '')
    .single();

  if (error && status !== 406) {
    throw new Error(error.message);
  }

  return <AccountForm user={user} fullName={data?.full_name} />;
}
