export type ModifierFn = (value: string, modifierValue?: string) => string;

interface Modifier {
  modifierFn?: ModifierFn;
  separator?: string;
  identifier?: RegExp | string;
  defaultModifier?: boolean;
  condition?: string;
}

export interface Plugin {
  type: 'pattern' | 'lookup' | 'selector' | 'at-rule';
  name: string;
  atrule?: 'media' | 'font-face';
  affixType?: 'prefix' | 'suffix';
  identifier?: RegExp | string;
  modifiers?: { [k: string]: Modifier };
  sampleValues?: string[];
  values?: { [k: string]: string };
}
