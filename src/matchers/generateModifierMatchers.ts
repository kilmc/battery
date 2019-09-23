import { ValuePlugin } from 'types/plugin-config';
import { Matchers } from 'types/matchers';

export const generateModifierMatchers = (plugin: ValuePlugin) => {
  return plugin.modifiers.reduce(
    (accum, modifier) => {
      const { name, separator = '', identifier } = modifier;
      const processedIdentifier =
        typeof identifier === 'string' ? identifier : identifier.source;
      accum[name] = new RegExp(`${separator}${processedIdentifier}`);
      return accum;
    },
    {} as Matchers,
  );
};
