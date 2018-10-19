/* eslint-env jest, node */
import { generateLibrary } from '../../src/generators/';
import { generateAtRule } from '../../src/generators/generateAtRules';
import { orderClasses } from '../../src/generators/generateCSS/generateClasses';
import generateCSS from '../../src/generators/generateCSS';
import {
  integersPlugin,
  colorsPlugin,
  lengthUnitsPlugin,
  pseudosPlugin,
  breakpointsPlugin
} from '../fixtures/plugins';

import { gridCol, squarePlugin } from '../fixtures/config/classPlugins';
import { filterUtilityClasses } from '../../src/generators/generateCSS/generateClasses';

import { props } from '../fixtures/props';

import {
  color,
  backgroundColor,
  borders,
  borderColor,
  borderWidth
} from '../fixtures/config/props';

const config = {
  props,
  plugins: [
    lengthUnitsPlugin,
    integersPlugin,
    colorsPlugin,
    pseudosPlugin,
    breakpointsPlugin
  ]
};

const lengthUnitClassnames = ['bg100p-md', 'w100vw-lg', 'm10-sm'];
const integerClassnames = ['z100-md', 'grow2-lg', 'order-1-sm', 'flex2-sm'];
const colorClassnames = [
  'bg-pink',
  'black-md',
  'fill-white-lg',
  'bg-black_20-sm'
];
const keywordClasses = [
  'hover-bg-cover-md',
  'flex-lg',
  'inline-block',
  'block'
];

const library = generateLibrary(
  [
    ...integerClassnames,
    ...colorClassnames,
    ...keywordClasses,
    ...lengthUnitClassnames
  ],
  config
);

describe('generateLibrary', () => {
  it('processes integer classes', () => {
    expect(generateAtRule(library, breakpointsPlugin)).toEqual({
      lg: {
        'fill-white-lg': { fill: '#FFFFFF' },
        'flex-lg': { display: 'flex' },
        'grow2-lg': { grow: '2' }
      },
      md: {
        'bg100p-md': { 'background-size': '100%' },
        'black-md': { color: '#000000' },
        'hover-bg-cover-md': { 'background-size': 'cover' },
        'z100-md': { 'z-index': '100' }
      },
      sm: {
        'bg-black_20-sm': { 'background-color': 'rgba(0,0,0,0.2)' },
        'm10-sm': { margin: '6rem' },
        'order-1-sm': { order: '-1' }
      }
    });
  });
});

describe('generateCSS', () => {
  fit('renders CSS in the correct cascade order', () => {
    const testClassNames = [
      'border-top',
      'col-10',
      'bg-white',
      'border',
      'border-black',
      'black',
      'border-thin'
    ];

    const testConfig = {
      plugins: [colorsPlugin, gridCol, squarePlugin],
      props: [backgroundColor, color, borders, borderColor, borderWidth]
    };
    expect(generateCSS(testClassNames, testConfig)).toEqual(
      `.col-10 { width: calc(10/12 * 100%); }
.border { border: 1px solid #DCDEDD; }
.border-top { border-top: 1px solid #DCDEDD; }
.bg-white { background-color: #FFFFFF; }
.border-black { border-color: #000000; }
.border-thin { border-width: 2px; }
.black { color: #000000; }
`
    );
  });
});

describe('orderClasses', () => {
  const plugins = [gridCol, squarePlugin];
  const testObj = {
    'col-10': { width: '' },
    'col-offset-10': { 'margin-left': '' },
    square4: { width: '', height: '' },
    border: { border: '' }
  };
  it('filters utility classes', () => {
    expect(Object.keys(filterUtilityClasses(testObj, plugins))).toEqual([
      'col-10',
      'col-offset-10',
      'square4'
    ]);
  });
  it('orders single declaration classes by their prop', () => {
    const testObj = {
      'border-top': { 'border-top': '1px solid #efefef' },
      'col-10': { width: 'calc(10/12 * 100%)' },
      'bg-white': { 'background-color': '#FFFFFF' },
      border: { border: '1px solid #efefef' },
      'border-black': { 'border-color': '#000000' },
      black: { color: '#000000' },
      'border-thin': { 'border-weight': '1px' }
    };
    const testConfig = {
      plugins: [colorsPlugin, gridCol, squarePlugin],
      props: [backgroundColor, color, borders]
    };

    expect(Object.keys(orderClasses(testObj, testConfig))).toEqual([
      'col-10',
      'border',
      'border-top',
      'bg-white',
      'border-black',
      'border-thin',
      'black'
    ]);
  });
});
