/* eslint-env jest, node */
import { generateCSS } from '../src/';
import generateLibrary from '../src/generators/generateLibrary';

// describe('generateLibrary', () => {
//   it('process a whole mess of classes', () => {
//     expect(generateLibrary(
//       [
//         ...integerClassnames,
//         ...colorClassnames,
//         ...keywordClasses,
//         ...lengthUnitClassnames
//       ],
//       config
//     )).toEqual({
//       'bg100p': { 'background-size': '100%' },
//       'bg-pink': { 'background-color': '#FF0099' },
//       'black': { 'color': '#000000' },
//       'bg-black_20': { 'background-color': 'rgba(0,0,0,0.2)'},
//       'border': { border: '0.2rem solid #000' },
//       'border-bottom': { 'border-bottom': '0.2rem solid #000' },
//       'flex': { display: 'flex' },
//       'flex2': { flex: '2' },
//       'fill-white': { 'fill': '#FFFFFF' },
//       'grow2': { grow: '2' },
//       'hover-bg-cover': { 'background-size': 'cover' },
//       'm10': { margin: '6rem' },
//       'order-1': { order: '-1' },
//       'rounded-50%': { 'border-radius': '50%'},
//       'w100vw': { width: '100vw' },
//       'z100': { 'z-index': '100' },
//       'bg10px': { 'background-size': '1rem' },
//       'inline-block': { display: 'inline-block' },
//       'flex-column': { 'flex-direction': 'column' },
//       'block': { display: 'block' }
//     });
//   });


// describe('generateCSS', () => {
//   it('should generate CSS', () => {
//     expect(generateCSS(
//       [
//         ...integerClassnames,
//         ...colorClassnames,
//         ...keywordClasses,
//         ...lengthUnitClassnames,
//         ...mdIntegerClassNames,
//         ...lgLengthUnits,
//         ...hoverColorClassNames,
//         ...focusSmColorClassNames,
//         ...['mt4','hover-mt100p']
//       ],
//       config
//     )).toEqual(`.bg-black_20 { background-color: rgba(0,0,0,0.2); }
// .bg-pink { background-color: #FF0099; }
// .bg100p { background-size: 100%; }
// .bg10px { background-size: 1rem; }
// .black { color: #000000; }
// .block { display: block; }
// .border { border: 0.2rem solid #000; }
// .border-bottom { border-bottom: 0.2rem solid #000; }
// .fill-white { fill: #FFFFFF; }
// .flex { display: flex; }
// .flex-column { flex-direction: column; }
// .flex2 { flex: 2; }
// .grow2 { grow: 2; }
// .inline-block { display: inline-block; }
// .m10 { margin: 6rem; }
// .mt4 { margin-top: 2.4rem; }
// .order-1 { order: -1; }
// .w100vw { width: 100vw; }
// .z100 { z-index: 100; }
// .rounded-50\\% { border-radius: 50%; }
// .hover-bg-black_20:hover { background-color: rgba(0,0,0,0.2); }
// .hover-bg-cover:hover { background-size: cover; }
// .hover-bg-pink:hover { background-color: #FF0099; }
// .hover-black:hover { color: #000000; }
// .hover-fill-white:hover { fill: #FFFFFF; }
// .hover-mt100p:hover { margin-top: 100%; }

// @media (min-width: 560px) {
//   .hover-bg-black_20-sm:hover { background-color: rgba(0,0,0,0.2); }
//   .hover-bg-pink-sm:hover { background-color: #FF0099; }
//   .hover-black-sm:hover { color: #000000; }
//   .hover-fill-white-sm:hover { fill: #FFFFFF; }
// }

// @media (min-width: 940px) {
//   .flex2-md { flex: 2; }
//   .grow2-md { grow: 2; }
//   .order-1-md { order: -1; }
//   .z100-md { z-index: 100; }
// }

// @media (min-width: 1040px) {
//   .bg100p-lg { background-size: 100%; }
//   .bg10px-lg { background-size: 1rem; }
//   .m10-lg { margin: 6rem; }
//   .w100vw-lg { width: 100vw; }
// }
// `);
//   });
// });

