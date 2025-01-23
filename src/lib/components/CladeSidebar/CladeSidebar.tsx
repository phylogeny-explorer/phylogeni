'use client';

import { Flex, Icon, Image, Stack, Text } from '@chakra-ui/react';
import NextImage from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { use } from 'react';
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

const CladeSidebar = ({
  data: dataPromise,
}: {
  data: Promise<CladeWithImage | null>;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams);

  const data = use(dataPromise);
  // console.log(data);

  return (
    <DrawerRoot
      open
      placement="start"
      onOpenChange={() => {
        newSearchParams.delete('selected_node_id');
        router.push(`${pathname}?${newSearchParams.toString()}`);
      }}
    >
      <DrawerBackdrop />
      <DrawerContent>
        <DrawerCloseTrigger colorPalette="gray" />
        <DrawerHeader>
          <Text as="h2" fontSize="lg" fontWeight="bold">
            {data?.name || 'Clade details'}
          </Text>
        </DrawerHeader>

        {data?.image && (
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
        {data && (
          <>
            <DrawerBody pt={4}>
              <Stack gap={4}>
                <Flex justify="space-between">
                  <SidebarButton
                    text="Tree"
                    onClick={() => router.push(`/tree?node_id=${data.id}`)}
                  >
                    <Icon transform="rotate(-90deg)" h={5} w={5}>
                      <TbBinaryTree />
                    </Icon>
                  </SidebarButton>
                  <SidebarButton
                    text="View"
                    onClick={() => router.push(`/clade/${data.id}`)}
                  >
                    <RiProfileLine />
                  </SidebarButton>
                  <SidebarButton
                    text="Edit"
                    onClick={() => router.push(`/clade/${data.id}/edit`)}
                  >
                    <RiEdit2Fill />
                  </SidebarButton>
                  <SidebarButton
                    text="Add"
                    onClick={() => router.push('/clade/add')}
                  >
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
            <DrawerFooter>
              Last edited{' '}
              {new Date(data.modified || data.created_at).toLocaleDateString()}
            </DrawerFooter>
          </>
        )}
        {!data && (
          <DrawerBody>
            <Text>No clade selected</Text>
          </DrawerBody>
        )}
      </DrawerContent>
    </DrawerRoot>
  );
};

export default CladeSidebar;
