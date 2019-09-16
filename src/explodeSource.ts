import { Matchers } from 'types/matchers';

export const explodeSource = (className: string, matchers: Matchers) => {
  return {};
};

// Class structure
// (1: pre)(2: preSep)(3: prop)(4: valueSep)(5: value)(6: sufSep)(7: suf)
//
// Value structure
// (1: value -- keyword|pattern|lookup)(2: modSep)(3: modValue)
