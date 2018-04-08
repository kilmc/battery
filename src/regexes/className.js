import { sortAndJoin } from '../utils';
import { buildPrefixAndSuffixRegex } from './';

export const buildClassNameRegex = (pluginsConfig,body = '') => {
  let prefixAndSuffixes = {};
  const hasPrefixesOrSuffixes = pluginsConfig
    .filter(x => x.prefixOrSuffix).length > 0;

  if (hasPrefixesOrSuffixes) prefixAndSuffixes = buildPrefixAndSuffixRegex(pluginsConfig);

  const start = prefixAndSuffixes['prefix']
    ? prefixAndSuffixes['prefix']
    : '(^)';

  const end = prefixAndSuffixes['suffix']
    ? prefixAndSuffixes['suffix']
    :'($)';

  return (propNames) =>
    `${start}(${sortAndJoin(propNames)})${body}${end}`;
};