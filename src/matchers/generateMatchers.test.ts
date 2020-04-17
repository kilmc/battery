import { generateMatchers } from '../matchers/generateMatchers';
import { DeveloperBatteryConfig } from '../types/battery-config';
import { keywordToMetaData } from '../classMetaData/keywordToMetaData';
import { PluginConfig } from '../types/plugin-config';

describe('generateMatchers', () => {
  describe('Given a valid batteryConfig', () => {
    describe('when the config contains keyword classes', () => {
      const config: DeveloperBatteryConfig = {
        props: [
          {
            cssProperty: ['display'],
            values: {
              block: 'block',
            },
          },
          {
            cssProperty: ['position'],
            values: {
              absolute: 'absolute',
            },
          },
        ],
      };

      const classMetaData = keywordToMetaData(config);

      it('generates a regex to match those keyword classes', () => {
        expect(generateMatchers(config, classMetaData).keyword).toEqual(
          /(^)(absolute|block)($)/,
        );
      });
    });

    describe('when the config contains a lookup plugin', () => {
      it('generates a regex to match classes associated with a specific plugin', () => {
        const colorPlugin: PluginConfig = {
          type: 'lookup',
          name: 'color',
          values: {
            black: '#000000',
            white: '#ffffff',
            pink: '#ff9dd8',
          },
        };

        const config: DeveloperBatteryConfig = {
          props: [
            {
              cssProperty: ['fill'],
              classNamespace: 'fill',
              pluginSeparator: '-',
              valuePlugin: colorPlugin,
            },
            {
              cssProperty: ['background-color'],
              classNamespace: 'bg',
              pluginSeparator: '-',
              valuePlugin: colorPlugin,
            },
            {
              cssProperty: ['color'],
              classNamespace: 'text',
              pluginDefault: true,
              valuePlugin: colorPlugin,
            },
          ],
          plugins: [colorPlugin],
        };
        expect(generateMatchers(config, []).color).toEqual(
          /(^)(fill-|bg-|)(black|white|pink)($)/,
        );
      });
    });
  });
});
