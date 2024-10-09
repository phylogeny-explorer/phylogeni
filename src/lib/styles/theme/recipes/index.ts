import type { RecipeDefinition } from '@chakra-ui/react';

import { buttonRecipe } from './button';

export const recipes: Record<string, RecipeDefinition> = {
  button: buttonRecipe,
  input: {
    base: {
      colorPalette: 'teal',
    },
  },
  textarea: {
    base: {
      colorPalette: 'teal',
    },
  },
  checkbox: {
    base: {
      colorPalette: 'teal',
    },
  },
};
