import Layout from '~/lib/layouts';

type AuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return <Layout>{children}</Layout>;
};

export default AuthLayout;
