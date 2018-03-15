/* eslint-env jest, node */

import {
  generateKeywordValueObjs,
  getKeywordClassObjs
} from '../keywordValueType';

import { backgroundSize, display, margin, fill } from '../../fixtures/props';

const propConfigs = {
  backgroundSize,
  display,
  fill,
  margin
};

describe('precompileClasses', () => {
  it('creates classObjects from keywordValues found in all given propConfigs', () => {
    expect(generateKeywordValueObjs(propConfigs)).toEqual({
      'bg-contain': { 'background-size': 'contain'},
      'bg-cover': { 'background-size': 'cover'},
      'block': { 'display': 'block'},
      'flex': { 'display': 'flex'},
      'inline': { 'display': 'inline'},
      'm-auto': { 'margin': 'auto'}
    });
  });
});

describe('getKeywordClassObjs', () => {
  const classObjects = generateKeywordValueObjs(propConfigs);
  const classNames = ['bg-contain','flex','m-auto'];
  const classNamesWithModifiers = ['hover-bg-cover','inline-md','focus-block-lg'];

  it('returns classObjects for each matching className passed', () => {
    expect(
      getKeywordClassObjs(classNames,classObjects)
    ).toEqual({
      'bg-contain': {'background-size': 'contain'},
      'flex': {'display': 'flex'},
      'm-auto': {'margin': 'auto'}
    });
  });

  it('ignores modifiers in the className', () => {
    expect(
      getKeywordClassObjs(classNamesWithModifiers,classObjects)
    ).toEqual({
      'hover-bg-cover': {'background-size': 'cover'},
      'inline-md': {'display': 'inline'},
      'focus-block-lg': {'display': 'block'},
    });
  });
});