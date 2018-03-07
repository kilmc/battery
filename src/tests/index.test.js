/* eslint-env jest, node */
import {
  generateCSS
} from '../index';

// Plugin types
// pattern: sets the value based on a regex
// lookup: sets the value based on a predefined hash
// className: modifies the className
// atRule: nests atoms inside of an atRule

const integerPlugin = {
  name: 'integers',
  type: 'pattern',
  valueRegexString: '(\\d+|-\\d+)'
};

const colorsPlugin = {
  name: 'colors',
  type: 'lookup',
  values: {
    'black': '#000000',
    'green-500': '#25CB68',
    'grey-200': '#E8E8E8',
  }
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
      }
    }
  },
  settings: {
    enableKeywordValues: true,
  },
  plugins: [
    integerPlugin,
    colorsPlugin
  ]
};

const integerClassnames = ['z100','grow2','order-1'];
const colorClassnames = ['bg-green-500','black','fill-grey-200'];
const keywordClasses = ['hover-bg-cover'];

describe('generateCSS', () => {
  it('processes integer classes', () => {
    expect(generateCSS(
      [
        ...integerClassnames,
        ...colorClassnames,
        ...keywordClasses
      ],
      config
    )).toBe(`.z100 { z-index: 100 }
.grow2 { grow: 2 }
.order-1 { order: -1 }
.bg-green-500 { background-color: #25CB68 }
.black { color: #000000 }
.fill-grey-200 { fill: #E8E8E8 }
.bg-cover { background-size: cover }`);
  });
});