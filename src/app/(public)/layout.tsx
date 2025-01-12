import { Box } from '@chakra-ui/react';

import Header from '~/lib/layouts/PublicLayout/Header';
import Footer from '~/lib/layouts/PublicLayout/Footer';

type PublicLayoutProps = {
  children: React.ReactNode;
};

const PublicLayout = ({ children }: PublicLayoutProps) => {
  return (
    <Box
      bgGradient="to-b"
      gradientFrom={{ base: 'teal.50', _dark: 'teal.900' }}
      gradientTo={{ base: 'white', _dark: 'gray.900' }}
    >
      <Header />
      {children}
      <Footer />
    </Box>
  );
};

export default PublicLayout;
