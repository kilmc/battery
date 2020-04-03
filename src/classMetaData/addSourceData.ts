import { ClassMetaData } from '../types/classname';
import { Matchers } from '../types/matchers';

export const addSourceData = (
  classNameArr: string[],
  matchers: Matchers,
): ClassMetaData[] =>
  classNameArr.map(className => {
    const matcher = Object.entries(matchers).find(([, regex]) => {
      return regex.test(className);
    });

    const classMeta: ClassMetaData = { source: className, selector: className };

    if (!matcher) {
      classMeta.invalid = true;
      return classMeta;
    }
    return classMeta;
  });
