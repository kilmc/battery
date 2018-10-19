/* eslint-env jest, node */
import { generateCSS } from '../src/';
import generateLibrary from '../src/generators/generateLibrary';
import {
  backgroundSize,
  position,
  height,
  width,
  overflow,
  top
} from './fixtures/config/props';
import { gridCol } from './fixtures/config/classPlugins';

const backgroundColoProp = {
  prop: 'background-color',
  propName: 'bg',
  separator: '-',
  enablePlugin: 'colors'
};

const borderProp = {
  prop: 'border',
  propName: 'border',
  keywordValues: {
    separator: '-',
    values: { default: '1px solid #000' }
  }
};

const colorProp = {
  prop: 'color',
  propName: '',
  pluginDefault: true,
  enablePlugin: 'colors'
};

const displayProp = {
  prop: 'display',
  propName: '',
  keywordValues: {
    values: {
      flex: 'flex'
    }
  }
};

const fontSizeProp = {
  prop: 'font-size',
  propName: 'fz',
  enablePlugin: 'lengthUnits'
};

const flexProp = {
  prop: 'flex',
  propName: 'flex',
  enablePlugin: 'integers'
};

const flexDirectionProp = {
  prop: 'flex-direction',
  propName: 'flex',
  keywordValues: {
    separator: '-',
    values: { column: 'column' }
  }
};

const lineHeightProp = {
  prop: 'line-height',
  propName: 'lh',
  enablePlugin: 'lengthUnits'
};

const marginProp = {
  prop: 'margin',
  propName: 'm',
  subProps: {
    t: 'top',
    r: 'right',
    b: 'bottom',
    l: 'left',
    x: 'left right',
    y: 'top bottom'
  },
  keywordValues: { separator: '-', values: { auto: 'auto' } }
};

const widthProp = {
  prop: 'width',
  propName: 'w',
  enablePlugin: 'lengthUnits'
};

const zIndexProp = {
  prop: 'z-index',
  propName: 'z',
  enablePlugin: 'integers'
};

const colorsPlugin = {
  name: 'colors',
  type: 'lookup',
  values: { black: '#000000' }
};

const integersPlugin = {
  name: 'integers',
  type: 'pattern',
  valueRegexString: '\\d+|-\\d+'
};

const lengthUnitsPlugin = {
  name: 'lengthUnits',
  type: 'pattern',
  valueRegexString: '\\d+|-\\d+',
  valueModifiers: [
    {
      indicator: 'p',
      modifierFn: x => `${x}%`
    },
    {
      indicator: 'px',
      modifierFn: x => `${x}px`
    },
    {
      indicator: '',
      default: true,
      modifierFn: x => `${x * 6}px`
    }
  ]
};

const breakpointsPlugin = {
  name: 'breakpoints',
  type: 'atrule',
  atrule: 'media',
  prefixOrSuffix: 'suffix',
  modifiers: [
    {
      indicator: 'sm',
      separator: '-',
      condition: '(min-width: 560px)'
    }
  ]
};

const pseudosPlugin = {
  name: 'pseudos',
  type: 'classname',
  prefixOrSuffix: 'prefix',
  modifiers: [{ separator: '-', indicator: 'hover' }]
};

