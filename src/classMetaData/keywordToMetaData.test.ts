import { keywordToMetaData } from './keywordToMetaData';
import { BatteryConfig, DeveloperBatteryConfig } from 'types/battery-config';
import { ClassMetaData } from 'types/classname';

describe('keywordToMetaData', () => {
  describe('Given a config containing keyword class definitions', () => {
    test('Then it generates meta information for the class', () => {
      const config: DeveloperBatteryConfig = {
        props: [
          {
            cssProperty: ['background-size'],
            classNamespace: 'bg',
            valueSeparator: '-',
            values: {
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
            valueOrPluginSeparator: '-',
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
            valueOrPluginSeparator: '-',
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
    describe('When classNamespace and valueOrPluginSeparator are undefined', () => {
      const config: DeveloperBatteryConfig = {
        props: [
          {
            cssProperty: ['display'],
            values: {
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
            valueOrPluginSeparator: '',
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
            valueOrPluginSeparator: '',
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
