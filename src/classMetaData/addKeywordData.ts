import { ClassMetaData } from '../types/classname';
import { Matchers } from '../types/matchers';

export const addKeywordData = (
  classMetaArr: ClassMetaData[],
  matchers: Matchers,
): ClassMetaData[] => {
  return classMetaArr.map(classMeta => {
    if (!matchers.keyword) {
      classMeta.keyword = false;
    } else {
      classMeta.keyword = matchers.keyword.test(classMeta.source);
    }
    return classMeta;
  });
};
