export type OttNode = {
  node_id: string;
  taxon?: { name: string; rank: string };
  num_tips: number;
  extinct?: boolean;
  lineage?: OttNode[];
  children?: OttNode[];
};

export enum Rank {
  SPECIES = 'species',
  GENUS = 'genus',
  FAMILY = 'family',
  ORDER = 'order',
  CLASS = 'class',
  PHYLUM = 'phylum',
  KINGDOM = 'kingdom',
  DOMAIN = 'domain',
  NO_RANK = 'no rank',
}

// type AncestorNode = {
//   id: string;
//   name: string;
//   extant: boolean;
// };

type Attributes = {
  id: string;
  leaves?: number;
  hasChildren: boolean;
  extant: boolean;
  rank?: Rank;
  lineage?: string[];
  // lineage?: AncestorNode[];
};

export type Node = {
  id: string;
  name: string;
  attributes?: Attributes;
  children?: Node[];
};
