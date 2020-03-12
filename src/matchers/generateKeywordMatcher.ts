import { ClassMetaData } from 'types/classname';
import { toCapture } from 'utils/array';
import { Plugin } from 'types/plugin-config';
import { generatePrefixSuffixdMatchers } from './generatePrefixSuffixMatchers';

export const generateKeywordMatcher = (
  metaDataArr: ClassMetaData[],
  plugins: Plugin[],
) => {
  const { prefixes, suffixes } = generatePrefixSuffixdMatchers(plugins);

  const sortedClassNames = toCapture(
    metaDataArr.map(metaData => `${metaData.source}`),
  );

  return {
    keyword: new RegExp(`(${prefixes})${sortedClassNames}(${suffixes})`),
  };
};
