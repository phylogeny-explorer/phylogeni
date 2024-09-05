import type { Taxon } from '~/types/ott';

const baseUrl = 'https://api.opentreeoflife.org/v3/';

export const post = async (endpoint: string, body: object) => {
  const result = await fetch(`${baseUrl}/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  return result.json();
};

type MatchNameResult = {
  results?: {
    matches: {
      score: number;
      taxon: Taxon;
    }[];
  }[];
};

export const matchName = async (name: string) => {
  const result: MatchNameResult = await post('tnrs/match_names', {
    names: [name],
    do_approximate_matching: true,
  });

  const matches = result.results?.[0]?.matches || [];

  // console.log(matches);

  return matches
    .filter((item) => !item.taxon.is_suppressed_from_synth)
    .map((item) => ({
      id: item.taxon.ott_id,
      name: item.taxon.name,
      rank: item.taxon.rank,
      extant: !item.taxon.flags?.includes('extinct'),
    }));
};

const ncbiLinkBase =
  'https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?mode=Info&id=';

type NodeResult = {
  node_id: string;
  taxon?: Taxon;
  lineage?: NodeResult[];
};

export const getNodeDetails = async (ott_id: string) => {
  const openTreeResult: NodeResult = await post('tree_of_life/node_info', {
    node_id: ott_id,
    include_lineage: true,
  });

  if (!openTreeResult.taxon) {
    return null;
  }

  const sources = openTreeResult.taxon.tax_sources.map((s) => {
    const [name, id] = s.split(':');
    const link = name === 'ncbi' ? `${ncbiLinkBase}${id}` : null;
    return { name, id, link };
  });

  return {
    id: openTreeResult.node_id,
    ...openTreeResult.taxon,
    parent: {
      id: openTreeResult.lineage?.[0]?.node_id,
      name: openTreeResult.lineage?.[0]?.taxon?.name || 'unnamed clade',
    },
    sources,
  };
};
