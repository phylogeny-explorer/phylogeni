import { Grid, Flex, IconButton } from '@chakra-ui/react';
import Link from 'next/link';

import Logo from '~/lib/components/Logo';
import SearchBar from '~/lib/components/SearchBar';
import { ColorModeButton } from '~/components/ui/color-mode';

import UserMenu, { type UserMenuProps } from './user-menu';

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
      gap={4}
      background={{
        base: 'gray.200',
        _dark: 'gray.800',
      }}
      position="sticky"
      top={0}
      zIndex={200}
    >
      <IconButton asChild aria-label="logo" variant="plain">
        <Link href="/tree">
          <Logo />
        </Link>
      </IconButton>

      <Grid marginLeft="auto" gap={2} templateColumns="1fr auto auto">
        <SearchBar />
        <ColorModeButton />
        <UserMenu {...profile} />
      </Grid>
    </Flex>
  );
};

export default Header;
