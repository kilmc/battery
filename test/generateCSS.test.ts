import { generateCSS } from '../src/generateCSS';
import { BatteryConfig } from 'types/battery-config';
import { backgroundSize } from 'fixtures/props/background-size';
import { textAlign } from 'fixtures/props/text-align';
import { display } from 'fixtures/props/display';
import { position } from 'fixtures/props/position';

describe('generateCSS', () => {
  describe('Given a keyword class', () => {
    describe('when the class has a propIndicator', () => {
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

    describe('when the class DOES NOT have a propIndicator', () => {
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
});
