'use client';

import { Flex, useColorModeValue } from '@chakra-ui/react';
import type { ReactNode } from 'react';

import Footer from '../PublicLayout/Footer';
import Header from '../PublicLayout/Header';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const background = useColorModeValue('gray.50', 'gray.900');

  return (
    <Flex direction="column" h="min(100dvh, 100vh)" bg={background}>
      <Header />
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        h="100%"
        gap={4}
        mb={8}
        w="full"
      >
        {children}
      </Flex>
      <Footer />
    </Flex>
  );
};

export default Layout;
