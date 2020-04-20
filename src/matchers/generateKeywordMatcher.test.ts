import { generateKeywordMatcher } from '../matchers/generateKeywordMatcher';
import { ClassMetaData } from '../types/classname';
import { pseudoPlugin } from '../fixtures/plugins/pseudo';
import { PluginConfig } from '../types/plugin-config';

describe('generateKeywordMatchers', () => {
  describe('Given a valid batteryConfig', () => {
    describe('When the config contains keyword classes', () => {
      it('Then it generates a regex to match those keyword classes', () => {
        const classMetaData: ClassMetaData[] = [
          {
            source: 'absolute',
            property: ['position'],
            keyword: true,
          },
          {
            source: 'block',
            property: ['display'],
            keyword: true,
          },
        ];
        expect(generateKeywordMatcher(classMetaData, []).keyword).toEqual(
          /(^)(absolute|block)($)/,
        );
      });

      it('And it orders the classNames by length', () => {
        const classMetaData: ClassMetaData[] = [
          {
            source: 'absolute',
            property: ['position'],
            keyword: true,
          },
          {
            source: 'block',
            property: ['display'],
            keyword: true,
          },
          {
            source: 'bg-contain',
            property: ['background-size'],
            keyword: true,
          },
        ];
        expect(generateKeywordMatcher(classMetaData, []).keyword).toEqual(
          /(^)(bg-contain|absolute|block)($)/,
        );
      });
    });
  });

  describe('Class plugins', () => {
    describe('Handle prefixes', () => {
      const classPlugins: PluginConfig[] = [pseudoPlugin()];

      const classMetaData: ClassMetaData[] = [
        {
          source: 'absolute',
          property: ['position'],
          keyword: true,
        },
        {
          source: 'block',
          property: ['display'],
          keyword: true,
        },
      ];

      it('generates a matcher', () => {
        expect(generateKeywordMatcher(classMetaData, classPlugins)).toEqual({
          keyword: /(hover-|focus-|^)(absolute|block)($)/,
        });
      });
    });
  });
});
