import { generateKeywordMatcher } from 'matchers/generateKeywordMatcher';
import { ClassObject } from 'types/classname';

describe('generateKeywordMatchers', () => {
  describe('Given a valid batteryConfig', () => {
    describe('When the config contains keyword classes', () => {
      it('Then it generates a regex to match those keyword classes', () => {
        const classObjects: { [k: string]: ClassObject } = {
          absolute: { position: 'absolute' },
          block: { display: 'block' },
        };
        expect(generateKeywordMatcher(classObjects)).toEqual(
          /.*?(absolute|block).*?/,
        );
      });

      it('And it orders the classNames by length', () => {
        const classObjects: { [k: string]: ClassObject } = {
          'bg-contain': { 'background-size': 'contain' },
          block: { display: 'block' },
          absolute: { position: 'absolute' },
        };
        expect(generateKeywordMatcher(classObjects)).toEqual(
          /.*?(bg-contain|absolute|block).*?/,
        );
      });
    });
  });
});
