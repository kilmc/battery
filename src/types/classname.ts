import { CSSProps } from './css-props';
import { Plugin } from './plugin-config';

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
  valueOrPluginSeparator?: string;
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
  valuePlugin?: Plugin;
  valuePluginType?: 'pattern' | 'lookup';
  atrulePlugin?: Plugin;
  atruleModifier?: string;
  selectorPlugin?: Plugin;
  selectorModifier?: string;
  valueModifier?: string;
  classObject?: ClassObject;
  invalid?: boolean;
  css?: string;
}
