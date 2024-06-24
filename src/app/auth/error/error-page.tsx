'use client';

import { Flex, Heading } from '@chakra-ui/react';
import { useSearchParams } from 'next/navigation';

const AuthError = () => {
  const params = useSearchParams();
  const error = params.get('error');

  return (
    <Flex>
      <Heading size="lg">{error || 'Something went wrong!'}</Heading>
    </Flex>
  );
};

export default AuthError;
