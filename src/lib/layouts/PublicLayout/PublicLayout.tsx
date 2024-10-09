'use client';

import { Box } from '@chakra-ui/react';
import type { ReactNode } from 'react';

import Footer from './Footer';
import Header from './Header';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box
      // h="min(100dvh, 100vh)"
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

export default Layout;
