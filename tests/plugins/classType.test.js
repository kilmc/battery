/* eslint-env jest, node */

import {
  processClassType,
  classTypeToClassObj,
  generateClassTypeClassNames,
  sortClassTypeClassNames
} from '../../src/plugins/classType';

const aspectRatioPlugin = {
  type: 'class',
  name: 'aspectRatio',
  className: ['aspect-ratio', ['relative', 'h0']],
  modifiers: [
    {
      className: ['object', ['absolute', 'h100p']],
      separator: '__'
    },
    {
      regex: '\\d+x\\d+',
      separator: '--',
      modifierFn: dimensions => {
        const [width, height] = dimensions.split('x');
        return {
          'padding-bottom': `${(height / width) * 100}%`
        };
      }
    }
  ]
};

const squarePlugin = {
  type: 'class',
  name: 'square',
  className: ['square']
};

const heightProp = {
  prop: 'height',
  propName: 'h',
  keywordValues: {
    values: { '0': '0', '100p': '100%' }
  }
};

const positionProp = {
  prop: 'position',
  propName: '',
  keywordValues: {
    values: { relative: 'relative', absolute: 'absolute' }
  }
};

describe('classType', () => {
  let config;
  beforeEach(() => {
    config = {
      props: [heightProp, positionProp],
      plugins: [aspectRatioPlugin],
      settings: {
        enableKeywordValues: true
      }
    };
  });
  describe('processClassType', () => {
    it('converts multiple classes to classObjs', () => {
      const classNames = [
        'aspect-ratio',
        'aspect-ratio__object',
        'aspect-ratio--4x3'
      ];
      expect(processClassType(classNames, config)).toEqual({
        'aspect-ratio': { position: 'relative', height: '0' },
        'aspect-ratio__object': {
          position: 'absolute',
          height: '100%'
        },
        'aspect-ratio--4x3': {
          'padding-bottom': '75%'
        }
      });
    });
  });

  describe('generateClassTypeClassNames', () => {
    it('generates all possible class names from a class type', () => {
      const plugins = [aspectRatioPlugin, squarePlugin];
      expect(generateClassTypeClassNames(plugins)).toEqual({
        aspectRatio: 'aspect-ratio',
        square: 'square'
      });
    });
  });

  describe('sortClassTypeClassNames', () => {
    it('sorts class names by class type', () => {
      const classNames = [
        'square4',
        'aspect-ratio__object',
        'aspect-ratio--16x9'
      ];
      const pluginsObj = {
        aspectRatio: 'aspect-ratio',
        square: 'square'
      };
      expect(sortClassTypeClassNames(classNames, pluginsObj)).toEqual({
        aspectRatio: ['aspect-ratio__object', 'aspect-ratio--16x9'],
        square: ['square4']
      });
    });
  });

  describe('classTypeToClassObj', () => {
    it('generates class objects for a class type', () => {
      const classNames = [
        'aspect-ratio',
        'aspect-ratio__object',
        'aspect-ratio--16x9'
      ];
      const pluginName = aspectRatioPlugin.name;
      expect(classTypeToClassObj(pluginName, classNames, config)).toEqual({
        'aspect-ratio': ['relative', 'h0'],
        'aspect-ratio__object': ['absolute', 'h100p'],
        'aspect-ratio--16x9': {
          'padding-bottom': '56.25%'
        }
      });
    });
  });
});
