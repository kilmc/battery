import { BatteryConfig } from 'types/battery-config';
import { keywordToMetaData } from 'classMetaData/keywordToMetaData';
import { generateMatchers } from 'matchers/generateMatchers';
import { classMetaToCSS } from 'css/classMetaToCSS';

export const generateCSS = (
  classNames: string[],
  config: BatteryConfig,
): string => {
  const keywords = keywordToMetaData(config);
  const matchers = generateMatchers(config, keywords);

  const inputKeywordClasses = classNames.filter(className =>
    className.match(matchers.keyword),
  );

  const toProcessKeywords = inputKeywordClasses.reduce((accum, className) => {
    const classNameMeta = keywords.find(obj => obj.source === className);

    return accum.concat(classMetaToCSS(classNameMeta));
  }, []);

  return toProcessKeywords.join(' ');
};
