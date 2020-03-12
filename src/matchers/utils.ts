import { Matchers } from 'types/matchers';

export const getMatcherName = (matchers: Matchers, testStr: string) =>
  Object.entries(matchers).find(([_, regex]) => {
    return regex.test(testStr);
  });
