'use client';

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';

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
      <Stack w="full" spacing={8}>
        <Heading size="lg">Editing Data</Heading>
        <Card>
          <CardBody>
            <form>
              <Stack spacing={4}>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input
                    placeholder="Name"
                    defaultValue={databaseResult?.name}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Common names</FormLabel>
                  <Input
                    placeholder="Common names"
                    defaultValue={databaseResult?.commonNames}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Rank</FormLabel>
                  <Select defaultValue={databaseResult?.rank}>
                    <option>No rank</option>
                    <option>Species</option>
                    <option>Genus</option>
                    <option>Family</option>
                    <option>Order</option>
                    <option>Class</option>
                    <option>Phylum</option>
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel>Status</FormLabel>
                  <RadioGroup defaultValue={databaseResult?.extant}>
                    <Stack spacing={5} direction="row">
                      <Radio colorScheme="red" value="False">
                        Extinct
                      </Radio>
                      <Radio colorScheme="green" value="True">
                        Extant
                      </Radio>
                    </Stack>
                  </RadioGroup>
                </FormControl>
              </Stack>
            </form>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <Heading size="md">External Sources</Heading>
          </CardHeader>
          <CardBody>
            <Stack spacing={4}>
              <Stack spacing={2} direction="row">
                <FormControl>
                  <FormLabel>Source</FormLabel>
                  <Select>
                    <option>GBIF</option>
                    <option>NCBI</option>
                    <option>IRMNG</option>
                    <option>OTT</option>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>ID</FormLabel>
                  <Input placeholder="ID" />
                </FormControl>
              </Stack>
              <Button>Add</Button>
            </Stack>
          </CardBody>
        </Card>
        <Button onClick={() => setIsEditing(false)}>Save</Button>
      </Stack>
    );
  }

  return (
    <Stack w="full" spacing={8}>
      <Heading size="lg">Database result</Heading>
      {!databaseResult && (
        <Stack>
          <Text>No result</Text>
          <Button>Create Node from Data</Button>
        </Stack>
      )}
      {databaseResult && (
        <ResultCard
          databaseResult={databaseResult}
          lineage={lineage}
          directChildren={directChildren}
          openTreeResult={openTreeResult}
        />
      )}
      <Button onClick={() => setIsEditing(true)}>Edit</Button>
    </Stack>
  );
};

export default NodeDetails;
