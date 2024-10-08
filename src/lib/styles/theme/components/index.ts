import { Button } from './button';

export const components = {
  Button,
  Input: {
    defaultProps: {
      focusBorderColor: 'teal.500',
    },
  },
  Textarea: {
    defaultProps: {
      focusBorderColor: 'teal.500',
    },
  },
  Checkbox: {
    defaultProps: {
      colorScheme: 'teal',
    },
  },
};
