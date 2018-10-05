import { formatPrefixOrSuffix, sortAndJoin } from '../utils';

const getPrefixAndSuffixes = pluginsConfig => {
  return pluginsConfig.filter(x => x.prefixOrSuffix).reduce((xs, x) => {
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

export const buildPrefixAndSuffixRegex = pluginsConfig => {
  const prefixesAndSuffixes = getPrefixAndSuffixes(pluginsConfig);
  let prefixes = prefixesAndSuffixes['prefix'];
  let suffixes = prefixesAndSuffixes['suffix'];
  let prefixSuffixRegexes = {};

  if (prefixes) prefixSuffixRegexes['prefix'] = `(^|${sortAndJoin(prefixes)})`;
  if (suffixes) prefixSuffixRegexes['suffix'] = `(${sortAndJoin(suffixes)}|$)`;
  return prefixSuffixRegexes;
};
