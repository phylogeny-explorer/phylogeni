'use client';

import { usePathname } from 'next/navigation';
import { Box } from '@chakra-ui/react';

import { SearchButton, MobileSearchButton } from './SearchButton';
import { CommandMenu } from './CommandMenu';

const SearchBar = () => {
  const pathname = usePathname();

  if (pathname !== '/tree') {
    return null;
  }

  return (
    <>
      <Box hideBelow="md">
        <CommandMenu
          trigger={<SearchButton width="256px" size="sm" flexShrink="1" />}
        />
      </Box>
      <Box hideFrom="md">
        <CommandMenu trigger={<MobileSearchButton />} disableHotkey />
      </Box>
    </>
  );
};

export default SearchBar;