describe('generateLibrary', () => {
  it('generates mutliple classObjects', () => {
    const config = {
      props: [{
        prop: 'background-size',
        propName: 'bg',
        keywordValues: {
          separator: '-',
          values: { cover: 'cover', contain: 'contain' }
        }
      }],
      settings: { enableKeywordValues: true }
    };

    const testClasses = ['bg-contain','bg-cover'];

    expect(generateLibrary(testClasses,config)).toEqual({
      'bg-contain': { 'background-size': 'contain' },
      'bg-cover': { 'background-size': 'cover' }
    });
  });

  describe('keywordValues', () => {
    it('handles keywordValues', () => {
      const config = {
        props: [{
          prop: 'background-size',
          propName: 'bg',
          keywordValues: {
            separator: '-',
            values: { cover: 'cover', contain: 'contain' }
          }
        }],
        settings: { enableKeywordValues: true }
      };

      const testClasses = ['bg-contain'];

      expect(generateLibrary(testClasses,config)).toEqual({
        'bg-contain': { 'background-size': 'contain' }
      });
    });

    it('strips "default" value string from final className', () => {
      const config = {
        props: [{
          prop: 'border',
          propName: 'border',
          keywordValues: {
            separator: '-',
            values: { default: '1px solid #000' }
          }
        }],
        settings: { enableKeywordValues: true }
      };

      const testClasses = ['border'];

      expect(generateLibrary(testClasses,config)).toEqual({
        'border': { 'border': '1px solid #000' }
      });
    });
  });

  describe('plugins', () => {
    it('handles pattern plugins', () => {
      const integersPlugin = {
        name: 'integers',
        type: 'pattern',
        valueRegexString: '\\d+|-\\d+'
      };

      const config = {
        plugins: [integersPlugin],
        props: [{
          prop: 'z-index',
          propName: 'z',
          enablePlugin: 'integers'
        }],
        settings: { enableKeywordValues: true }
      };

      const testClasses = ['z9','z-1'];

      expect(generateLibrary(testClasses,config)).toEqual({
        z9: { 'z-index': '9' },
        'z-1': { 'z-index': '-1' },
      });
    });

    it('handles lookup plugins', () => {
      const colorsPlugin = {
        name: 'colors',
        type: 'lookup',
        values: { 'black': '#000000' }
      };

      const config = {
        plugins: [colorsPlugin],
        props: [{
          prop: 'background-color',
          propName: 'bg',
          separator: '-',
          enablePlugin: 'colors'
        }],
        settings: { enableKeywordValues: true }
      };

      const testClasses = ['bg-black'];

      expect(generateLibrary(testClasses,config)).toEqual({
        'bg-black': { 'background-color': '#000000' },
      });
    });

    it('handles plugin valueModifiers', () => {
      const lengthUnitsPlugin = {
        name: 'lengthUnits',
        type: 'pattern',
        valueRegexString: '\\d+|-\\d+',
        valueModifiers: [{
          indicator: 'p',
          modifierFn: (x) => `${x}%`
        }]
      };

      const config = {
        plugins: [lengthUnitsPlugin],
        props: [{
          prop: 'width',
          propName: 'w',
          enablePlugin: 'lengthUnits'
        }],
        settings: { enableKeywordValues: true }
      };

      const testClasses = ['w100p'];

      expect(generateLibrary(testClasses,config)).toEqual({
        'w100p': { 'width': '100%' },
      });
    });

    it('handles default valueModifiers', () => {
      const lengthUnitsPlugin = {
        name: 'lengthUnits',
        type: 'pattern',
        valueRegexString: '\\d+|-\\d+',
        valueModifiers: [{
          indicator: '',
          default: true,
          modifierFn: (x) => `${x*6}px`
        }]
      };

      const config = {
        plugins: [lengthUnitsPlugin],
        props: [{
          prop: 'width',
          propName: 'w',
          enablePlugin: 'lengthUnits'
        }],
        settings: { enableKeywordValues: true }
      };

      const testClasses = ['w4'];

      expect(generateLibrary(testClasses,config)).toEqual({
        w4: { 'width': '24px' }
      });
    });

    it('ignores prefix and suffix plugins', () => {
      const breakpointsPlugin = {
        name: 'breakpoints',
        type: 'atrule',
        atrule: 'media',
        prefixOrSuffix: 'suffix',
        modifiers: [{
          indicator: 'sm',
          separator: '-',
          condition: '(min-width: 560px)'
        }]
      };

      const pseudosPlugin = {
        name: 'pseudos',
        type: 'classname',
        prefixOrSuffix: 'prefix',
        modifiers: [{ separator: '-', indicator: 'hover' }]
      };

      const config = {
        plugins: [breakpointsPlugin, pseudosPlugin],
        props: [{
          prop: 'background-size',
          propName: 'bg',
          keywordValues: {
            separator: '-',
            values: { cover: 'cover', contain: 'contain' }
          }
        }],
        settings: { enableKeywordValues: true }
      };

      const testClasses = ['bg-contain-sm','hover-bg-cover','hover-bg-contain-sm'];

      expect(generateLibrary(testClasses,config)).toEqual({
        'bg-contain-sm': { 'background-size': 'contain' },
        'hover-bg-cover': { 'background-size': 'cover' },
        'hover-bg-contain-sm': { 'background-size': 'contain' }
      });
    });

    it('handles default prop for plugin', () => {
      const colorsPlugin = {
        name: 'colors',
        type: 'lookup',
        values: { 'black': '#000000' }
      };

      const config = {
        plugins: [colorsPlugin],
        props: [{
          prop: 'color',
          propName: '',
          pluginDefault: true,
          enablePlugin: 'colors'
        }],
        settings: { enableKeywordValues: true }
      };

      const testClasses = ['black'];

      expect(generateLibrary(testClasses,config)).toEqual({
        'black': { 'color': '#000000' },
      });
    });

    it('handles escaping non standard character', () => {
      const colorsPlugin = {
        name: 'colors',
        type: 'lookup',
        values: { 'black': '#000000' }
      };

      const breakpointsPlugin = {
        name: 'breakpoints',
        type: 'atrule',
        atrule: 'media',
        prefixOrSuffix: 'prefix',
        modifiers: [{
          indicator: 's',
          separator: ':',
          condition: '(min-width: 560px)'
        }]
      };

      const config = {
        plugins: [breakpointsPlugin,colorsPlugin],
        props: [{
          prop: 'color',
          propName: '',
          pluginDefault: true,
          enablePlugin: 'colors'
        }],
        settings: { enableKeywordValues: true }
      };

      const testClasses = ['s:black'];
      expect(generateLibrary(testClasses,config)).toEqual({
        's\:black': { color: '#000000' }
      });
    });
  });

  describe('config', () => {
    // it('gives an error if no propConfigs are present', () => {});
    // it('allows plugins to be undefined', () => {});
  });

  describe('subProps', () => {
    const config = {
      props: [{
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
        keywordValues: { separator: '-', values: { auto: 'auto' } }
      }],
      settings: { enableKeywordValues: true }
    };

    it('handles subProps', () => {
      const testClasses = ['mt-auto','ml-auto'];
      expect(generateLibrary(testClasses,config)).toEqual({
        'mt-auto': { 'margin-top': 'auto' },
        'ml-auto': { 'margin-left': 'auto' }
      });
    });

    it('handles subProps with multiple properties', () => {
      const testClasses = ['mx-auto'];
      expect(generateLibrary(testClasses,config)).toEqual({
        'mx-auto': {
          'margin-left': 'auto',
          'margin-right': 'auto'
        }
      });
    });
  });

  describe('molecules', () => {
    it('merges multiple classObjects into one', () => {
      const lengthUnitsPlugin = {
        name: 'lengthUnits',
        type: 'pattern',
        valueRegexString: '\\d+|-\\d+',
        valueModifiers: [{
          indicator: 'px',
          modifierFn: (x) => `${x}px`
        }]
      };

      const config = {
        plugins: [lengthUnitsPlugin],
        props: [{
          prop: 'font-size',
          propName: 'fz',
          enablePlugin: 'lengthUnits'
        },{
          prop: 'line-height',
          propName: 'lh',
          enablePlugin: 'lengthUnits'
        }],
        molecules: {
          merge: { 'type-12': ['fz12px','lh18px'] },
          expand: {}
        },
        settings: { enableKeywordValues: true }
      };

      const testClasses = ['type-12'];

      expect(generateLibrary(testClasses,config)).toEqual({
        'type-12': {
          'font-size': '12px',
          'line-height': '18px'
        }
      });
    });
  });

  describe('allowed/disaalowed values', () => {
    it('only renders allowed classes', () => {
      const colorsPlugin = {
        name: 'colors',
        type: 'lookup',
        values: { 'black': '#000000' }
      };

      const config = {
        props: [{
          prop: 'background-color',
          propName: 'bg',
          separator: '-',
          enablePlugin: 'colors',
          allowedValues: ['black']
        },{
          prop: 'color',
          propName: '',
          pluginDefault: true,
          enablePlugin: 'colors',
          disallowedValues: ['pink']
        }],
        plugins: [colorsPlugin],
        settings: {
          enableKeywordValues: true,
        }
      };

      const testClasses = ['black','pink','bg-pink','bg-black'];

      expect(generateLibrary(testClasses,config)).toEqual({
        black: { color: '#000000' },
        'bg-black': { 'background-color': '#000000'}
      });
    });
  });

  it('handles propName clashing between propConfigs', () => {
    const integersPlugin = {
      name: 'integers',
      type: 'pattern',
      valueRegexString: '\\d+|-\\d+'
    };

    const config = {
      plugins: [integersPlugin],
      props: [{
        prop: 'display',
        propName: '',
        keywordValues: {
          values: {
            flex: 'flex'
          }
        }
      },{
        prop: 'flex-direction',
        propName: 'flex',
        keywordValues: {
          separator: '-',
          values: { column: 'column' }
        }
      },{
        prop: 'flex',
        propName: 'flex',
        enablePlugin: 'integers'
      }],
      settings: {
        enableKeywordValues: true,
      }
    };

    const testClasses = ['flex','flex1','flex-column'];

    expect(generateLibrary(testClasses,config)).toEqual({
      flex: { display: 'flex' },
      'flex1': { 'flex': '1' },
      'flex-column': { 'flex-direction': 'column' }
    });
  });
});


