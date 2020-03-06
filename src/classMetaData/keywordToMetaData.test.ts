import { keywordToMetaData } from './keywordToMetaData';
import { BatteryConfig } from 'types/battery-config';
import { ClassMetaData } from 'types/classname';

describe('keywordToMetaData', () => {
  describe('Given a config containing keyword class definitions', () => {
    test('Then it generates meta information for the class', () => {
      const config: BatteryConfig = {
        props: [
          {
            cssProperty: ['background-size'],
            classNamespace: 'bg',
            keywordSeparator: '-',
            keywordValues: {
              contain: 'contain',
              cover: 'cover',
            },
            valuePlugin: 'lengthUnits',
          },
        ],
      };
      const expectedBackgroundSizeResult: ClassMetaData[] = [
        {
          source: 'bg-contain',
          explodedSource: {
            classNamespace: 'bg',
            valueSeparator: '-',
            valueIdentifier: 'contain',
          },
          property: ['background-size'],
          keyword: true,
          classObject: {
            'background-size': 'contain',
          },
        },
        {
          source: 'bg-cover',
          explodedSource: {
            classNamespace: 'bg',
            valueSeparator: '-',
            valueIdentifier: 'cover',
          },
          property: ['background-size'],
          keyword: true,
          classObject: {
            'background-size': 'cover',
          },
        },
      ];

      expect(keywordToMetaData(config)).toEqual(expectedBackgroundSizeResult);
    });
    describe('When classNamespace and valueSeparator are undefined', () => {
      const config: BatteryConfig = {
        props: [
          {
            cssProperty: ['display'],
            keywordValues: {
              block: 'block',
              inline: 'inline',
            },
          },
        ],
      };
      test('Then it returns an empty string', () => {
        expect(keywordToMetaData(config)[0]).toEqual({
          source: 'block',
          explodedSource: {
            classNamespace: '',
            valueSeparator: '',
            valueIdentifier: 'block',
          },
          property: ['display'],
          keyword: true,
          classObject: {
            display: 'block',
          },
        });

        expect(keywordToMetaData(config)[1]).toEqual({
          source: 'inline',
          explodedSource: {
            classNamespace: '',
            valueSeparator: '',
            valueIdentifier: 'inline',
          },
          property: ['display'],
          keyword: true,
          classObject: {
            display: 'inline',
          },
        });
      });
    });
  });
});
