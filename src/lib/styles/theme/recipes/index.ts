import { defineRecipe, type RecipeDefinition } from '@chakra-ui/react';

import { buttonRecipe } from './button';

export const recipes: Record<string, RecipeDefinition> = {
  button: buttonRecipe,
  checkbox: defineRecipe({
    base: {
      colorPalette: 'teal',
    },
  }),
};
