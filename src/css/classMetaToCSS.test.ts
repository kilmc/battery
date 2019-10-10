import { classMetaToCSS } from './classMetaToCSS';
import { ClassMetaData } from 'types/classname';

describe('classMetaToCSS', () => {
  describe('Given a valid classMetaData object', () => {
    test('Then it generates CSS', () => {
      const classMetaData: ClassMetaData = {
        source: 'bg-contain',
        selector: 'bg-contain',
        keyword: true,
        classObject: {
          'background-size': 'contain',
        },
      };
      expect(classMetaToCSS(classMetaData)).toEqual(
        '.bg-contain { background-size: contain }'.trim(),
      );
    });
  });
});
