import Layout from '~/lib/layouts';

type PublicLayoutProps = {
  children: React.ReactNode;
};

const PublicLayout = ({ children }: PublicLayoutProps) => {
  return <Layout>{children}</Layout>;
};

export default PublicLayout;
