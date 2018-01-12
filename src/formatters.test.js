/* eslint-env jest, node */

import {
  addLengthUnit,
  formatLengthUnitValue,
  formatPrefixOrSuffix,
  generateAtom,
  unboundFormatPx,
} from './formatters';

import testConfig from './testConfig';

describe('generateAtom', () => {
  it('converts class info into an atomObject', () => {
    expect(generateAtom({
      className: 'bg100p',
      cssProps: 'background-size',
      value: '100%'
    }))
      .toEqual({'bg100p': {'background-size': '100%'}});
  });
});

describe('addLengthUnit', () => {
  it('formats a string into a length unit', () => {
    expect(addLengthUnit('%')('100')).toEqual('100%');
  });
});

describe('formatPx', () => {
  const [baseFontSize,baselineUnit] = [10,6];
  const remFormatPx = unboundFormatPx(baseFontSize,true,baselineUnit);
  const formatPx = unboundFormatPx(baseFontSize,false,baselineUnit);

  it('renders rems when the config is set useRems: true', () => {
    expect(remFormatPx(10)).toEqual('1rem');
  });
  it('renders px when the config is set useRems: false', () => {
    expect(formatPx(10)).toEqual('10px');
  });
  it('renders a baseline unit when baseline is set to true', () => {
    expect(remFormatPx(10,true)).toEqual('6rem');
  });
});

describe('formatLengthUnitValue', () => {
  it('formats a baseline unit', ()=> {
    expect(formatLengthUnitValue(20,'',testConfig))
      .toEqual('12rem');
  });
  it('formats a hard pixel unit', ()=> {
    expect(formatLengthUnitValue(25,'px',testConfig))
      .toEqual('2.5rem');
  });
  it('formats a hard percentage unit', ()=> {
    expect(formatLengthUnitValue(50,'p',testConfig))
      .toEqual('50%');
  });
  it('formats a viewport height unit', ()=> {
    expect(formatLengthUnitValue(20,'vw',testConfig))
      .toEqual('20vw');
  });
  it('formats a viewport height unit', ()=> {
    expect(formatLengthUnitValue(10,'vh',testConfig))
      .toEqual('10vh');
  });
});

describe('formatPrefixOrSuffix', () => {
  it('formats a prefix string', () => {
    expect(formatPrefixOrSuffix('hover','-','prefix')).toEqual('hover-');
  });

  it('formats a suffix string', () => {
    expect(formatPrefixOrSuffix('sm','-','suffix')).toEqual('-sm');
  });
});
