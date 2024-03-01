import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import Layout from '~/lib/layouts/UserLayout';
import type { Database } from '~/types/supabase';

type UserLayoutProps = {
  children: React.ReactNode;
};

const UserLayout = async ({ children }: UserLayoutProps) => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data } = await supabase
    .from('profiles')
    .select('full_name, avatar_url')
    .eq('id', user?.id || '')
    .single();

  const profile = {
    email: user.email!,
    full_name: data?.full_name || '',
    avatar_url: data?.avatar_url || '',
  };

  return <Layout profile={profile}>{children}</Layout>;
};

export default UserLayout;
