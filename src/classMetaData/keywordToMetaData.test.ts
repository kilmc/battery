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
            propIdentifier: 'bg',
            keywordSeparator: '-',
            keywordValues: {
              contain: 'contain',
              cover: 'cover',
            },
            plugin: 'lengthUnits',
          },
        ],
      };
      const expectedBackgroundSizeResult: ClassMetaData[] = [
        {
          source: 'bg-contain',
          explodedSource: {
            propIdentifier: 'bg',
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
            propIdentifier: 'bg',
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
    describe('When propIdentifier and valueSeparator are undefined', () => {
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
            propIdentifier: '',
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
            propIdentifier: '',
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
