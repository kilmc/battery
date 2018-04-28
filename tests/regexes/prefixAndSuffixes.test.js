/* eslint-env jest, node */

import {
  pseudosPlugin,
  breakpointsPlugin
} from '../fixtures/plugins';

import { buildPrefixAndSuffixRegex } from '../../src/regexes/prefixAndSuffixes';

describe('buildPrefixAndSuffixRegex', () => {
  it('builds a regex from the prefix and suffix modifiers in className and atrule plugins', () => {
    expect(buildPrefixAndSuffixRegex([pseudosPlugin,breakpointsPlugin])).toEqual({
      'prefix': '(^|hover-|focus-)',
      'suffix': '(-sm|-md|-lg|$)'
    });
  });
});
