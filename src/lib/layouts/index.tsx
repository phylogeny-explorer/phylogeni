'use client';

import { Grid } from '@chakra-ui/react';
import type { ReactNode } from 'react';

import Footer from './Footer';
import Header from './Header';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <Grid h="min(100dvh, 100vh)">
      <Header />
      {children}
      <Footer />
    </Grid>
  );
};

export default Layout;
