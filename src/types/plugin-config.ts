export type ModifierFn = (value: string, modifierValue?: string) => string;

interface ValueModifierBase {
  modifierFn: ModifierFn;
  name: string;
  separator?: string;
}

interface ValueModifier extends ValueModifierBase {
  indentifier: RegExp | string;
}

interface DefaultValueModifier extends ValueModifierBase {
  defaultModifier: boolean;
}

export interface ValuePlugin {
  type: 'pattern' | 'lookup';
  name: string;
  identifier?: RegExp | string;
  modifiers?: [DefaultValueModifier, ...ValueModifier[]] | ValueModifier[];
  sampleValues?: string[];
  values?: { [k: string]: string };
}
