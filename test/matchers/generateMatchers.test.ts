import { generateMatchers } from 'matchers/generateMatchers';
import { BatteryConfig } from 'types/battery-config';
import { display } from 'fixtures/props/display';
import { position } from 'fixtures/props/position';
import { keywordToMetaData } from 'classMetaData/keywordToMetaData';
import { textColor } from 'fixtures/props/color';
import { backgroundColor } from 'fixtures/props/background-color';
import { ValuePlugin } from 'types/plugin-config';
import { fillColor } from 'fixtures/props/fill';

describe('generateMatchers', () => {
  describe('Given a valid batteryConfig', () => {
    describe('when the config contains keyword classes', () => {
      const config: BatteryConfig = {
        props: [display, position],
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
        const colorPlugin: ValuePlugin = {
          type: 'lookup',
          name: 'color',
          values: {
            black: '#000000',
            white: '#ffffff',
            pink: '#ff9dd8',
          },
        };

        const config: BatteryConfig = {
          props: [fillColor, backgroundColor, textColor],
          plugins: [colorPlugin],
        };
        expect(generateMatchers(config, []).color).toEqual(
          /(^)(fill-|bg-)?(black|white|pink)($)/,
        );
      });
    });
  });
});
