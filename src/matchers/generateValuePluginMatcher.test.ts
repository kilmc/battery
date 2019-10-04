import { generateValuePluginMatcher } from 'matchers/generateValuePluginMatcher';
import { ValuePlugin } from 'types/plugin-config';
import { UserPropConfig } from 'types/prop-config';
import { backgroundColor } from 'fixtures/props/background-color';
import { fillColor } from 'fixtures/props/fill';
import { textColor } from 'fixtures/props/color';
import { zIndex } from 'fixtures/props/z-index';

describe('generateValuePluginMatcher', () => {
  describe('Given a config that contains a value plugin', () => {
    const colorPlugin: ValuePlugin = {
      type: 'lookup',
      name: 'color',
      values: {
        black: '#000000',
        white: '#ffffff',
        pink: '#ff9dd8',
      },
    };

    describe('When none of the props using the plugin are set as the default', () => {
      test('Then it generates a regex to match classes using the plugin', () => {
        const valuePlugins: ValuePlugin[] = [colorPlugin];
        const props: UserPropConfig[] = [backgroundColor, fillColor];

        expect(generateValuePluginMatcher(valuePlugins, props)).toEqual({
          color: /(^)(fill-|bg-)(black|white|pink)($)/,
        });
      });
    });

    describe('When the only prop using the plugin is set as the default', () => {
      const valuePlugins: ValuePlugin[] = [colorPlugin];
      const props: UserPropConfig[] = [textColor];
      test('Then it generates a regex to match classes using the plugin', () => {
        expect(generateValuePluginMatcher(valuePlugins, props)).toEqual({
          color: /(^)(black|white|pink)($)/,
        });
      });
    });

    describe('When one of the props using the plugin is set as the default', () => {
      const valuePlugins: ValuePlugin[] = [colorPlugin];
      const props: UserPropConfig[] = [textColor, backgroundColor];

      test('Then it generates a regex to match classes using the plugin', () => {
        expect(generateValuePluginMatcher(valuePlugins, props)).toEqual({
          color: /(^)(bg-)?(black|white|pink)($)/,
        });
      });
    });

    describe('When no props use the plugin', () => {
      const valuePlugins: ValuePlugin[] = [colorPlugin];
      const props: UserPropConfig[] = [];

      test('Then it does NOT generate a matcher', () => {
        expect(generateValuePluginMatcher(valuePlugins, props)).toEqual({});
      });
    });

    describe('When the plugin is of type "lookup"', () => {
      const lookupPlugin: ValuePlugin = {
        type: 'lookup',
        name: 'color',
        values: {
          black: '#000000',
          white: '#ffffff',
          pink: '#ff9dd8',
        },
      };

      const valuePlugins: ValuePlugin[] = [lookupPlugin];
      const props: UserPropConfig[] = [backgroundColor];

      test('Then it generates a regex that contains each value from the pluginConfig', () => {
        const matcher = generateValuePluginMatcher(valuePlugins, props).color;
        expect(String(matcher).includes('white'));
        expect(String(matcher).includes('black'));
        expect(String(matcher).includes('pink'));
      });
    });

    describe('When the plugin is of type "pattern"', () => {
      const integerPlugin: ValuePlugin = {
        type: 'pattern',
        name: 'integer',
        identifier: /-?\d{1,4}/,
      };

      describe('And none of the props using the plugin are set as the default', () => {
        test('Then it generates a regex to match classes using the plugin', () => {
          const valuePlugins: ValuePlugin[] = [integerPlugin];
          const props: UserPropConfig[] = [zIndex];

          expect(generateValuePluginMatcher(valuePlugins, props)).toEqual({
            integer: /(^)(z)(-?\d{1,4})($)/,
          });
        });
      });
    });
  });
});
