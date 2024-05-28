import Layout from '~/lib/layouts/PublicLayout';

type AuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return <Layout>{children}</Layout>;
};

export default AuthLayout;
