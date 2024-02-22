import type { DeepPartial, Theme } from '@chakra-ui/react';

/** extend additional color here */
const extendedColors: DeepPartial<
  Record<string, Theme['colors']['blackAlpha']>
> = {
  brand: {
    100: '',
    200: '',
    300: '',
    400: '',
    500: '',
    600: '',
    700: '',
    800: '',
    900: '',
  },
};

/** override chakra colors here */
const overridenChakraColors: DeepPartial<Theme['colors']> = {
  gray: {
    '50': '#F2F3F2',
    '100': '#DADDDC',
    '200': '#C1C7C5',
    '300': '#A9B2AF',
    '400': '#919C98',
    '500': '#798682',
    '600': '#616B68',
    '700': '#49504E',
    '800': '#303634',
    '900': '#181B1A',
  },
  teal: {
    '50': '#E9FBF6',
    '100': '#C3F4E6',
    '200': '#9CEDD6',
    '300': '#75E6C6',
    '400': '#4EDFB6',
    '500': '#27D8A6',
    '600': '#20AC84',
    '700': '#188163',
    '800': '#105642',
    '900': '#082B21',
  },
};

export const colors = {
  ...overridenChakraColors,
  ...extendedColors,
};
