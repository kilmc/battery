import { CSSProperties } from '../types/css';
import { PluginConfig } from './plugin-config';

export type SubPropKeys =
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'
  | 'horizontal'
  | 'vertical'
  | 'all';

type SubProp = { [key in SubPropKeys]?: string };
interface ModifierSubset {
  name: string;
  modifiers: string[];
}

interface CorePropertyConfig {
  classNamespace?: string;
  pluginDefault?: boolean;
  subProps?: SubProp;
  subPropSeparator?: string;
  pluginSeparator?: string;
  valueSeparator?: string;
  values?: { [k: string]: string };
  valuePlugin?: PluginConfig;
  static?: { values: string[] };
}

export interface PropertyConfig extends CorePropertyConfig {
  cssProperty: CSSProperties;
}

export interface DeveloperPropertyConfig extends CorePropertyConfig {
  cssProperty: CSSProperties[];
}
