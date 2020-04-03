import { Matchers } from '../types/matchers';

export const getMatcherName = (matchers: Matchers, testStr: string) =>
  Object.entries(matchers).find(([, regex]) => {
    return regex.test(testStr);
  });
