import { Flex, Heading, Image, Link, Stack, Text } from '@chakra-ui/react';
import type { Metadata } from 'next/types';

import BackButton from '~/lib/components/BackButton';
import MotionBox from '~/lib/components/motion/Box';

export const metadata: Metadata = {
  title: '404 Not Found',
};

const Page404 = () => {
  return (
    <Flex minHeight="80vh" direction="column" justifyContent="center">
      <MotionBox
        animate={{
          y: 20,
          transition: { repeat: Infinity, duration: 2, repeatType: 'reverse' },
        }}
        width={{ base: '100%', sm: '70%', md: '60%' }}
        margin="0 auto"
      >
        <Image
          src="/404 Error-pana.svg"
          alt="Error 404 not found Illustration"
        />
      </MotionBox>
      <Text textAlign="center" fontSize="xs" color="gray">
        <Link
          href="https://freepik.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Illustration by Freepik
        </Link>
      </Text>

      <Stack marginY={4} gap={4} align="center">
        <Heading size="lg">Page not Found.</Heading>
        <BackButton size="sm">Let&apos;s Head Back</BackButton>
      </Stack>
    </Flex>
  );
};

export default Page404;
