import { explodeSource } from '../src/explodeSource';
import { generateMatchers } from 'matchers/generateMatchers';
import { BatteryConfig } from 'types/battery-config';
import { backgroundSize } from 'fixtures/props/background-size';
import { generateKeywordClassObjects } from 'generateKeywordClassObjects';

describe('explodeSource', () => {
  describe('Given a valid className', () => {
    describe('When it generates the exploded source', () => {
      it('Then it contains the component parts of the className', () => {
        const className = 'bg-contain';
        const config: BatteryConfig = { props: [backgroundSize] };
        const classObjects = generateKeywordClassObjects(config);
        const matchers = generateMatchers(config, classObjects);

        expect(explodeSource(className, matchers)).toBe({
          propIndicator: 'bg',
          valueSeparator: '-',
          valueIndicator: 'contain',
        });
      });
    });
  });
});
