import { BatteryConfig } from 'types/battery-config';
import { ClassObjectGroup } from 'types/classname';
import { generateKeywordMatcher } from 'matchers/generateKeywordMatcher';
import { Matchers } from 'types/matchers';

export const generateMatchers = (
  config: BatteryConfig,
  keywordClassObjects: ClassObjectGroup,
): Matchers => {
  return {
    keyword: generateKeywordMatcher(keywordClassObjects),
  };
};
