import { CSSProps } from './css-props';

export type ClassObject = { [key in CSSProps]?: string };
export interface ClassObjectGroup {
  [k: string]: ClassObject;
}

export interface ExplodedClassSource {
  prefix?: string;
  prefixSeparator?: string;
  suffix?: string;
  suffixSeparator?: string;
  classNamespace?: string;
  valueSeparator?: string;
  valueIdentifier: string;
  modifierSeparator?: string;
  modifierIdentifier?: string;
}

export interface ClassMetaData {
  property?: CSSProps[];
  source: string;
  selector?: string;
  explodedSource?: ExplodedClassSource;
  keyword?: boolean;
  valuePlugin?: string;
  valuePluginType?: 'pattern' | 'lookup';
  atrulePlugin?: string;
  atruleModifier?: string;
  selectorPlugin?: string;
  selectorModifier?: string;
  valueModifier?: string;
  classObject?: ClassObject;
  invalid?: boolean;
  css?: string;
}
