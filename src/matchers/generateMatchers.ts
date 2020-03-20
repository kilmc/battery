import { DeveloperBatteryConfig } from 'types/battery-config';
import { ClassMetaData } from 'types/classname';
import { generateKeywordMatcher } from 'matchers/generateKeywordMatcher';
import { Matchers } from 'types/matchers';
import { generateValuePluginMatcher } from './generateValuePluginMatcher';

export const generateMatchers = (
  config: DeveloperBatteryConfig,
  keywordClassMetaData?: ClassMetaData[],
): Matchers => {
  let keywordMatcher = {};

  if (keywordClassMetaData && keywordClassMetaData.length > 0) {
    keywordMatcher = generateKeywordMatcher(
      keywordClassMetaData,
      config.plugins,
    );
  }

  return {
    ...keywordMatcher,
    ...generateValuePluginMatcher(config.plugins, config.props),
  };
};
