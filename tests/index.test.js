/* eslint-env jest, node */
import { generateCSS } from '../src/';
import generateLibrary from '../src/generators/generateLibrary';

import {
  integersPlugin,
  colorsPlugin,
  lengthUnitsPlugin,
  pseudosPlugin,
  breakpointsPlugin
} from './fixtures/plugins';

// Plugin types
// pattern: sets the value based on a regex
// lookup: sets the value based on a predefined hash
// className: modifies the className
// atRule: nests atoms inside of an atRule


const config = {
  props: [
    {
      prop: 'z-index',
      propName: 'z',
      enablePlugin: 'integers'
    },
    {
      prop: 'grow',
      propName: 'grow',
      enablePlugin: 'integers'
    },
    {
      prop: 'order',
      propName: 'order',
      enablePlugin: 'integers'
    },
    {
      prop: 'flex',
      propName: 'flex',
      enablePlugin: 'integers'
    },
    {
      prop: 'color',
      propName: '',
      pluginDefault: true,
      enablePlugin: 'colors'
    },
    {
      prop: 'border',
      propName: 'border',
      subPropSeparator: '-',
      subProps: {
        top: 'top',
        right: 'right',
        bottom: 'bottom',
        left: 'left'
      },
      keywordValues: {
        separator: '-',
        values: {
          default: '0.2rem solid #000'
        }
      }
    },
    {
      prop: 'position',
      propName: '',
      keywordValues: {
        values: {
          relative: 'relative',
        }
      }
    },
    {
      prop: 'border-radius',
      propName: '',
      keywordValues: {
        values: {
          rounded: '0.2rem',
          'rounded-50%': '50%'
        }
      }
    },
    {
      prop: 'height',
      propName: 'h',
      enablePlugin: 'lengthUnits'
    },
    {
      prop: 'background-color',
      propName: 'bg',
      separator: '-',
      enablePlugin: 'colors'
    },
    {
      prop: 'background-size',
      propName: 'bg',
      keywordValues: {
        separator: '-',
        values: {
          cover: 'cover',
          contain: 'contain'
        }
      },
      enablePlugin: 'lengthUnits'
    },
    {
      prop: 'fill',
      propName: 'fill',
      separator: '-',
      enablePlugin: 'colors'
    },
    {
      prop: 'font-size',
      propName: 'fz',
      enablePlugin: 'lengthUnits'
    },
    {
      prop: 'line-height',
      propName: 'lh',
      enablePlugin: 'lengthUnits'
    },
    {
      prop: 'width',
      propName: 'w',
      enablePlugin: 'lengthUnits'
    },
    {
      prop: 'margin',
      propName: 'm',
      subProps: {
        't': 'top',
        'r': 'right',
        'b': 'bottom',
        'l': 'left',
        'x': 'left right',
        'y': 'top bottom'
      },
      keywordValues: {
        separator: '-',
        values: {
          auto: 'auto'
        }
      },
      enablePlugin: 'lengthUnits'
    },
    {
      prop: 'display',
      propName: '',
      keywordValues: {
        values: {
          block: 'block',
          'inline-block': 'inline-block',
          flex: 'flex'
        }
      },
    },
    {
      prop: 'flex-direction',
      propName: 'flex',
      keywordValues: {
        separator: '-',
        values: {
          row: 'row',
          column: 'column',
        }
      }
    }
  ],
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

const lengthUnitClassnames = ['bg100p','w100vw','m10','bg10px'];
const integerClassnames = ['z100','grow2','order-1','flex2'];
const colorClassnames = ['bg-pink','black','fill-white','bg-black_20'];
const keywordClasses = ['hover-bg-cover','flex','inline-block','block','flex','flex-column','rounded-50%','border','border-bottom'];

const mdIntegerClassNames = integerClassnames.map(x => `${x}-md`);
const lgLengthUnits = lengthUnitClassnames.map(x => `${x}-lg`);
const hoverColorClassNames = colorClassnames.map(x => `hover-${x}`);
const focusSmColorClassNames = colorClassnames.map(x => `hover-${x}-sm`);

describe('generateLibrary', () => {
  it('process a whole mess of classes', () => {
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
      'border': { border: '0.2rem solid #000' },
      'border-bottom': { 'border-bottom': '0.2rem solid #000' },
      'flex': { display: 'flex' },
      'flex2': { flex: '2' },
      'fill-white': { 'fill': '#FFFFFF' },
      'grow2': { grow: '2' },
      'hover-bg-cover': { 'background-size': 'cover' },
      'm10': { margin: '6rem' },
      'order-1': { order: '-1' },
      'rounded-50%': { 'border-radius': '50%'},
      'w100vw': { width: '100vw' },
      'z100': { 'z-index': '100' },
      'bg10px': { 'background-size': '1rem' },
      'inline-block': { display: 'inline-block' },
      'flex-column': { 'flex-direction': 'column' },
      'block': { display: 'block' }
    });
  });

  it('generates molecules', () => {
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
    const testConfig = { ...config, molecules: moleculeConfig };
    expect(generateLibrary(['headline-500','bttn','fz14px','card'],testConfig)).toEqual({
      'type-14': {
        'font-size': '1.4rem',
        'line-height': '1.8rem'
      },
      'type-16-sm': {
        'font-size': '1.6rem',
        'line-height': '2.4rem'
      },
      'type-21-lg': {
        'font-size': '2.1rem',
        'line-height': '3rem'
      },
      'bttn': {
        position: 'relative',
        'border-radius': '0.2rem',
        height: '4.2rem'
      },
      'fz14px': {
        'font-size': '1.4rem'
      }
    });
  });

  describe('allowed/disaalowed values', () => {
    const disallowedConfig = {
      props: [
        {
          prop: 'background-color',
          propName: 'bg',
          separator: '-',
          enablePlugin: 'colors',
          allowedValues: ['black']
        },
        {
          prop: 'color',
          propName: '',
          pluginDefault: true,
          enablePlugin: 'colors',
          disallowedValues: ['pink']
        },
      ],
      plugins: [colorsPlugin],
      settings: {
        enableKeywordValues: true,
      }
    };

    it('only renders allowed classes', () => {
      expect(generateLibrary(['black','pink','bg-pink','bg-black'],disallowedConfig)).toEqual({
        black: { color: '#000000' },
        'bg-black': { 'background-color': '#000000'}
      });
    });
  });
});

