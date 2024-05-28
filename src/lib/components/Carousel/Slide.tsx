import { Grid, Heading, useColorModeValue } from '@chakra-ui/react';
import Image from 'next/image';

import Markdown from '../Markdown';

import type { Item } from './Carousel';

interface Props extends Item {
  slideHeightDesktop: number;
  slideHeightMobile: number;
}

const Slide = ({
  title,
  content,
  image,
  imagePosition,
  slideHeightDesktop,
  slideHeightMobile,
}: Props) => {
  const cardBackground = useColorModeValue('blackAlpha.50', 'blackAlpha.400');

  return (
    <Grid
      justifyContent="center"
      position="relative"
      w={['full', '1168px']}
      paddingX={4}
    >
      <Grid
        borderRadius={16}
        maxW="1168px"
        overflow="hidden"
        templateAreas={['"image" "content"', '"content image"']}
        templateColumns={['unset', '364px 1fr']}
        templateRows={['180px', 'unset']}
        h={[slideHeightMobile, slideHeightDesktop]}
        w={['calc(100vw - 2rem)', 'calc(100vw - 4rem)']}
      >
        <Grid
          gap={[4, 8]}
          h="full"
          alignContent="start"
          gridArea="content"
          bgColor={cardBackground}
          p={[4, 8]}
        >
          <Heading fontSize={['2xl', '3xl']}>{title}</Heading>
          <Markdown>{content}</Markdown>
        </Grid>
        <Grid gridArea="image" h="full" position="relative">
          <Image
            src={image}
            alt={title}
            fill
            draggable={false}
            style={{
              objectFit: 'cover',
              objectPosition: imagePosition || 'left top',
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Slide;
