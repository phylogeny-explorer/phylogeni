import { Grid, Button, Flex } from '@chakra-ui/react';
import Link from 'next/link';

import ThemeToggle from './ThemeToggle';

const Header = () => {
  return (
    <Flex as="header" width="full" align="center">
      <Grid marginLeft="auto" gap={2} templateColumns="1fr auto">
        <ThemeToggle />
        <Link href="/auth/sign-in">
          <Button>Sign In</Button>
        </Link>
      </Grid>
    </Flex>
  );
};

export default Header;
