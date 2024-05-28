'use client';

import { Button, Flex, Grid, Text } from '@chakra-ui/react';

import Carousel from '~/lib/components/Carousel';
import Section from '~/lib/components/website/Section';

import { contact, sections } from './config';

const Home = () => {
  return (
    <Flex
      as="main"
      direction="column"
      alignItems="center"
      justifyContent="center"
      w="full"
    >
      <Carousel data={sections} />

      <Grid
        gap={[8, 16]}
        p={[8, 16]}
        w="full"
        maxW={1200}
        margin="0 auto"
        justifyItems="center"
      >
        <Button colorScheme="teal" size="lg">
          Get Started
        </Button>
        <Text
          fontSize="3xl"
          casing="uppercase"
          fontWeight={300}
          letterSpacing={2.5}
        >
          Explore Evolution,{' '}
          <Text color="teal.500" as="span">
            Discover Biodiversity
          </Text>
        </Text>
      </Grid>
      <Section {...contact} />
    </Flex>
  );
};

export default Home;
