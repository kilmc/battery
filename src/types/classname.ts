export type ClassObject = { [key in CSSProps]?: string };
export type ClassObjectGroup = { [k: string]: ClassObject };

export type ExplodedClassSource = {
  prefix?: string;
  prefixSeparator?: string;
  suffix?: string;
  suffixSeparator?: string;
  propIndicator?: string;
  valueSeparator?: string;
  valueIndicator: string;
  modifierSeparator?: string;
  modifierIndicator?: string;
};

export type ClassNameMeta = {
  property: CSSProps;
  source: string;
  explodedSource: ExplodedClassSource;
  keyword: boolean;
  valuePlugin?: string;
  selectorPlugin?: string;
  classObject?: ClassObject;
};
