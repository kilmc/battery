import { CSSProperties } from '../types/css';

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
  valuePlugin?: string | ModifierSubset[];
}

export interface PropertyConfig extends CorePropertyConfig {
  cssProperty: CSSProperties;
}

export interface DeveloperPropertyConfig extends CorePropertyConfig {
  cssProperty: CSSProperties[];
}
