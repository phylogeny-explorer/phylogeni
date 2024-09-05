import { v4 as uuidv4 } from 'uuid';

import type { GbifSpecies } from '~/types/gbif';

const baseUrl = 'https://api.gbif.org/v1';

const getAuthorship = (authorship: string) => {
  const regex = /(\()?([^()\n]*), (\d{4})(\))?/;
  const matches = authorship.match(regex);
  return {
    name: matches ? matches[2] : authorship,
    year: matches ? parseInt(matches[3], 10) : null,
    isOriginalAuthor: !matches?.[1] && !matches?.[4],
  };
};

export const get = async (endpoint: string) => {
  const result = await fetch(`${baseUrl}/${endpoint}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return result.json();
};

export const getSpecies = async (id: string) => {
  const result: GbifSpecies = await get(`species/${id}`);

  const source = { id: uuidv4(), name: result.publishedIn };
  return {
    canonicalName: result.canonicalName,
    authorship: result.authorship
      ? {
          ...getAuthorship(result.authorship),
          sources: result.publishedIn ? [source.id] : null,
        }
      : null,
    commonNames: result.vernacularName ? [result.vernacularName] : null,
    sources: result.publishedIn ? [source] : null,
  };
};
