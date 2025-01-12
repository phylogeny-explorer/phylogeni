export type Taxon = {
  flags?: string[];
  is_suppressed_from_synth?: boolean;
  ott_id: number;
  name: string;
  unique_name: string;
  rank: string;
  tax_sources: string[];
};

export type OttNodeDetails = {
  id: string;
  name: string;
  unique_name?: string;
  extinct?: boolean;
  rank?: string;
  parent?: OttNodeDetails;
  lineage?: OttNodeDetails[];
  children?: OttNodeDetails[];
  sources?: {
    name: string;
    id: string;
    link: string | null;
  }[];
  synonyms?: string[];
};
