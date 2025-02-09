import { Box, Flex, Icon, Image, Stack, Text } from '@chakra-ui/react';
import NextImage from 'next/image';
import { RiAddLargeFill, RiEdit2Fill, RiProfileLine } from 'react-icons/ri';
import { LuImage } from 'react-icons/lu';
import { TbBinaryTree } from 'react-icons/tb';

import { EmptyState } from '~/components/ui/empty-state';
import Markdown from '~/lib/components/Markdown';
import SidebarCloseButton from '~/lib/components/CladeSidebar/SidebarCloseButton';
import SidebarButton from '~/lib/components/CladeSidebar/SidebarButton';

import getClade from './getClade';

export default async function Sidebar({ nodeId }: { nodeId?: string }) {
  const data = nodeId ? await getClade(nodeId) : null;

  if (!data) {
    return null;
  }

  return (
    <>
      <SidebarCloseButton />
      <Box w="100%" paddingInline="6" pt="6" pb="4">
        <Text as="h2" fontSize="lg" fontWeight="bold">
          {data?.name || 'Clade details'}
        </Text>
      </Box>

      {data.image ? (
        <Image asChild alt={data.name} width="320px" height="320px" fit="cover">
          <NextImage
            src={data.image}
            alt={data.name}
            width={320}
            height={320}
          />
        </Image>
      ) : (
        <EmptyState
          title="No image"
          description="No image available"
          icon={<LuImage />}
          h="320px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        />
      )}

      <Box paddingInline="6" pt="4" pb="2" flex={1} overflow="auto">
        <Stack gap={4}>
          <Flex justify="space-between">
            <SidebarButton text="Tree" href={`/tree?node_id=${data.id}`}>
              <Icon transform="rotate(-90deg)" h={5} w={5}>
                <TbBinaryTree />
              </Icon>
            </SidebarButton>
            <SidebarButton text="View" href={`/clade/${data.id}`}>
              <RiProfileLine />
            </SidebarButton>
            <SidebarButton text="Edit" href={`/clade/${data.id}/edit`}>
              <RiEdit2Fill />
            </SidebarButton>
            <SidebarButton text="Add" href={'/clade/add'}>
              <RiAddLargeFill />
            </SidebarButton>
          </Flex>

          {data.other_names && (
            <>
              <Text as="h3" fontSize="sm" fontWeight="bold">
                Other names
              </Text>
              <Text>{data.other_names}</Text>
            </>
          )}

          <Text as="h3" fontSize="md" fontWeight="bold">
            Description
          </Text>
          <Stack gap={1}>
            <Markdown>{data.description}</Markdown>
          </Stack>
        </Stack>
      </Box>
      <Flex paddingInline="6" pt="4" pb="6" justify="end">
        <Text fontSize="sm" color="subtle">
          Last edited{' '}
          {new Date(data.modified || data.created_at).toLocaleDateString()}
        </Text>
      </Flex>
    </>
  );
}
