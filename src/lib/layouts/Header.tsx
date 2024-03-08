import { Grid, Button } from '@chakra-ui/react';
import Link from 'next/link';
import { RiLoginBoxLine } from 'react-icons/ri';

import Logo from '~/lib/components/Logo';

import ThemeToggle from './ThemeToggle';

const Header = () => {
  return (
    <Grid
      as="header"
      width="full"
      templateColumns="auto 1fr"
      gap={8}
      p={8}
      paddingX={[8, 16]}
    >
      <Logo full />
      <Grid marginLeft="auto" gap={4} autoFlow="column">
        <ThemeToggle />
        <Link href="/auth/sign-in">
          <Button colorScheme="gray" leftIcon={<RiLoginBoxLine />}>
            Sign In
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
};

export default Header;
