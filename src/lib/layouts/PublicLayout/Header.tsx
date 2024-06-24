import { Grid, Button, useColorModeValue } from '@chakra-ui/react';
import Link from 'next/link';
import { RiLoginBoxLine } from 'react-icons/ri';

import Logo from '~/lib/components/Logo';
import ThemeToggle from '~/lib/layouts/ThemeToggle';

const Header = () => {
  const backgroundColor = useColorModeValue('whiteAlpha.900', 'blackAlpha.800');

  return (
    <Grid
      as="header"
      width="full"
      padding={[4, 8]}
      position="sticky"
      top={0}
      zIndex={200}
    >
      <Grid
        templateColumns="auto 1fr"
        gap={4}
        background={backgroundColor}
        borderRadius={16}
        alignItems="center"
        p={4}
        paddingX={[4, 8]}
        width="full"
        maxW={1200}
        margin="0 auto"
      >
        <Link href="/">
          <Logo full />
        </Link>
        <Grid marginLeft="auto" gap={4} autoFlow="column">
          <Link href="/auth/sign-in">
            <Button
              colorScheme="teal"
              leftIcon={<RiLoginBoxLine />}
              variant="outline"
            >
              Sign In
            </Button>
          </Link>
          <ThemeToggle />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Header;
