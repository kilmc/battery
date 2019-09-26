import { generateCSS } from '../src/generateCSS';
import { BatteryConfig } from 'types/battery-config';
import { backgroundSize } from 'fixtures/props/background-size';
import { textAlign } from 'fixtures/props/text-align';
import { display } from 'fixtures/props/display';
import { position } from 'fixtures/props/position';
import { zIndex } from 'fixtures/props/z-index';
import { flex } from 'fixtures/props/flex';
import { integerPlugin } from 'fixtures/plugins/integer';
import { colorPlugin } from 'fixtures/plugins/color';
import { backgroundColor } from 'fixtures/props/background-color';
import { textColor } from 'fixtures/props/color';
import { lengthUnitsPlugin } from 'fixtures/plugins/lengthUnits';
import { width } from 'fixtures/props/width';

describe('generateCSS', () => {
  describe('Given a keyword class', () => {
    describe('When the class has a propIndicator', () => {
      const input = ['bg-contain', 'text-center'];
      const config: BatteryConfig = {
        props: [backgroundSize, textAlign],
      };

      test('Then it renders the correct CSS', () => {
        expect(generateCSS(input, config).trim()).toEqual(
          '.bg-contain { background-size: contain } .text-center { text-align: center }'.trim(),
        );
      });
    });

    describe('When the class DOES NOT have a propIndicator', () => {
      const input = ['block', 'absolute'];
      const config: BatteryConfig = {
        props: [display, position],
      };

      test('Then it renders the correct CSS', () => {
        expect(generateCSS(input, config).trim()).toEqual(
          '.block { display: block } .absolute { position: absolute }'.trim(),
        );
      });
    });
  });

  describe('Given a pattern plugin className', () => {
    describe('When the className has no modifier', () => {
      const input = ['z100', 'flex1'];
      const config: BatteryConfig = {
        props: [
          zIndex,
          flex,
          backgroundColor,
          textColor,
          backgroundSize,
          width,
        ],
        plugins: [integerPlugin, colorPlugin, lengthUnitsPlugin],
      };

      test('Then it renders the correct CSS', () => {
        expect(generateCSS(input, config).trim()).toEqual(
          '.z100 { z-index: 100 } .flex1 { flex: 1 }'.trim(),
        );
      });
    });
  });

  describe('Given a config with no keyword classNames', () => {
    const input = ['z100', 'flex1'];
    const config: BatteryConfig = {
      props: [zIndex, flex],
      plugins: [integerPlugin],
    };

    describe('When the function is called', () => {
      test('it should not error', () => {
        expect(generateCSS(input, config)).toEqual(
          '.z100 { z-index: 100 } .flex1 { flex: 1 }',
        );
      });
    });
  });
});
