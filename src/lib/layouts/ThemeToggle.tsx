import { IconButton } from '@chakra-ui/react';
import { RiMoonFill, RiSunLine } from 'react-icons/ri';

import { useColorMode } from '~/components/ui/color-mode';

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      aria-label="theme toggle"
      onClick={toggleColorMode}
      colorPalette="teal"
      variant="ghost"
    >
      {colorMode === 'light' ? <RiMoonFill /> : <RiSunLine />}
    </IconButton>
  );
};

export default ThemeToggle;
