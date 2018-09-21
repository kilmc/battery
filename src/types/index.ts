export interface ClassObject {
  [key: string]: { [key: string]: string };
}

export interface KeywordValues {
  separator?: string;
  values: { [key: string]: string };
}

export interface PropConfig {
  prop: string;
  propName?: string;
  separator?: string;
  keywordValues: KeywordValues;
  enablePlugin: string;
  pluginDefault?: boolean;
  allowedValues?: string[];
  disallowedValues?: string[];
  subProps?: { [key: string]: string };
  subPropSeparator?: string;
}

export type ValuePluginTypes = 'pattern' | 'lookup';
export type PluginTypes = ValuePluginTypes | 'classname' | 'atrule';

export interface ValueModifier {
  name?: string;
  default?: boolean;
  indicator: string;
  separator?: string;
  modifierFn: Function;
}

export interface PluginModifier {
  name?: string;
  separator?: string;
  indicator?: string;
  modifierFn?: Function;
  condition?: string;
}

export interface PluginConfig {
  name: string;
  type: PluginTypes;
  valueRegexString?: string;
  valueModifiers?: ValueModifier[];
  values?: { [key: string]: string };
  modifiers?: PluginModifier[];
  prefixOrSuffix?: PrefixOrSuffix;
  atrule?: string;
}

export interface PluginsObject {
  [key: string]: PluginConfig;
}

export type ConcattablePropConfigKeys =
  | 'prop'
  | 'allowedValues'
  | 'disallowedValues';

export interface SettingsConfig {
  enableKeywordValues: boolean;
}

export interface MoleculesConfig {
  expand: { [key: string]: string[] };
  merge: { [key: string]: string[] };
}

export interface BatteryConfig {
  props: PropConfig[];
  plugins: PluginConfig[];
  settings: SettingsConfig;
  molecules: MoleculesConfig;
}

export enum PrefixOrSuffix {
  prefix = 'prefix',
  suffix = 'suffix'
}
