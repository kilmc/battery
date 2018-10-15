import { sortAndJoin } from '../utils';
import { buildPrefixAndSuffixRegex } from './prefixAndSuffixes';

export const buildClassNameRegexFn = (pluginsConfig, body = '') => {
  let prefixAndSuffixes = {};
  if (pluginsConfig) {
    const hasPrefixesOrSuffixes =
      pluginsConfig.filter(x => x.prefixOrSuffix).length > 0;

    if (hasPrefixesOrSuffixes)
      prefixAndSuffixes = buildPrefixAndSuffixRegex(pluginsConfig);
  }

  const start = prefixAndSuffixes['prefix']
    ? prefixAndSuffixes['prefix']
    : '(^)';

  const end = prefixAndSuffixes['suffix'] ? prefixAndSuffixes['suffix'] : '($)';

  return propNames => `${start}(${sortAndJoin(propNames)})${body}${end}`;
};
