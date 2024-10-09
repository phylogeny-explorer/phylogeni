'use client';

import { Box } from '@chakra-ui/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import {
  DrawerBackdrop,
  DrawerRoot,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerContent,
  DrawerCloseTrigger,
} from '~/components/ui/drawer';
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

  return (
    <Box
      as="main"
      width="100%"
      height="100%"
      background={{ base: 'gray.50', _dark: 'gray.900' }}
    >
      <DrawerRoot
        open={!!searchParams.get('selected_node_id')}
        placement="start"
        onClose={() => {
          newSearchParams.delete('selected_node_id');
          router.push(`${pathname}?${newSearchParams.toString()}`);
        }}
      >
        <DrawerBackdrop />
        <DrawerContent>
          <DrawerCloseTrigger />
          <DrawerHeader>Node Details</DrawerHeader>

          <DrawerBody>Body</DrawerBody>

          <DrawerFooter>Footer</DrawerFooter>
        </DrawerContent>
      </DrawerRoot>
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
