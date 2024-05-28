import {
  Box,
  Button,
  Grid,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';
import Image from 'next/image';

import Markdown from '~/lib/components/Markdown';
import Contact from '~/lib/components/website/Contact';

type SectionProps = {
  id: string;
  title: string;
  content: string;
  image?: string;
  background?: string;
};

const Section = ({ id, title, content, image, background }: SectionProps) => {
  const tealBackground = useColorModeValue('teal.50', 'teal.800');
  const defaultBackground = useColorModeValue(
    'blackAlpha.50',
    'blackAlpha.400'
  );

  const isContact = id === 'contact';

  return (
    <Grid
      id={id}
      width="full"
      background={background === 'teal' ? tealBackground : defaultBackground}
    >
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
            maxHeight: 430,
            background: 'black',
          }}
        />
      )}
      <Grid
        width="full"
        maxW={1200}
        margin="0 auto"
        p={[8, 16]}
        gap={8}
        templateColumns={['unset', isContact ? '1fr 1fr' : '2fr 1fr']}
      >
        <Box width="full" maxW={1200} margin="0 auto">
          <Heading fontSize={['4xl', '5xl']} fontWeight="normal" mb={4}>
            {title}
          </Heading>
          <Markdown>{content}</Markdown>
        </Box>
        {isContact ? <Contact /> : <Button ml="auto">Get started</Button>}
      </Grid>
    </Grid>
  );
};

export default Section;
