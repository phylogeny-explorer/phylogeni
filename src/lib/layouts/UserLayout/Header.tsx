import { Grid, Flex, useColorModeValue } from '@chakra-ui/react';
import Link from 'next/link';

import Logo from '~/lib/components/Logo';
import ThemeToggle from '~/lib/layouts/ThemeToggle';

import UserMenu from './UserMenu';
import type { UserMenuProps } from './UserMenu';

export interface HeaderProps {
  profile: UserMenuProps;
}

const Header = ({ profile }: HeaderProps) => {
  const backgroundColor = useColorModeValue('gray.100', 'blackAlpha.500');

  return (
    <Flex
      as="header"
      width="full"
      align="center"
      padding={8}
      paddingY={4}
      background={backgroundColor}
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