// const moleculeConfig =  {
//   expand: {
//     'headline-500': 'type-14 type-16-sm type-21-lg',
//     card: 'white rounded shadow-1'
//   },
//   merge: {
//     'type-14': 'fz14px lh3',
//     'type-16': 'fz16px lh4',
//     'type-21': 'fz21px lh5',
//     bttn: 'relative rounded h7'
//   }
// };

// expect(generateLibrary(['headline-500','bttn','fz14px','card'],testConfig)).toEqual({
//   'type-14': {
//     'font-size': '14px',
//     'line-height': '1.8rem'
//   },
//   'type-16-sm': {
//     'font-size': '1.6rem',
//     'line-height': '2.4rem'
//   },
//   'type-21-lg': {
//     'font-size': '2.1rem',
//     'line-height': '3rem'
//   },
//   'bttn': {
//     position: 'relative',
//     'border-radius': '0.2rem',
//     height: '4.2rem'
//   },
//   'fz14px': {
//     'font-size': '1.4rem'
//   }
// });
// });



describe('generateCSS', () => {
  it('renders multiple declarations', () => {
    const lengthUnits = {
      name: 'lengthUnits',
      type: 'pattern',
      valueRegexString: '\\d+|-\\d+',
      valueModifiers: [{
        indicator: 'px',
        modifierFn: (x) => `${x}px`
      }]
    };

    const config = {
      plugins: [lengthUnits,{
        name: 'breakpoints',
        type: 'atrule',
        atrule: 'media',
        prefixOrSuffix: 'suffix',
        modifiers: [
          {
            name: 'responsiveSmall',
            indicator: 'sm',
            separator: '-',
            condition: '(min-width: 560px)'
          },
        ]
      }],
      props: [{
        prop: 'font-size',
        propName: 'fz',
        enablePlugin: 'lengthUnits'
      },{
        prop: 'line-height',
        propName: 'lh',
        enablePlugin: 'lengthUnits'
      }],
      settings: {
        enableKeywordValues: true,
      },
      molecules: {
        merge: { 'type-14': ['fz14px','lh18px']},
        expand: {}
      }
    };

    expect(generateCSS(['type-14'],config)).toEqual(`.type-14 {
  font-size: 14px;
  line-height: 18px;
}
`);

    expect(generateCSS(['fz14px-sm'],config)).toEqual(`@media (min-width: 560px) {
  .fz14px-sm { font-size: 14px; }
}`);

    expect(generateCSS(['type-14-sm'],config)).toEqual(`@media (min-width: 560px) {
  .type-14-sm {
    font-size: 14px;
    line-height: 18px;
  }
}`);
  });

  it('correctly escapes non-standard characters', () => {
    const breakpointsPlugin = {
      name: 'breakpoints',
      type: 'atrule',
      atrule: 'media',
      prefixOrSuffix: 'prefix',
      modifiers: [
        {
          name: 'responsiveSmall',
          indicator: 's',
          separator: ':',
          condition: '(min-width: 560px)'
        },
      ]
    };

    const lengthUnits = {
      name: 'lengthUnits',
      type: 'pattern',
      valueRegexString: '\\d+|-\\d+',
      valueModifiers: [{
        indicator: '%',
        modifierFn: (x) => `${x}%`
      }]
    };

    const config = {
      plugins: [lengthUnits,breakpointsPlugin],
      props: [{
        prop: 'width',
        propName: 'w',
        enablePlugin: 'lengthUnits'
      }],
      settings: {
        enableKeywordValues: true,
      }
    };

    expect(generateCSS(['w100%'],config)).toEqual('.w100\\% { width: 100%; }\n');
    expect(generateCSS(['s:w100%'],config)).toEqual(`@media (min-width: 560px) {
  .s\\:w100\\% { width: 100%; }
}`);
  });
});
