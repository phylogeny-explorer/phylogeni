import {
  Link,
  ListItem,
  OrderedList,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import type { LinkProps } from '@chakra-ui/react';
import type { Options } from 'react-markdown';
import ReactMarkdown from 'react-markdown';

const components = {
  p: ({ children }: { children?: React.ReactNode }) => (
    <Text mb={2}>{children}</Text>
  ),
  ol: ({ children }: { children?: React.ReactNode }) => (
    <OrderedList spacing={2} pl={4} mb={2}>
      {children}
    </OrderedList>
  ),
  ul: ({ children }: { children?: React.ReactNode }) => (
    <UnorderedList spacing={2} pl={4} mb={2}>
      {children}
    </UnorderedList>
  ),
  li: ListItem,
  a: (props: LinkProps) => (
    <Link {...props} isExternal color="teal.600" textDecoration="underline" />
  ),
};

const Markdown = ({ children }: Options) => (
  <ReactMarkdown components={components}>{children}</ReactMarkdown>
);

export default Markdown;
