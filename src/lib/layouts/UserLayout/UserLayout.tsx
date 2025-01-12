'use client';

import { Grid } from '@chakra-ui/react';
import type { ReactNode } from 'react';

import Header from './Header';
import type { HeaderProps } from './Header';

type UserLayoutProps = {
  profile: HeaderProps['profile'];
  children: ReactNode;
};

const UserLayout = ({ profile, children }: UserLayoutProps) => {
  return (
    <Grid autoRows="auto 1fr">
      <Header profile={profile} />
      {children}
    </Grid>
  );
};

export default UserLayout;
