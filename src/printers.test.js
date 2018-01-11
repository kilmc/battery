/* eslint-env jest, node */

import {
  atomsToCSS,
  generateMediaQuery,
  printClass,
} from './printers';

const responsiveClasses = {
  'sm': {
    'py4-sm': { 'padding-top': '2.4rem', 'padding-bottom': '2.4rem' },
  },
  'md': {
    'fz18px-md': { 'font-size': '1.8rem' },
  },
  'lg': {
    'block-lg': { display: 'block' },
  }
};

const breakpoints = {
  sm: '600px',
  md: '795px',
  lg: '1025px'
};

describe('printClass', () => {
  it('returns a CSS class definition as a string', () => {
    expect(printClass('bg100p',{ 'background-size': '100%' }))
      .toEqual('.bg100p { background-size: 100%; }');
  });

  it('handles a class having multiple declarations', () => {
    expect(printClass('mx10',{ 'margin-left': '6rem', 'margin-right': '6rem' }))
      .toEqual('.mx10 { margin-left: 6rem; margin-right: 6rem; }');
  });
});

describe('atomsToCSS', () => {
  it('renders multiple CSS classes', () => {
    expect(atomsToCSS({
      'block': { display: 'block'},
      'pb-5': { 'padding-bottom': '-3.6rem'},
      'my20': { 'margin-top': '12rem', 'margin-bottom': '12rem' }
    })).toEqual('.block { display: block; }\n.pb-5 { padding-bottom: -3.6rem; }\n.my20 { margin-top: 12rem; margin-bottom: 12rem; }');
  });
});

describe('generateMediaQuery', () => {
  it('renders CSS classes wrapped in a media query', () => {
    expect(generateMediaQuery(responsiveClasses.sm,'sm',breakpoints))
      .toEqual(`
@media (min-width: 600px) {
  .py4-sm { padding-top: 2.4rem; padding-bottom: 2.4rem; }
}`);
  });
});


