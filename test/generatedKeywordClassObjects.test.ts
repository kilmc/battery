import { generateKeywordClassObjects } from '../src/generateKeywordClassObjects';
import { display } from 'fixtures/props/display';
import { position } from 'fixtures/props/position';
import { backgroundSize } from 'fixtures/props/background-size';

describe('generateKeywordClassObjects', () => {
  describe('Given a valid batteryConfig', () => {
    describe('When the config contains keyword classes', () => {
      const config = {
        props: [display, position, backgroundSize],
      };

      it('generates an object of classObjects', () => {
        const generated = generateKeywordClassObjects(config);
        expect(generated['block']).toEqual({
          display: 'block',
        });

        expect(generated['absolute']).toEqual({
          position: 'absolute',
        });

        expect(generated['bg-contain']).toEqual({
          'background-size': 'contain',
        });
      });
    });
  });
});
