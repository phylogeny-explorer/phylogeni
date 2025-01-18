'use client';

import { Flex, Icon, Image, Stack, Text } from '@chakra-ui/react';
import NextImage from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { RiAddLargeFill, RiEdit2Fill, RiProfileLine } from 'react-icons/ri';
import { TbBinaryTree } from 'react-icons/tb';

import { Database } from '~/types/supabase';
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
} from '~/components/ui/drawer';
import Markdown from '~/lib/components/Markdown';
import SidebarButton from './SidebarButton';

type Clade = Database['public']['Tables']['clades']['Row'];
type CladeWithImage = Clade & { image?: string };

const CladeSidebar = ({ data }: { data: CladeWithImage }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams);

  // console.log('CladeSidebar', data);

  const [date, setDate] = useState(
    new Date(data.modified || data.created_at)?.toLocaleDateString('en-US')
  );

  useEffect(() => {
    setDate(new Date(data.modified || data.created_at).toLocaleDateString());
  }, [data]);

  return (
    <DrawerRoot
      open={!!searchParams.get('selected_node_id')}
      placement="start"
      onOpenChange={() => {
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

        {data.image && (
          <Image
            asChild
            alt={data.name}
            width="320px"
            height="320px"
            fit="contain"
          >
            <NextImage
              src={data.image}
              alt={data.name}
              width={320}
              height={320}
            />
          </Image>
        )}
        <DrawerBody>
          <Stack gap={4}>
            <Flex justify="space-between">
              <SidebarButton text="Tree">
                <Icon transform="rotate(-90deg)" h={5} w={5}>
                  <TbBinaryTree />
                </Icon>
              </SidebarButton>
              <SidebarButton text="View">
                <RiProfileLine />
              </SidebarButton>
              <SidebarButton text="Edit">
                <RiEdit2Fill />
              </SidebarButton>
              <SidebarButton text="Add">
                <RiAddLargeFill />
              </SidebarButton>
            </Flex>

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

        <DrawerFooter>Last edited {date}</DrawerFooter>
      </DrawerContent>
    </DrawerRoot>
  );
};

export default CladeSidebar;
