'use client';

import { Box } from '@chakra-ui/react';
import type { ReactNode } from 'react';

import Header from './Header';
import type { HeaderProps } from './Header';

type UserLayoutProps = {
  profile: HeaderProps['profile'];
  children: ReactNode;
};

const UserLayout = ({ profile, children }: UserLayoutProps) => {
  return (
    <Box margin="8">
      <Header profile={profile} />
      <Box as="main" marginY={22}>
        {children}
      </Box>
    </Box>
  );
};

export default UserLayout;
