import Layout from '~/lib/layouts/AuthLayout';

type AuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return <Layout>{children}</Layout>;
};

export default AuthLayout;
