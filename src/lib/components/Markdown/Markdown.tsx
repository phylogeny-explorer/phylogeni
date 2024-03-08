import { ListItem, OrderedList, Text } from '@chakra-ui/react';
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
  li: ListItem,
};

const Markdown = ({ children }: Options) => (
  <ReactMarkdown components={components}>{children}</ReactMarkdown>
);

export default Markdown;
