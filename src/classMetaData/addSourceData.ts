import { ClassMetaData } from 'types/classname';
import { Matchers } from 'types/matchers';

export const addSourceData = (
  classNameArr: string[],
  matchers: Matchers,
): ClassMetaData[] =>
  classNameArr.map(className => {
    const matcher = Object.entries(matchers).find(([_, regex]) => {
      return regex.test(className);
    });

    const obj: ClassMetaData = { source: className };

    if (!matcher) {
      obj.invalid = true;
      return obj;
    }
    return obj;
  });
