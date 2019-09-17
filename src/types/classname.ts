export type ClassObject = { [key in CSSProps]?: string };
export type ClassObjectGroup = { [k: string]: ClassObject };

export type ExplodedClassSource = {
  prefix?: string;
  prefixSeparator?: string;
  suffix?: string;
  suffixSeparator?: string;
  propIdentifier?: string;
  valueSeparator?: string;
  valueIdentifier: string;
  modifierSeparator?: string;
  modifierIdentifier?: string;
};

export type ClassMetaData = {
  property?: CSSProps;
  source: string;
  explodedSource?: ExplodedClassSource;
  keyword: boolean;
  valuePlugin?: string;
  selectorPlugin?: string;
  classObject?: ClassObject;
};
