/* eslint-env jest, node */

import { generate } from './index';
import config from './testConfig';

describe('generate', () => {
  it('geneates an atomic css library', () => {
    expect(generate(config)).toEqual('');
  });
});
