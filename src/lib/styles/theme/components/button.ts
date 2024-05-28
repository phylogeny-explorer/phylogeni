import type { ComponentStyleConfig } from '@chakra-ui/react';

export const Button: ComponentStyleConfig = {
  baseStyle: {
    // borderRadius: 'full',
  },
  variants: {
    solid: (props) => ({
      bg: props.colorMode === 'dark' ? 'teal.600' : 'teal.500',
      color: 'white',
      _hover: {
        bg: 'teal.600',
      },
    }),
  },
  defaultProps: {
    colorScheme: 'teal',
  },
};
