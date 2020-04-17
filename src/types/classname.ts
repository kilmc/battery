import { PluginConfig } from './plugin-config';
import { CSSProperties } from '../types/css';

export type ClassObject = { [key in CSSProperties]?: string };
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
  property?: CSSProperties[];
  source: string;
  selector?: string;
  explodedSource?: ExplodedClassSource;
  keyword?: boolean;
  valuePlugin?: PluginConfig;
  valuePluginType?: 'pattern' | 'lookup';
  atrulePlugin?: PluginConfig;
  atruleModifier?: string;
  selectorPlugin?: PluginConfig;
  selectorModifier?: string;
  valueModifier?: string;
  classObject?: ClassObject;
  invalid?: boolean;
  css?: string;
}
