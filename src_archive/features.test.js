/* eslint-env jest, node */

import {
  getConfigs,
  getFeatureConfigs,
} from './features';

import config from './testConfig';

describe('getConfigs', () => {
  it('returns an array of prop configs', () => {
    expect(getConfigs(
      propConfig => typeof propConfig.manual === 'object',
      config.props
    )).toEqual([
      {
        'enableLengthUnits': true,
        'manual': {
          'separator': '-',
          'values': {
            'contain': 'contain',
            'cover': 'cover',
            'full-height': 'auto 100%',
            'full-width': '100% auto'
          }
        },
        'prop': 'background-size',
        'propName': 'bg'
      }
    ]);
  });
});

describe('getFeatureConfigs', () => {
  it('returns an array of prop configs with a given feature', () => {
    expect(getFeatureConfigs('colors',config.props)).toEqual([
      {
        'enableColors': true,
        'prop': 'background-color',
        'propName': 'bg'
      },
      {
        'enableColors': true,
        'prop': 'color',
        'propName': ''
      },
      {
        'enableColors': true,
        'prop': 'fill',
        'propName': 'fill'
      }
    ]);
  });
});
