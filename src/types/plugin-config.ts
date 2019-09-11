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

interface ValuePlugin {
  name: string;
  modifiers?: [DefaultValueModifier, ...ValueModifier[]] | ValueModifier[];
  sampleValues?: string[];
}

export interface PatternPlugin extends ValuePlugin {
  identifier: RegExp | string;
}

export interface LookupPlugin extends ValuePlugin {
  values: { [k: string]: string };
}
