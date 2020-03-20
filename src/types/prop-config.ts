import { CSSProperties } from 'types/css';

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

export interface PropertyConfig {
  cssProperty: CSSProperties[];
  classNamespace?: string;
  pluginDefault?: boolean;
  subProps?: SubProp;
  subPropSeparator?: string;
  pluginSeparator?: string;
  valueSeparator?: string;
  values?: { [k: string]: string };
  valuePlugin?: string | ModifierSubset[];
}
