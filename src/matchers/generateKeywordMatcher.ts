import { ClassMetaData } from 'types/classname';
import { toCapture } from 'utils/array';

export const generateKeywordMatcher = (metaDataArr: ClassMetaData[]) => {
  const sortedClassNames = toCapture(
    metaDataArr.map(metaData => `${metaData.source}`),
  );
  return new RegExp(`.*?${sortedClassNames}.*?`);
};
