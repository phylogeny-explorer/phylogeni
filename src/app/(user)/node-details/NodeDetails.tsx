'use client';

import {
  Card,
  Heading,
  Input,
  SelectLabel,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';

import { Button } from '~/components/ui/button';
import { Field } from '~/components/ui/field';
import { Radio, RadioGroup } from '~/components/ui/radio';
import { SelectRoot, SelectContent, SelectItem } from '~/components/ui/select';
import type { NodeDetails as Result, Node } from '~/types/database';
import type { OttNodeDetails } from '~/types/ott';

import ResultCard from './ResultCard';

type Props = {
  openTreeResult?: OttNodeDetails | null;
  databaseResult?: Result | null;
  lineage?: Node[] | null;
  directChildren?: Node[] | null;
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
                    defaultValue={databaseResult?.commonNames}
                  />
                </Field>

                <Field label="Rank">
                  <SelectRoot defaultValue={databaseResult?.rank}>
                    <SelectContent>
                      <SelectItem>No rank</SelectItem>
                      <SelectItem>Species</SelectItem>
                      <SelectItem>Genus</SelectItem>
                      <SelectItem>Family</SelectItem>
                      <SelectItem>Order</SelectItem>
                      <SelectItem>Class</SelectItem>
                      <SelectItem>Phylum</SelectItem>
                    </SelectContent>
                  </SelectRoot>
                </Field>

                <Field label="Status">
                  <RadioGroup defaultValue={databaseResult?.extant}>
                    <Stack gap={5} direction="row">
                      <Radio colorPalette="red" value="False">
                        Extinct
                      </Radio>
                      <Radio colorPalette="green" value="True">
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
                <Field>
                  <SelectRoot>
                    <SelectLabel>Source</SelectLabel>
                    <SelectContent>
                      <SelectItem>OTT</SelectItem>
                    </SelectContent>
                  </SelectRoot>
                </Field>
                <Field label="ID">
                  <Input
                    placeholder="ID"
                    defaultValue={databaseResult?.ott_id}
                  />
                </Field>
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
