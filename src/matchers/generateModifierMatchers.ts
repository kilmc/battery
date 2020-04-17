import { Plugin } from 'types/plugin-config';
import { Matchers } from 'types/matchers';

export const generateModifierMatchers = (plugin: Plugin) => {
  return Object.entries(plugin.modifiers).reduce(
    (accum, [name, modifier]) => {
      const { separator = '', identifier } = modifier;

      if (modifier.defaultModifier) {
        accum[name] = new RegExp('__DEFAULT__');
        return accum;
      } else {
        const processedIdentifier =
          typeof identifier === 'string' ? identifier : identifier.source;

        accum[name] = new RegExp(`${separator}${processedIdentifier}`);
        return accum;
      }
    },
    {} as Matchers,
  );
};
