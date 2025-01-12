import { defineRecipe } from '@chakra-ui/react';

export const buttonRecipe = defineRecipe({
  variants: {
    variant: {
      solid: {
        bg: { base: 'colorPalette.500', _dark: 'colorPalette.600' },
        _hover: {
          bg: { base: 'colorPalette.600', _dark: 'colorPalette.700' },
        },
      },
    },
  },
  base: {
    colorPalette: 'teal',
  },
});
