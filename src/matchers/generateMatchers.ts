import { BatteryConfig } from 'types/battery-config';
import { ClassObjectGroup } from 'types/classname';
import { generateKeywordMatcher } from 'matchers/generateKeywordMatcher';
import { Matchers } from 'types/matchers';
import { generateValuePluginMatcher } from './generateValuePluginMatcher';
import { ValuePlugin } from 'types/plugin-config';

export const generateMatchers = (
  config: BatteryConfig,
  keywordClassObjects: ClassObjectGroup,
): Matchers => {
  let valuePlugins: ValuePlugin[] = [];

  if (config.plugins) {
    valuePlugins = config.plugins.filter(
      plugin => plugin.type === 'lookup' || plugin.type === 'pattern',
    );
  }

  return {
    keyword: generateKeywordMatcher(keywordClassObjects),
    ...generateValuePluginMatcher(valuePlugins, config.props),
  };
};
