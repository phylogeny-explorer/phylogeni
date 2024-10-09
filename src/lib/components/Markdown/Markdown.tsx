'use client';

import { Link, Text, List } from '@chakra-ui/react';
import type { LinkProps } from '@chakra-ui/react';
import type { Options } from 'react-markdown';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

const components = {
  p: ({ children }: { children?: React.ReactNode }) => (
    <Text mb={2}>{children}</Text>
  ),
  ol: ({ children }: { children?: React.ReactNode }) => (
    <List.Root as="ol" gap={2} pl={4} mb={2}>
      {children}
    </List.Root>
  ),
  ul: ({ children }: { children?: React.ReactNode }) => (
    <List.Root gap={2} pl={4} mb={2}>
      {children}
    </List.Root>
  ),
  li: ({ children }: { children?: React.ReactNode }) => (
    <List.Item>{children}</List.Item>
  ),
  a: (props: LinkProps) => (
    <Link
      {...props}
      color="teal.600"
      variant="underline"
      target="_blank"
      rel="noopener noreferrer"
    />
  ),
};

const Markdown = ({ children }: Options) => (
  <ReactMarkdown rehypePlugins={[rehypeRaw]} components={components}>
    {children}
  </ReactMarkdown>
);

export default Markdown;
