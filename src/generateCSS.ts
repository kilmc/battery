import { BatteryConfig } from 'types/battery-config';
import { generateKeywordClassObjects } from 'generateKeywordClassObjects';

export const generateCSS = (
  classNames: string[],
  config: BatteryConfig,
): string => {
  const keywordClassObjects = generateKeywordClassObjects(config);
  return '';
};
