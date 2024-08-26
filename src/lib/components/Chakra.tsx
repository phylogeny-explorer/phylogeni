import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { setCookie } from 'cookies-next';

import customTheme from '~/lib/styles/theme/index';

type ChakraProps = {
  colorMode?: string;
  children: React.ReactNode;
};

export const Chakra = ({ colorMode, children }: ChakraProps) => {
  return (
    <>
      <ColorModeScript
        initialColorMode={customTheme.config?.initialColorMode}
        type="cookie"
      />
      <ChakraProvider
        colorModeManager={{
          type: 'cookie',
          ssr: true,
          get: (init) =>
            colorMode || init || customTheme.config?.initialColorMode,
          set: (value) => {
            setCookie('chakra-ui-color-mode', value);
          },
        }}
        theme={customTheme}
      >
        {children}
      </ChakraProvider>
    </>
  );
};
