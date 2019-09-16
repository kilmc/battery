import { ClassObjectGroup } from 'types/classname';
import { toCapture } from 'utils/array';

export const generateKeywordMatcher = (
  classObjects: ClassObjectGroup,
  optional: boolean = false,
) => {
  const sortedClassNames = toCapture(Object.keys(classObjects));
  const optionalFlag = optional ? '?' : '';
  return new RegExp(`.*?${sortedClassNames}${optionalFlag}.*?`);
};
