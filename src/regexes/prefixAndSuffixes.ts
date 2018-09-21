import { formatPrefixOrSuffix, sortAndJoin } from '../utils';
import { PluginConfig } from '../types/index';

const getPrefixAndSuffixes = (
  pluginConfigs: PluginConfig[]
): { [key: string]: string[] } => {
  return pluginConfigs
    .filter(x => x.prefixOrSuffix)
    .reduce((xs: { [key: string]: string[] }, x) => {
      const { prefixOrSuffix: type, modifiers } = x;

      modifiers.forEach(modifier => {
        const { indicator, separator = '' } = modifier;
        const item = formatPrefixOrSuffix(indicator, separator, type);

        if (xs[type]) {
          xs[type] = xs[type].concat(item);
        } else {
          xs[type] = [item];
        }
      });

      return xs;
    }, {});
};

export const buildPrefixAndSuffixRegex = (pluginConfigs: PluginConfig[]) => {
  const prefixesAndSuffixes = getPrefixAndSuffixes(pluginConfigs);
  let prefixes = prefixesAndSuffixes['prefix'];
  let suffixes = prefixesAndSuffixes['suffix'];
  let prefixSuffixRegexes: { [key: string]: string } = {};

  if (prefixes) prefixSuffixRegexes['prefix'] = `(^|${sortAndJoin(prefixes)})`;
  if (suffixes) prefixSuffixRegexes['suffix'] = `(${sortAndJoin(suffixes)}|$)`;
  return prefixSuffixRegexes;
};
