export type ModifierFn = (value: string, modifierValue?: string) => string;

interface Modifier {
  modifierFn: ModifierFn;
  name: string;
  separator?: string;
  identifier?: RegExp | string;
  defaultModifier?: boolean;
}

export interface Plugin {
  type: 'pattern' | 'lookup' | 'selector' | 'atRule';
  name: string;
  identifierType?: 'prefix' | 'suffix';
  identifier?: RegExp | string;
  modifiers?: Modifier[];
  sampleValues?: string[];
  values?: { [k: string]: string };
}
