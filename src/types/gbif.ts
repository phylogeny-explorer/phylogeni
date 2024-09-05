export type GbifSpecies = {
  key: number;
  canonicalName: string;
  vernacularName: string;
  basionym: string;
  authorship: string;
  publishedIn: string;
};

export type Authorship = {
  name: string;
  year: number | null;
  isOriginalAuthor: boolean;
  sources: string[] | null;
};

export type Species = {
  canonicalName: string;
  authorship: Authorship | null;
  commonNames: string[] | null;
  sources: { id: string; name: string }[] | null;
};
