import { PluginConfig } from 'types/plugin-config';

export const generatePrefixSuffixdMatchers = (plugins: PluginConfig[]) => {
  const baseObject = {
    prefixes: '^',
    suffixes: '$',
  };
  if (!plugins || plugins.length < 1) {
    return baseObject;
  }

  const prefixedPlugins = plugins.filter(
    plugin => plugin.affixType === 'prefix',
  );

  const suffixedPlugins = plugins.filter(
    plugin => plugin.affixType === 'suffix',
  );

  let prefixes;
  let suffixes;

  if (prefixedPlugins.length > 0) {
    prefixes = prefixedPlugins
      .map(plugin =>
        plugin.modifiers.reduce((accum, modifier) => {
          const { identifier, separator = '' } = modifier;
          return accum.concat(`${identifier}${separator}`);
        }, []),
      )
      .reduce((xs, x) => xs.concat(x), [])
      .concat('^')
      .join('|');
  }

  if (suffixedPlugins.length > 0) {
    suffixes = suffixedPlugins
      .map(plugin =>
        plugin.modifiers.reduce((accum, modifier) => {
          const { identifier, separator = '' } = modifier;
          return accum.concat(`${separator}${identifier}`);
        }, []),
      )
      .reduce((xs, x) => xs.concat(x), [])
      .concat('$')
      .join('|');
  }

  return {
    prefixes: prefixes ? prefixes : '^',
    suffixes: suffixes ? suffixes : '$',
  };
};
