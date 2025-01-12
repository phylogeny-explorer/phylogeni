'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Database } from '~/types/supabase';
import {
  DrawerBackdrop,
  DrawerRoot,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerContent,
  DrawerCloseTrigger,
} from '~/components/ui/drawer';
import Markdown from '~/lib/components/Markdown';
import { Stack, Text } from '@chakra-ui/react';

type Clade = Database['public']['Tables']['clades']['Row'];

const CladeSidebar = ({ data }: { data: Clade | null }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams);

  console.log('CladeSidebar', data);

  if (!data) return null;

  return (
    <DrawerRoot
      open={!!searchParams.get('selected_node_id')}
      placement="start"
      onOpenChange={(e) => {
        console.log(e);
        newSearchParams.delete('selected_node_id');
        router.push(`${pathname}?${newSearchParams.toString()}`);
      }}
    >
      <DrawerBackdrop />
      <DrawerContent>
        <DrawerCloseTrigger />
        <DrawerHeader>
          <Text as="h2" fontSize="lg" fontWeight="bold">
            {data.name}
          </Text>
        </DrawerHeader>

        <DrawerBody>
          <Stack gap={4}>
            <Text as="h3" fontSize="sm" fontWeight="bold">
              ID
            </Text>
            <Text>{data.id}</Text>

            <Text as="h3" fontSize="sm" fontWeight="bold">
              Other names
            </Text>
            <Text>{data.other_names}</Text>

            <Text as="h3" fontSize="md" fontWeight="bold">
              Description
            </Text>
            <Stack gap={1}>
              <Markdown>{data.description}</Markdown>
            </Stack>
          </Stack>
        </DrawerBody>

        <DrawerFooter>
          Last edited{' '}
          {new Date(data.modified || data.created_at).toLocaleDateString()}
        </DrawerFooter>
      </DrawerContent>
    </DrawerRoot>
  );
};

export default CladeSidebar;
