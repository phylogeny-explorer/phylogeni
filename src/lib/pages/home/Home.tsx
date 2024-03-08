'use client';

import { Flex } from '@chakra-ui/react';

import Section from '~/lib/components/website/Section';

import { sections } from './config';

const Home = () => {
  return (
    <Flex
      as="main"
      direction="column"
      alignItems="center"
      justifyContent="center"
      w="full"
    >
      {sections.map((section) => (
        <Section key={section.id} {...section} />
      ))}
    </Flex>
  );
};

export default Home;
