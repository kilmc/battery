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

interface BasePropConfig {
  prop: CSSProps;
  propIdentifier?: RegExp | string;
  subProps?: SubProp;
  subPropSeparator?: string;
  valueSeparator?: string;
}

interface KeywordPropConfig extends BasePropConfig {
  keywordSeparator?: string;
  keywordValues: { [k: string]: string };
}

interface PluginPropConfig extends BasePropConfig {
  plugin: string | ModifierSubset[];
}

export type UserPropConfig = KeywordPropConfig | PluginPropConfig;
