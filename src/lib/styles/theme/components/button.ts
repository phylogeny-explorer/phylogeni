import type { ComponentStyleConfig } from '@chakra-ui/react';

export const Button: ComponentStyleConfig = {
  baseStyle: {
    // borderRadius: 'full',
  },
  variants: {
    solid: (props) =>
      props.colorScheme === 'teal'
        ? {
            bg: `teal.${props.colorMode === 'dark' ? '600' : '500'}`,
            color: 'white',
            _hover: {
              bg: `teal.${props.colorMode === 'dark' ? '500' : '600'}`,
            },
          }
        : {},
  },
  defaultProps: {
    colorScheme: 'teal',
  },
};
