'use client';

import {
  Card,
  createListCollection,
  Heading,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';

import { Button } from '~/components/ui/button';
import { Field } from '~/components/ui/field';
import { Radio, RadioGroup } from '~/components/ui/radio';
import {
  NativeSelectField,
  NativeSelectRoot,
} from '~/components/ui/native-select';
import { SelectRoot, SelectContent, SelectItem } from '~/components/ui/select';
import { Database } from '~/types/supabase';
import type { OttNodeDetails } from '~/types/ott';

import ResultCard from './ResultCard';

const ranks = createListCollection({
  items: [
    { value: 'No rank', label: 'No rank' },
    { value: 'Species', label: 'Species' },
    { value: 'Genus', label: 'Genus' },
    { value: 'Family', label: 'Family' },
    { value: 'Order', label: 'Order' },
    { value: 'Class', label: 'Class' },
    { value: 'Phylum', label: 'Phylum' },
  ],
});

type Clade = Database['public']['Tables']['clades']['Row'];

type Props = {
  openTreeResult?: OttNodeDetails | null;
  databaseResult?: Clade | null;
  lineage?: Clade[] | null;
  directChildren?: Clade[] | null;
};

const NodeDetails = ({
  databaseResult,
  openTreeResult,
  lineage,
  directChildren,
}: Props) => {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <Stack w="full" gap={8}>
        <Heading size="lg">Editing Data</Heading>
        <Card.Root>
          <Card.Body>
            <form>
              <Stack gap={4}>
                <Field label="Name">
                  ={' '}
                  <Input
                    placeholder="Name"
                    defaultValue={databaseResult?.name}
                  />
                </Field>

                <Field label="Common name">
                  <Input
                    placeholder="Common name"
                    defaultValue={databaseResult?.other_names || ''}
                  />
                </Field>

                <Field label="Rank">
                  <SelectRoot collection={ranks} defaultValue={[]}>
                    <SelectContent>
                      {ranks.items.map((item) => (
                        <SelectItem item={item} key={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </SelectRoot>
                </Field>

                <Field label="Status">
                  <RadioGroup
                    defaultValue={databaseResult?.extant ? 'true' : 'false'}
                  >
                    <Stack gap={5} direction="row">
                      <Radio colorPalette="red" value="false">
                        Extinct
                      </Radio>
                      <Radio colorPalette="green" value="true">
                        Extant
                      </Radio>
                    </Stack>
                  </RadioGroup>
                </Field>
              </Stack>
            </form>
          </Card.Body>
        </Card.Root>
        <Card.Root>
          <Card.Header>
            <Heading size="md">External Sources</Heading>
          </Card.Header>
          <Card.Body>
            <Stack gap={4}>
              <Stack gap={2} direction="row">
                <Field label="Source">
                  <NativeSelectRoot>
                    <NativeSelectField>
                      <select>OTT</select>
                    </NativeSelectField>
                  </NativeSelectRoot>
                </Field>
                {/* <Field label="ID">
                  <Input
                    placeholder="ID"
                    defaultValue={databaseResult?.ott_id}
                  />
                </Field> */}
              </Stack>
              <Button>Add</Button>
            </Stack>
          </Card.Body>
        </Card.Root>
        <Button onClick={() => setIsEditing(false)}>Save</Button>
      </Stack>
    );
  }

  return (
    <Stack w="full" gap={8}>
      <Heading size="lg">Database result</Heading>
      {!databaseResult && (
        <Stack>
          <Text>No result</Text>
          <Button>Create Node from Data</Button>
        </Stack>
      )}
      {databaseResult && (
        <>
          <ResultCard
            databaseResult={databaseResult}
            lineage={lineage}
            directChildren={directChildren}
            openTreeResult={openTreeResult}
          />
          <Button onClick={() => setIsEditing(true)}>Edit</Button>
        </>
      )}
    </Stack>
  );
};

export default NodeDetails;
