'use client';

import { ChakraProvider } from '@chakra-ui/react';

import { system } from '~/lib/styles/theme';

import { ColorModeProvider } from './color-mode';

function Provider({ children }: React.PropsWithChildren) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider>{children}</ColorModeProvider>
    </ChakraProvider>
  );
}

export default Provider;
