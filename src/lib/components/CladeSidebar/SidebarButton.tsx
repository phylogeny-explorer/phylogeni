'use client';

import { Button, ButtonProps, Center } from '@chakra-ui/react';

interface Props extends Pick<ButtonProps, 'onClick'> {
  text: string;
  children: JSX.Element;
}

const SidebarButton = ({ text, children, ...props }: Props) => {
  return (
    <Button
      variant="plain"
      flexDir="column"
      fontSize="small"
      h="unset"
      px={2}
      color="white"
      {...props}
    >
      <Center
        bg="teal"
        p={0}
        h={12}
        w={12}
        borderRadius="50%"
        transition="transform"
        _hover={{
          transform: 'scale(1.1)',
        }}
      >
        {children}
      </Center>
      {text}
    </Button>
  );
};

export default SidebarButton;
