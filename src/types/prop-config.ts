import { CSSProps } from 'types/css-props';

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

export interface UserPropConfig {
  cssProperty: CSSProps[];
  propIdentifier?: string;
  pluginDefault?: boolean;
  subProps?: SubProp;
  subPropSeparator?: string;
  pluginSeparator?: string;
  keywordSeparator?: string;
  keywordValues?: { [k: string]: string };
  plugin?: string | ModifierSubset[];
}
