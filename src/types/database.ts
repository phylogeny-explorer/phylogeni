export type XsdString = {
  '@type': 'xsd:string';
  '@value': string;
};

export type XsdDecimal = {
  '@type': 'xsd:decimal';
  '@value': number;
};

export type TrueFalse = '@schema:TrueFalse/True' | '@schema:TrueFalse/False';

export type Clade = {
  id: string;
  name: XsdString;
  rank?: XsdString;
  extant?: TrueFalse;
  parent?: string;
  ott_id?: XsdString;
  common_name?: XsdString;
};

export type Result<T> = {
  bindings: T[];
};

export type Node = {
  id: string;
  name: string;
  commonNames?: string;
  rank?: string;
  extant?: string;
  ott_id: string;
};

export type NodeDetails = Node & {
  parent?: string;
  parentName?: string;
  sources?: {
    name: string;
    id: string;
    link: string | null;
  }[];
};
