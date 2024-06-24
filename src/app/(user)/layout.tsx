import Layout from '~/lib/layouts/UserLayout';
import { createClient } from '~/lib/utils/supabase/server';

type UserLayoutProps = {
  children: React.ReactNode;
};

const UserLayout = async ({ children }: UserLayoutProps) => {
  const supabase = createClient();

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
