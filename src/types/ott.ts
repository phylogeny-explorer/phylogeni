export type Taxon = {
  flags?: string[];
  is_suppressed_from_synth?: boolean;
  ott_id: number;
  name: string;
  unique_name: string;
  rank: string;
  tax_sources: string[];
};
