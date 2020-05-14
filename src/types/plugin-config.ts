export type ModifierFn = (value: string, modifierValue?: string) => string;

interface Modifier {
  modifierFn?: ModifierFn;
  name: string;
  separator?: string;
  identifier?: RegExp | string;
  defaultModifier?: boolean;
  condition?: string;
}

export interface PluginConfig {
  type: 'pattern' | 'lookup' | 'selector' | 'at-rule';
  atrule?: 'media' | 'font-face';
  affixType?: 'prefix' | 'suffix';
  identifier?: RegExp | string;
  modifiers?: Modifier[];
  sampleValues?: string[];
  values?: { [k: string]: string };
  separator?: string;

  // todo: can this be more strictly typed?
  static?: { [k: string]: string[] };
}
