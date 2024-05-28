'use client';

import { Box, useColorModeValue } from '@chakra-ui/react';
import type { ReactNode } from 'react';

import Footer from './Footer';
import Header from './Header';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const topColor = useColorModeValue('teal.50', 'teal.900');
  const bottomColor = useColorModeValue('white', 'gray.900');

  return (
    <Box
      // h="min(100dvh, 100vh)"
      bgGradient={`linear(to-b, ${topColor}, ${bottomColor})`}
    >
      <Header />
      {children}
      <Footer />
    </Box>
  );
};

export default Layout;
