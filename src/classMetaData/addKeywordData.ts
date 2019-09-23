import { ClassMetaData } from 'types/classname';
import { Matchers } from 'types/matchers';

export const addKeywordData = (
  classNameData: ClassMetaData[],
  matchers: Matchers,
): ClassMetaData[] => {
  return classNameData.map(obj => {
    if (!matchers.keyword) {
      obj.keyword = false;
    } else {
      obj.keyword = matchers.keyword.test(obj.source);
    }
    return obj;
  });
};