describe('generateLibrary', () => {
  it('generates mutliple classObjects', () => {
    const config = {
      props: [backgroundSize]
    };

    const testClasses = ['bg-contain', 'bg-cover'];

    expect(generateLibrary(testClasses, config)).toEqual({
      'bg-contain': { 'background-size': 'contain' },
      'bg-cover': { 'background-size': 'cover' }
    });
  });

  describe('keywordValues', () => {
    it('handles keywordValues', () => {
      const config = {
        props: [backgroundSize]
      };

      const testClasses = ['bg-contain'];

      expect(generateLibrary(testClasses, config)).toEqual({
        'bg-contain': { 'background-size': 'contain' }
      });
    });

    it('strips "default" value string from final className', () => {
      const config = {
        props: [borderProp]
      };

      const testClasses = ['border'];

      expect(generateLibrary(testClasses, config)).toEqual({
        border: { border: '1px solid #000' }
      });
    });
  });

  describe('plugins', () => {
    it('handles pattern plugins', () => {
      const config = {
        plugins: [integersPlugin],
        props: [zIndexProp]
      };

      const testClasses = ['z9', 'z-1'];

      expect(generateLibrary(testClasses, config)).toEqual({
        z9: { 'z-index': '9' },
        'z-1': { 'z-index': '-1' }
      });
    });

    it('handles lookup plugins', () => {
      const config = {
        plugins: [colorsPlugin],
        props: [backgroundColoProp],
        settings: { enableKeywordValues: true }
      };

      const testClasses = ['bg-black'];

      expect(generateLibrary(testClasses, config)).toEqual({
        'bg-black': { 'background-color': '#000000' }
      });
    });

    it('handles plugin valueModifiers', () => {
      const config = {
        plugins: [lengthUnitsPlugin],
        props: [widthProp]
      };

      const testClasses = ['w100p'];

      expect(generateLibrary(testClasses, config)).toEqual({
        w100p: { width: '100%' }
      });
    });

    it('handles default valueModifiers', () => {
      const config = {
        plugins: [lengthUnitsPlugin],
        props: [widthProp],
        settings: { enableKeywordValues: true }
      };

      const testClasses = ['w4'];

      expect(generateLibrary(testClasses, config)).toEqual({
        w4: { width: '24px' }
      });
    });

    it('ignores prefix and suffix plugins', () => {
      const config = {
        plugins: [breakpointsPlugin, pseudosPlugin],
        props: [backgroundSize]
      };

      const testClasses = [
        'bg-contain-sm',
        'hover-bg-cover',
        'hover-bg-contain-sm'
      ];

      expect(generateLibrary(testClasses, config)).toEqual({
        'bg-contain-sm': { 'background-size': 'contain' },
        'hover-bg-cover': { 'background-size': 'cover' },
        'hover-bg-contain-sm': { 'background-size': 'contain' }
      });
    });

    it('handles default prop for plugin', () => {
      const config = {
        plugins: [colorsPlugin],
        props: [colorProp]
      };

      const testClasses = ['black'];

      expect(generateLibrary(testClasses, config)).toEqual({
        black: { color: '#000000' }
      });
    });

    it('handles escaping non standard character', () => {
      const breakpointsPlugin = {
        name: 'breakpoints',
        type: 'atrule',
        atrule: 'media',
        prefixOrSuffix: 'prefix',
        modifiers: [
          {
            indicator: 's',
            separator: ':',
            condition: '(min-width: 560px)'
          }
        ]
      };

      const config = {
        plugins: [breakpointsPlugin, colorsPlugin],
        props: [colorProp],
        settings: { enableKeywordValues: true }
      };

      const testClasses = ['s:black'];
      expect(generateLibrary(testClasses, config)).toEqual({
        's:black': { color: '#000000' }
      });
    });
  });

  describe('config', () => {
    // it('gives an error if no propConfigs are present', () => {});
    // it('allows plugins to be undefined', () => {});
  });

  describe('subProps', () => {
    const config = {
      props: [marginProp]
    };

    it('handles subProps', () => {
      const testClasses = ['mt-auto', 'ml-auto'];
      expect(generateLibrary(testClasses, config)).toEqual({
        'mt-auto': { 'margin-top': 'auto' },
        'ml-auto': { 'margin-left': 'auto' }
      });
    });

    it('handles subProps with multiple properties', () => {
      const testClasses = ['mx-auto'];
      expect(generateLibrary(testClasses, config)).toEqual({
        'mx-auto': {
          'margin-left': 'auto',
          'margin-right': 'auto'
        }
      });
    });
  });

  describe('allowed/disaalowed values', () => {
    it('only renders allowed classes', () => {
      const colorsPlugin = {
        name: 'colors',
        type: 'lookup',
        values: { black: '#000000' }
      };

      const config = {
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
          }
        ],
        plugins: [colorsPlugin],
        settings: {
          enableKeywordValues: true
        }
      };

      const testClasses = ['black', 'pink', 'bg-pink', 'bg-black'];

      expect(generateLibrary(testClasses, config)).toEqual({
        black: { color: '#000000' },
        'bg-black': { 'background-color': '#000000' }
      });
    });
  });

  it('handles propName clashing between propConfigs', () => {
    const config = {
      plugins: [integersPlugin],
      props: [displayProp, flexDirectionProp, flexProp]
    };

    const testClasses = ['flex', 'flex1', 'flex-column'];

    expect(generateLibrary(testClasses, config)).toEqual({
      flex: { display: 'flex' },
      flex1: { flex: '1' },
      'flex-column': { 'flex-direction': 'column' }
    });
  });
});

