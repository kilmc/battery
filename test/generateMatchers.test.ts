import { generateMatchers } from '../src/generateMatchers';
import { BatteryConfig } from 'types/battery-config';
import { display } from 'fixtures/props/display';
import { position } from 'fixtures/props/position';

describe('generateMatchers', () => {
  describe('Given a valid batteryConfig', () => {
    describe('when the config contains keyword classes', () => {
      const config: BatteryConfig = {
        props: [display, position],
      };

      it('generates a regex to match those keyword classes', () => {
        expect(generateMatchers(config).keyword).toEqual(
          /.*?(absolute|block).*?/,
        );
      });
    });
  });
});
