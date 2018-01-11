/* eslint-env jest, node */

import {
  regexStringFromArray,
  subtractArrays
} from './helpers';

describe('regexStringFromArray', () => {
  it('returns a formatted regex capture group with all array items', () => {
    expect(regexStringFromArray(['bg','fill','color']))
      .toEqual('(bg|fill|color)');
  });

  it('allows function to be passed to make a more specific regex', () => {
    expect(regexStringFromArray(['bg','fill','color'],x => `^${x}$`))
      .toEqual('(^bg$|^fill$|^color$)');
  });
});

describe('subtractArrays', () => {
  it('removes any items common to both array from the first array', () => {
    expect(subtractArrays(
      ['bg-black','white','mx10','block'],
      ['bg-black','white']
    )).toEqual(['mx10','block']);
  });
});

