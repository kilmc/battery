/* eslint-env jest, node */
import {
  generateLibrary
} from '../index';

// Plugin types
// pattern: sets the value based on a regex
// lookup: sets the value based on a predefined hash
// className: modifies the className
// atRule: nests atoms inside of an atRule

const integerPlugin = {
  name: 'integers',
  type: 'pattern',
  valueRegexString: '\\d+|-\\d+'
};

const colorsPlugin = {
  name: 'colors',
  type: 'lookup',
  values: {
    'black': '#000000',
    'pink': '#FF0099',
    'white': '#FFFFFF',
  }
};

const lengthUnitsPlugin = {
  name: 'lengthUnits',
  type: 'pattern',
  valueRegexString: '\\d+|-\\d+'
};

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
    }
  },
  settings: {
    enableKeywordValues: true,
  },
  plugins: [
    lengthUnitsPlugin,
    integerPlugin,
    colorsPlugin,
  ]
};

const lengthUnitClassnames = ['bg100p','w100vw','m10'];
const integerClassnames = ['z100','grow2','order-1'];
const colorClassnames = ['bg-pink','black','fill-white'];
const keywordClasses = ['hover-bg-cover'];

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
      'bg-pink': { 'background-color': '#FF0099' },
      'black': { 'background-color': '#000000' },
      'fill-white': { 'fill': '#FFFFFF' },
      'grow2': { grow: '2' },
      'hover-bg-cover': { 'background-size': 'cover' },
      'order-1': { order: '-1' },
      'z100': { 'z-index': '100' }
    });
  });
});