describe('generateCSS', () => {
  it('renders multiple declarations', () => {
    const lengthUnits = {
      name: 'lengthUnits',
      type: 'pattern',
      valueRegexString: '\\d+|-\\d+',
      valueModifiers: [
        {
          indicator: 'px',
          modifierFn: x => `${x}px`
        }
      ]
    };

    const config = {
      plugins: [
        lengthUnits,
        {
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
            }
          ]
        }
      ],
      props: [fontSizeProp, lineHeightProp]
    };

    expect(generateCSS(['fz14px-sm'], config))
      .toEqual(`@media (min-width: 560px) {
  .fz14px-sm { font-size: 14px; }
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
        }
      ]
    };

    const lengthUnits = {
      name: 'lengthUnits',
      type: 'pattern',
      valueRegexString: '\\d+|-\\d+',
      valueModifiers: [
        {
          indicator: '%',
          modifierFn: x => `${x}%`
        }
      ]
    };

    const config = {
      plugins: [lengthUnits, breakpointsPlugin],
      props: [
        {
          prop: 'width',
          propName: 'w',
          enablePlugin: 'lengthUnits'
        }
      ],
      settings: {
        enableKeywordValues: true
      }
    };

    expect(generateCSS(['w100%'], config)).toEqual(
      '.w100\\% { width: 100%; }\n'
    );
    expect(generateCSS(['s:w100%'], config)).toEqual(
      `@media (min-width: 560px) {
  .s\\:w100\\% { width: 100%; }
}`
    );
  });
});

const forScreenreaderPlugin = {
  name: 'forScreenreader',
  type: 'class',
  className: [
    'for-screenreader',
    ['absolute', 't-100px', 'w1px', 'h1px', 'clip']
  ]
};

const squarePlugin = {
  name: 'square',
  type: 'class',
  className: ['square'],
  modifiers: [
    {
      regex: '\\d+',
      modifierFn: size => [`h${size}`, `w${size}`]
    }
  ]
};

describe('generate utility classes', () => {
  it('renders simple utility classes', () => {
    const config = {
      props: [position, width, height, overflow, top],
      plugins: [forScreenreaderPlugin, lengthUnitsPlugin]
    };
    expect(generateCSS(['for-screenreader'], config)).toEqual(
      `.for-screenreader {
  width: 1px;
  top: -100px;
  position: absolute;
  overflow: hidden;
  height: 1px;
}\n`
    );
  });

  it('allows a plugin to do a simple modification', () => {
    const config = {
      props: [width, height],
      plugins: [squarePlugin, lengthUnitsPlugin]
    };

    expect(generateCSS(['square4'], config)).toEqual(
      `.square4 {
  width: 24px;
  height: 24px;
}
`
    );
  });

  it('allows a plugin to do a complex modification', () => {
    const config = {
      props: [width, height],
      plugins: [lengthUnitsPlugin, gridCol]
    };

    expect(generateCSS(['col-10', 'col-offset-10'], config)).toEqual(
      `.col-10 { width: calc(10/12 * 100%); }
.col-offset-10 { margin-left: calc(10/12 * 100%); }
`
    );
  });
});
