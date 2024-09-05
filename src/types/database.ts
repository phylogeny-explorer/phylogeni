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
  parent_name?: XsdString;
};

export type Result<T> = {
  bindings: T[];
};
