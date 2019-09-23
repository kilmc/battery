export type ModifierFn = (value: string, modifierValue?: string) => string;

interface ValueModifier {
  modifierFn: ModifierFn;
  name: string;
  separator?: string;
  identifier?: RegExp | string;
  defaultModifier?: boolean;
}

export interface ValuePlugin {
  type: 'pattern' | 'lookup';
  name: string;
  identifier?: RegExp | string;
  modifiers?: ValueModifier[];
  sampleValues?: string[];
  values?: { [k: string]: string };
}
