/* eslint-env jest, node */

import {
  expandMolecules
} from '../../src/molecules/';

import config from '../fixtures/config/';

describe('expandMolecules', () => {
  it('expands molecules', () => {
    const molecule = ['headline-500','bttn','card'];
    const moleculeConfig =  {
      expand: {
        'headline-500': 'type-14 type-16-sm type-21-lg',
        card: 'white rounded shadow-1'
      },
      merge: {
        'type-14': 'fz14px lh3',
        'type-16': 'fz16px lh4',
        'type-21': 'fz21px lh5',
        bttn: 'relative rounded h7'
      }
    };
    const testConfig = {...config, molecules: moleculeConfig };
    expect(expandMolecules(molecule,testConfig)).toEqual([
      'fz14px','lh3','fz16px','lh4','fz21px','lh5',
      'relative','rounded','h7','white','shadow-1']);
  });
});