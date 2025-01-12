import { createSystem, defaultConfig } from '@chakra-ui/react';

// import { colors } from './colors';
import { fonts } from './fonts';
import { recipes } from './recipes';

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts,
      // colors,
    },
    semanticTokens: {
      colors: {
        focusRing: {
          value:
            'color-mix(in srgb, var(--chakra-colors-teal-500) 50%, transparent)',
        },
      },
    },
    recipes,
  },
  globalCss: {
    '.rd3t-g .rd3t-link': {
      stroke: { base: 'gray.300 !important', _dark: 'gray.700/50 !important' },
    },
  },
});
