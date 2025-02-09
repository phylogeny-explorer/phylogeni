import { Card, HStack, Image, Text } from '@chakra-ui/react';
import NextImage from 'next/image';
import { LuImage } from 'react-icons/lu';

import { EmptyState } from '~/components/ui/empty-state';

interface InfoBoxProps {
  header: string;
  image?: string;
  children?: React.ReactNode;
}

export default function InfoBox({ header, image, children }: InfoBoxProps) {
  return (
    <Card.Root variant="elevated" bg="bg.panel" w="sm">
      <Card.Header>
        <HStack justify="space-between">
          <Text fontWeight="semibold" fontSize="xl">
            {header}
          </Text>
        </HStack>
      </Card.Header>
      <Card.Body gap="8" alignItems="stretch">
        {!image && (
          <EmptyState
            title="No image"
            description="No image available"
            icon={<LuImage />}
          />
        )}
        {image && (
          <Image
            asChild
            alt={header}
            width="320px"
            // height="320px"
            fit="contain"
          >
            <NextImage src={image} alt={header} width={320} height={320} />
          </Image>
        )}

        {children}
      </Card.Body>
    </Card.Root>
  );
}
