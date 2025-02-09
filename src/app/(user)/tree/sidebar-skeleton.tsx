import { Box, Flex, Stack } from '@chakra-ui/react';
import {
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from '~/components/ui/skeleton';

const SidebarSkeleton = () => {
  return (
    <
      // direction="column"
      // pos="fixed"
      // w="100%"
      // h="100dvh"
      // maxH="100vh"
      // zIndex="modal"
      // bg="bg.panel"
      // boxShadow="lg"
      // maxW="xs"
    >
      <Skeleton width="9" height="9" pos="absolute" top="2" right="2" />
      <Box w="100%" paddingInline="6" pt="6" pb="4">
        <SkeletonText noOfLines={1} fontSize="lg" />
      </Box>
      <Skeleton height="xs" w="100%" />
      <Box paddingInline="6" pt="4" pb="2" flex={1} overflow="auto">
        <Stack gap={4}>
          <Flex justify="space-between">
            <SkeletonCircle size="10" />
            <SkeletonCircle size="10" />
            <SkeletonCircle size="10" />
            <SkeletonCircle size="10" />
          </Flex>

          <Skeleton width="20" height="1.2em" />
          <SkeletonText noOfLines={1} />

          <Skeleton width="20" height="1.2em" />
          <SkeletonText noOfLines={1} />

          <Skeleton width="20" height="1.2em" />
          <SkeletonText noOfLines={5} />
        </Stack>
      </Box>
    </>
  );
};

export default SidebarSkeleton;
