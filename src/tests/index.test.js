/* eslint-env jest, node */
import {
  generateLibrary
} from '../index';

import {
  integersPlugin,
  colorsPlugin,
  lengthUnitsPlugin,
  pseudosPlugin,
  breakpointsPlugin
} from '../fixtures/plugins';

// Plugin types
// pattern: sets the value based on a regex
// lookup: sets the value based on a predefined hash
// className: modifies the className
// atRule: nests atoms inside of an atRule


const config = {
  props: {
    zIndex: {
      prop: 'z-index',
      propName: 'z',
      enableIntegers: true
    },
    grow: {
      prop: 'grow',
      propName: 'grow',
      enableIntegers: true
    },
    order: {
      prop: 'order',
      propName: 'order',
      enableIntegers: true
    },
    flex: {
      prop: 'flex',
      propName: 'flex',
      enableIntegers: true
    },
    color: {
      prop: 'color',
      propName: '',
      pluginDefault: true,
      enableColors: true
    },
    backgroundColor: {
      prop: 'background-color',
      propName: 'bg',
      separator: '-',
      enableColors: true
    },
    backgroundSize: {
      prop: 'background-size',
      propName: 'bg',
      keywordValues: {
        separator: '-',
        values: {
          cover: 'cover',
          contain: 'contain'
        }
      },
      enableLengthUnits: true
    },
    fill: {
      prop: 'fill',
      propName: 'fill',
      separator: '-',
      enableColors: true
    },
    width: {
      prop: 'width',
      propName: 'w',
      enableLengthUnits: true
    },
    margin: {
      prop: 'margin',
      propName: 'm',
      enableLengthUnits: true
    },
    display: {
      prop: 'display',
      propName: '',
      keywordValues: {
        values: {
          block: 'block',
          'inline-block': 'inline-block',
          flex: 'flex'
        }
      },
    }
  },
  settings: {
    enableKeywordValues: true,
  },
  plugins: [
    lengthUnitsPlugin,
    integersPlugin,
    colorsPlugin,
    pseudosPlugin,
    breakpointsPlugin
  ]
};

const lengthUnitClassnames = ['bg100p','w100vw','m10'];
const integerClassnames = ['z100','grow2','order-1','flex2'];
const colorClassnames = ['bg-pink','black','fill-white','bg-black_20'];
const keywordClasses = ['hover-bg-cover','flex','inline-block','block'];

describe('generateLibrary', () => {
  it('processes integer classes', () => {
    expect(generateLibrary(
      [
        ...integerClassnames,
        ...colorClassnames,
        ...keywordClasses,
        ...lengthUnitClassnames
      ],
      config
    )).toEqual({
      'bg100p': { 'background-size': '100%' },
      'bg-pink': { 'background-color': '#FF0099' },
      'black': { 'color': '#000000' },
      'bg-black_20': { 'background-color': 'rgba(0,0,0,0.2)'},
      'flex': { display: 'flex' },
      'flex2': { flex: '2' },
      'fill-white': { 'fill': '#FFFFFF' },
      'grow2': { grow: '2' },
      'hover-bg-cover': { 'background-size': 'cover' },
      'm10': { margin: '6rem' },
      'order-1': { order: '-1' },
      'w100vw': { width: '100vw' },
      'z100': { 'z-index': '100' }
    });
  });
});