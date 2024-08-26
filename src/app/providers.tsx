'use client';

import { CacheProvider } from '@chakra-ui/next-js';

import { Chakra as ChakraProvider } from '~/lib/components/Chakra';

const Providers = ({
  colorMode,
  children,
}: {
  colorMode?: string;
  children: React.ReactNode;
}) => {
  return (
    <CacheProvider>
      <ChakraProvider colorMode={colorMode}>{children}</ChakraProvider>
    </CacheProvider>
  );
};

export default Providers;
