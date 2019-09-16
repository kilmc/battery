enum SubPropKeys {
  TOP = 'top',
  RIGHT = 'right',
  BOTTOM = 'bottom',
  LEFT = 'left',
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',
  ALL = 'all',
}

type SubProp = { [key in SubPropKeys]?: string };
type ModifierSubset = { name: string; modifiers: string[] };

export type UserPropConfig = {
  prop: CSSProps;
  propIdentifier?: RegExp | string;
  pluginDefault?: boolean;
  subProps?: SubProp;
  subPropSeparator?: string;
  pluginSeparator?: string;
  keywordSeparator?: string;
  keywordValues?: { [k: string]: string };
  plugin?: string | ModifierSubset[];
};
