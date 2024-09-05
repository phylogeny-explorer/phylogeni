'use client';

import {
  Card,
  CardBody,
  Heading,
  UnorderedList,
  ListItem,
  Stack,
  Text,
} from '@chakra-ui/react';

import Markdown from '~/lib/components/Markdown';
import type { Species } from '~/types/gbif';

// import MatchText from './MatchText';

const GbifResultCard = ({ authorship, sources, commonNames }: Species) => {
  return (
    <Card>
      <CardBody>
        <Stack>
          {commonNames && <Text>Common names: {commonNames.join(', ')}</Text>}
          <Heading size="sm">Authorship</Heading>
          <Stack spacing={1} ml={4}>
            <Text>Name: {authorship?.name}</Text>

            {authorship?.year && <Text>Year: {authorship.year}</Text>}

            <Text>
              Is original author: {authorship?.isOriginalAuthor ? 'yes' : 'no'}
            </Text>

            <Text>
              Authorship as string: {authorship?.name},{' '}
              {authorship?.isOriginalAuthor ? '(' : ''}
              {authorship?.year}
              {authorship?.isOriginalAuthor ? ')' : ''}
            </Text>
          </Stack>

          <Heading size="sm">Sources</Heading>
          <UnorderedList>
            {sources?.map((source) => (
              <ListItem key={source.id}>
                <Markdown>{source.name}</Markdown>
              </ListItem>
            ))}
          </UnorderedList>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default GbifResultCard;