describe('generateCSS', () => {
  it('should generate CSS', () => {
    expect(generateCSS(
      [
        ...integerClassnames,
        ...colorClassnames,
        ...keywordClasses,
        ...lengthUnitClassnames,
        ...mdIntegerClassNames,
        ...lgLengthUnits,
        ...hoverColorClassNames,
        ...focusSmColorClassNames,
        ...['mt4','hover-mt100p']
      ],
      config
    )).toEqual(`.bg-black_20 { background-color: rgba(0,0,0,0.2); }
.bg-pink { background-color: #FF0099; }
.bg100p { background-size: 100%; }
.bg10px { background-size: 1rem; }
.black { color: #000000; }
.block { display: block; }
.border { border: 0.2rem solid #000; }
.border-bottom { border-bottom: 0.2rem solid #000; }
.fill-white { fill: #FFFFFF; }
.flex { display: flex; }
.flex-column { flex-direction: column; }
.flex2 { flex: 2; }
.grow2 { grow: 2; }
.inline-block { display: inline-block; }
.m10 { margin: 6rem; }
.mt4 { margin-top: 2.4rem; }
.order-1 { order: -1; }
.w100vw { width: 100vw; }
.z100 { z-index: 100; }
.rounded-50\\% { border-radius: 50%; }
.hover-bg-black_20:hover { background-color: rgba(0,0,0,0.2); }
.hover-bg-cover:hover { background-size: cover; }
.hover-bg-pink:hover { background-color: #FF0099; }
.hover-black:hover { color: #000000; }
.hover-fill-white:hover { fill: #FFFFFF; }
.hover-mt100p:hover { margin-top: 100%; }

@media (min-width: 560px) {
  .hover-bg-black_20-sm:hover { background-color: rgba(0,0,0,0.2); }
  .hover-bg-pink-sm:hover { background-color: #FF0099; }
  .hover-black-sm:hover { color: #000000; }
  .hover-fill-white-sm:hover { fill: #FFFFFF; }
}

@media (min-width: 940px) {
  .flex2-md { flex: 2; }
  .grow2-md { grow: 2; }
  .order-1-md { order: -1; }
  .z100-md { z-index: 100; }
}

@media (min-width: 1040px) {
  .bg100p-lg { background-size: 100%; }
  .bg10px-lg { background-size: 1rem; }
  .m10-lg { margin: 6rem; }
  .w100vw-lg { width: 100vw; }
}
`);
  });
});
