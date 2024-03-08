import { Box, Button, Grid, Heading } from '@chakra-ui/react';
import Image from 'next/image';

import Markdown from '~/lib/components/Markdown';

type SectionProps = {
  id: string;
  title: string;
  content: string;
  image?: string;
  background?: string;
};

const Section = ({ id, title, content, image, background }: SectionProps) => {
  return (
    <Grid id={id} width="full">
      {image && (
        <Image
          src={image}
          alt={title}
          width={0}
          height={0}
          sizes="100vw"
          priority
          style={{
            objectFit: 'cover',
            width: '100%',
            height: 430,
            background: 'black',
          }}
        />
      )}
      <Grid
        width="full"
        p={[8, 16]}
        gap={8}
        templateColumns={['unset', '2fr 1fr']}
        background={background}
      >
        <Box>
          <Heading fontSize={['4xl', '5xl']} fontWeight="normal" mb={4}>
            {title}
          </Heading>
          <Markdown>{content}</Markdown>
        </Box>
        <Button ml="auto">Get started</Button>
      </Grid>
    </Grid>
  );
};

export default Section;
