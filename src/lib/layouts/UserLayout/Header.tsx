import { Grid, Flex } from '@chakra-ui/react';

import UserMenu from './UserMenu';
import type { UserMenuProps } from './UserMenu';

export interface HeaderProps {
  profile: UserMenuProps;
}

const Header = ({ profile }: HeaderProps) => (
  <Flex as="header" width="full" align="center">
    <Grid marginLeft="auto" gap={2} templateColumns="1fr auto">
      <UserMenu {...profile} />
    </Grid>
  </Flex>
);

export default Header;
