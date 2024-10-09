import { createSystem, defaultConfig } from '@chakra-ui/react';

// import { colors } from './colors';
import { fonts } from './fonts';
import { recipes } from './recipes';
// import { config } from './config';

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts,
      // colors,
    },
    recipes,
  },
  globalCss: {
    '.rd3t-g .rd3t-link': {
      stroke: 'gray.300',
    },
  },
});
