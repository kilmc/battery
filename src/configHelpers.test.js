/* eslint-env jest, node */

import { enablePropFeature } from './configHelpers';

const propsConfig = {
  zIndex: { propName: 'z', prop: 'z-index' }
};

describe('enablePropFeature', () => {
  it('', () => {
    enablePropFeature('integers',propsConfig,['zIndex']);
    expect(propsConfig).toEqual({ zIndex: {
      propName: 'z',
      prop: 'z-index',
      enableIntegers: true
    }});
  });
});
