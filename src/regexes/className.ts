import { sortAndJoin } from '../utils';
import { buildPrefixAndSuffixRegex } from './';
import { PluginConfig } from '../types/';

export const buildClassNameRegexFn = (
  pluginConfigs: PluginConfig[],
  body = ''
) => {
  let prefixAndSuffixes;
  if (pluginConfigs) {
    const hasPrefixesOrSuffixes =
      pluginConfigs.filter(x => x.prefixOrSuffix).length > 0;

    if (hasPrefixesOrSuffixes)
      prefixAndSuffixes = buildPrefixAndSuffixRegex(pluginConfigs);
  }

  const start = prefixAndSuffixes['prefix']
    ? prefixAndSuffixes['prefix']
    : '(^)';

  const end = prefixAndSuffixes['suffix'] ? prefixAndSuffixes['suffix'] : '($)';

  return (propNames: string[]): string =>
    `${start}(${sortAndJoin(propNames)})${body}${end}`;
};
