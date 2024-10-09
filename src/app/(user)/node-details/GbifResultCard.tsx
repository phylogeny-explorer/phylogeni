'use client';

import {
  Card,
  Heading,
  List,
  Stack,
  Text,
  StackSeparator,
} from '@chakra-ui/react';

import DescriptionList from '~/lib/components/DescriptionList';
import Markdown from '~/lib/components/Markdown';
import type { Species } from '~/types/gbif';

// import MatchText from './MatchText';

const GbifResultCard = ({
  canonicalName,
  authorship,
  sources,
  commonNames,
}: Species) => {
  return (
    <Card.Root>
      <Card.Body>
        <Stack separator={<StackSeparator />}>
          <DescriptionList
            items={[
              { key: 'Name', value: canonicalName },
              { key: 'Common names', value: commonNames?.join(', ') },
              {
                key: 'Authorship',
                value:
                  authorship &&
                  `${authorship?.name}, ${
                    !authorship?.isOriginalAuthor ? '(' : ''
                  }${authorship?.year}${!authorship?.isOriginalAuthor ? ')' : ''}`,
              },
            ]}
          />

          {commonNames && <Text>Common names: {commonNames.join(', ')}</Text>}

          {/* {authorship && (
            <>
              <Heading size="sm">Authorship</Heading>
              <DescriptionList
                items={[
                  { key: 'Name', value: authorship.name },
                  { key: 'Year', value: authorship.year?.toString() },
                  {
                    key: 'Is original author',
                    value: authorship?.isOriginalAuthor ? 'Yes' : 'No',
                  },
                  {
                    key: 'As string',
                    value: `${authorship?.name}, ${
                      !authorship?.isOriginalAuthor ? '(' : ''
                    }${authorship?.year}${!authorship?.isOriginalAuthor ? ')' : ''}`,
                  },
                ]}
              />
            </>
          )} */}

          {sources && (
            <div>
              <Heading size="sm">Sources</Heading>
              <List.Root ml={8}>
                {sources?.map((source) => (
                  <List.Item key={source.id}>
                    <Markdown>{source.name}</Markdown>
                  </List.Item>
                ))}
              </List.Root>
            </div>
          )}
        </Stack>
      </Card.Body>
    </Card.Root>
  );
};

export default GbifResultCard;
