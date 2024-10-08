'use client';

import {
  Card,
  CardBody,
  Heading,
  UnorderedList,
  ListItem,
  Stack,
  Text,
  Divider,
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
    <Card>
      <CardBody>
        <Stack>
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
              <Divider />

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
            <>
              <Divider />
              <Heading size="sm">Sources</Heading>
              <UnorderedList ml={8}>
                {sources?.map((source) => (
                  <ListItem key={source.id}>
                    <Markdown>{source.name}</Markdown>
                  </ListItem>
                ))}
              </UnorderedList>
            </>
          )}
        </Stack>
      </CardBody>
    </Card>
  );
};

export default GbifResultCard;
