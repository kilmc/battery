import { BatteryConfig } from 'types/battery-config';
import { ClassMetaData } from 'types/classname';
import { generateKeywordMatcher } from 'matchers/generateKeywordMatcher';
import { Matchers } from 'types/matchers';
import { generateValuePluginMatcher } from './generateValuePluginMatcher';
import { Plugin } from 'types/plugin-config';

export const generateMatchers = (
  config: BatteryConfig,
  keywordClassMetaData?: ClassMetaData[],
): Matchers => {
  let valuePlugins: Plugin[] = [];
  let keywordMatcher = {};

  if (keywordClassMetaData && keywordClassMetaData.length > 0) {
    keywordMatcher = generateKeywordMatcher(keywordClassMetaData);
  }

  if (config.plugins) {
    valuePlugins = config.plugins.filter(
      plugin => plugin.type === 'lookup' || plugin.type === 'pattern',
    );
  }

  return {
    ...keywordMatcher,
    ...generateValuePluginMatcher(valuePlugins, config.props),
  };
};
