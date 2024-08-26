import { extendTheme } from '@chakra-ui/react';

import { colors } from './colors';
import { components } from './components';
import { config } from './config';
import { fonts } from './fonts';

const customTheme = extendTheme({
  fonts,
  colors,
  config,
  components,
  styles: {
    global: {
      '.rd3t-g .rd3t-link': {
        stroke: 'gray.300',
      },
    },
  },
});

export default customTheme;
