'use client';

import {
  Box,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useColorModeValue,
} from '@chakra-ui/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import Tree from '~/lib/components/Tree';
import type { Node } from '~/types/tree';

interface Props {
  data: Node;
}

const Dendrogram = ({ data }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams);

  const backgroundColor = useColorModeValue('gray.50', 'gray.900');
  return (
    <Box as="main" width="100%" height="100%" background={backgroundColor}>
      <Drawer
        isOpen={!!searchParams.get('selected_node_id')}
        placement="left"
        onClose={() => {
          newSearchParams.delete('selected_node_id');
          router.push(`${pathname}?${newSearchParams.toString()}`);
        }}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Node Details</DrawerHeader>

          <DrawerBody>Body</DrawerBody>

          <DrawerFooter>Footer</DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Tree
        data={data}
        onClickNode={(id) => {
          newSearchParams.set('selected_node_id', id);
          router.push(`${pathname}?${newSearchParams.toString()}`);
        }}
      />
    </Box>
  );
};

export default Dendrogram;
