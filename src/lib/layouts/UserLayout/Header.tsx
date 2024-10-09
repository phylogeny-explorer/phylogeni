import { Grid, Flex } from '@chakra-ui/react';
import Link from 'next/link';

import Logo from '~/lib/components/Logo';
import ThemeToggle from '~/lib/layouts/ThemeToggle';

import UserMenu from './UserMenu';
import type { UserMenuProps } from './UserMenu';

export interface HeaderProps {
  profile: UserMenuProps;
}

const Header = ({ profile }: HeaderProps) => {
  return (
    <Flex
      as="header"
      width="full"
      align="center"
      padding={8}
      paddingY={4}
      background={{
        base: 'gray.100',
        _dark: 'gray.900/40',
      }}
      position="sticky"
      top={0}
      zIndex={200}
    >
      <Link href="/tree">
        <Logo />
      </Link>
      <Grid marginLeft="auto" gap={2} templateColumns="1fr auto">
        <ThemeToggle />
        <UserMenu {...profile} />
      </Grid>
    </Flex>
  );
};

export default Header;
