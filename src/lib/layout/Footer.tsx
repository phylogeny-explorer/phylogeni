import { Flex, Link, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Flex as="footer" width="full" justifyContent="center">
      <Text fontSize="sm">
        {new Date().getFullYear()} -{' '}
        <Link
          href="https://phylogenyexplorerproject.org"
          isExternal
          rel="noopener noreferrer"
        >
          Phylogeny Explorer Project
        </Link>
      </Text>
    </Flex>
  );
};

export default Footer;
