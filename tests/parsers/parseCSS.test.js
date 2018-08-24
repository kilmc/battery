/* eslint-env jest, node */

import {
  parseStyleBlock,
  styleBlockToClassNames,
  declarationsToClassName,
  determineValue,
  determineValueType,
  formatKeywordValue,
  formatPluginValue,
  parseStyleBlocks
} from '../../src/parsers/parseCSS';

const zIndexConfig = {
  prop: 'z-index',
  propName: 'z',
  enablePlugin: 'integers'
};

const justifyContentConfig = {
  prop: 'justify-content',
  propName: 'justify',
  keywordValues: {
    values: { end: 'flex-end' },
    separator: '-'
  }
};

const displayConfig = {
  prop: 'display',
  propName: '',
  keywordValues: { values: { flex: 'flex' } }
};

const backgroundColorConfig = {
  prop: 'background-color',
  propName: 'bg',
  separator: '-',
  enablePlugin: 'colors'
};

const colorConfig = {
  prop: 'color',
  propName: '',
  enablePlugin: 'colors'
};

const integersPlugin = {
  name: 'integers',
  type: 'pattern',
  valueRegexString: '\\d+|-\\d+'
};

const colorsPlugin = {
  name: 'colors',
  type: 'lookup',
  values: {
    'black': '#000000',
    'white': '#FFFFFF'
  }
};

describe('parseStyleBlock', () => {
  it('converts a CSS string to a classObject', () => {
    const testStyleBlock = `
.project-card {
  display: block;
  border-radius: 0.2rem;
  background-color: #fff;
  padding: 1.8rem;
}
`;
    expect(parseStyleBlock(testStyleBlock)).toEqual({
      '.project-card': {
        display: 'block',
        'border-radius': '0.2rem',
        'background-color': '#fff',
        padding: '1.8rem'
      }
    });
  });

  it('preserves whitespace in the selector string', () => {
    const testStyleBlock = `
#header ul li .link {
  text-decoration: none;
}`;
    expect(parseStyleBlock(testStyleBlock)).toEqual({
      '#header ul li .link': {
        'text-decoration': 'none'
      }
    });
  });
});

describe('parseStyleBlocks', () => {
  it('parses multiple Sytle Blocks', () => {
    const testStyleBlock = `
.project-card {
  display: block;
  border-radius: 0.2rem;
  background-color: #fff;
  padding: 1.8rem;
}

.project-info {
  display: flex;
  justify-content: flex-end;
  z-index: 10;
  background-color: #000000;
  color: #FFFFFF;
}
`;
    expect(parseStyleBlocks(testStyleBlock)).toEqual([{
      '.project-card': {
        display: 'block',
        'border-radius': '0.2rem',
        'background-color': '#fff',
        padding: '1.8rem'
      }
    },{
      '.project-info': {
        display: 'flex',
        'justify-content': 'flex-end',
        'z-index': '10',
        'background-color': '#000000',
        color: '#FFFFFF'
      }
    }]);
  });
});

describe('determineValue', () => {
  describe('determineValueType', () => {
    it('determines the value type of a srcValue', () => {
      const config = {
        plugins: [integersPlugin],
        props: [justifyContentConfig,zIndexConfig]
      };

      const keywordTestValue = 'flex-end';
      const integerTestValue = '1';

      expect.assertions(2);
      expect(determineValueType(keywordTestValue,justifyContentConfig,config)).toEqual('keyword');
      expect(determineValueType(integerTestValue,zIndexConfig,config)).toEqual('plugin');
    });
  });

  describe('formatKeywordValue', () => {
    it('converts a srcValue to a formatted keywordValue', () => {
      const keywordValueConfig = {
        values: { end: 'flex-end' },
        separator: '-'
      };

      const testValue = 'flex-end';
      expect(formatKeywordValue(testValue,keywordValueConfig)).toEqual('-end');
    });
  });

  describe('formatPluginValue', () => {
    describe('pattern type', () => {
      it('converts a srcValue to a formatted pluginValue', () => {
        const config = {
          plugins: [integersPlugin],
          props: [zIndexConfig]
        };

        const testValue = '1';
        expect(formatPluginValue(testValue,zIndexConfig,config)).toEqual('1');
      });
    });

    describe('lookup type', () => {
      it('converts a srcValue to a formatted pluginValue', () => {
        const config = {
          plugins: [colorsPlugin],
          props: [backgroundColorConfig]
        };

        expect(formatPluginValue('#000000',backgroundColorConfig,config)).toEqual('black');
        expect(formatPluginValue('#FFFFFF',backgroundColorConfig,config)).toEqual('white');
      });

      it('handles case-insensitivity', () => {
        const config = {
          plugins: [colorsPlugin],
          props: [backgroundColorConfig]
        };

        expect(formatPluginValue('#fFfFfF',backgroundColorConfig,config)).toEqual('white');
        expect(formatPluginValue('#FFFFFF',backgroundColorConfig,config)).toEqual('white');
        expect(formatPluginValue('#ffffff',backgroundColorConfig,config)).toEqual('white');
      });
    });
  });


  it('returns an error string if the value could not be matched', () => {
    const borderConfig = {
      prop: 'border',
      propName: 'border',
      keywordValues: {
        values: { default: '0.1rem solid #282828' },
        separator: '-'
      }
    };

    const config = {
      props: [borderConfig]
    };

    const testValue = '1px solid color(grey-500)';
    expect(determineValue(testValue,borderConfig,config)).toEqual('[no value found for \'1px solid color(grey-500)\']');
  });
});

describe('declarationsToClassName', () => {
  it('converts a simple declaration to a className',() => {
    const config = {
      props: [justifyContentConfig]
    };
    const testDeclarations = { 'justify-content': 'flex-end' };
    expect(declarationsToClassName(testDeclarations,config)).toEqual(['justify-end']);
  });
});

describe('styleBlockToClassNames', () => {
  it('converts a declaration to a class', () => {
    const config = {
      props: [{
        ...displayConfig,
        keywordValues: { values: { block: 'block' } }
      }]
    };
    const testStyleBlock = `
.project-header--show {
  display: block;
}
`;
    expect(styleBlockToClassNames(testStyleBlock,config))
      .toEqual({ '.project-header--show': ['block'] });
  });

  it('converts multiple declarations to an array of classes', () => {
    const config = {
      props: [
        displayConfig,
        justifyContentConfig,
        zIndexConfig,
        backgroundColorConfig,
        colorConfig
      ],
      plugins: [integersPlugin,colorsPlugin]
    };
    const testStyleBlock = `
.project-info {
  display: flex;
  justify-content: flex-end;
  z-index: 10;
  background-color: #000000;
  color: #FFFFFF;
}
`;
    expect(styleBlockToClassNames(testStyleBlock,config))
      .toEqual({
        '.project-info': [
          'flex','justify-end','z10','bg-black','white'
        ]
      });
  });
});