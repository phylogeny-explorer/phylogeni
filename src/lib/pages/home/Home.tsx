'use client';

import { Flex, Grid, Text } from '@chakra-ui/react';

import { Button } from '~/components/ui/button';
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
        <Button size="lg">Get Started</Button>
        <Text
          fontSize={['xl', '3xl']}
          fontWeight={300}
          letterSpacing={2.5}
          textAlign="center"
        >
          EXPLORE EVOLUTION,{' '}
          <Text color="teal.500" as="span">
            DISCOVER BIODIVERSITY
          </Text>
        </Text>
      </Grid>
      <Section {...contact} />
    </Flex>
  );
};

export default Home;
