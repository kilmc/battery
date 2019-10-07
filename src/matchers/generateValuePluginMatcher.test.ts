import { generateValuePluginMatcher } from 'matchers/generateValuePluginMatcher';
import { Plugin, ModifierFn } from 'types/plugin-config';
import { UserPropConfig } from 'types/prop-config';
import { backgroundColor } from 'fixtures/props/background-color';
import { fillColor } from 'fixtures/props/fill';
import { textColor } from 'fixtures/props/color';
import { zIndex } from 'fixtures/props/z-index';

describe('generateValuePluginMatcher', () => {
  const colorPlugin: Plugin = {
    type: 'lookup',
    name: 'color',
    values: {
      black: '#000000',
      white: '#ffffff',
      pink: '#ff9dd8',
    },
  };
  describe('Value plugins', () => {
    describe('Handle no multiple props', () => {
      it('Then it generates a regex to match classes using the plugin', () => {
        const plugins: Plugin[] = [colorPlugin];
        const props: UserPropConfig[] = [backgroundColor, fillColor];

        expect(generateValuePluginMatcher(plugins, props)).toEqual({
          color: /(^)(fill-|bg-)(black|white|pink)($)/,
        });
      });
    });

    describe('Handle single prop set as plugin default', () => {
      const plugins: Plugin[] = [colorPlugin];
      const props: UserPropConfig[] = [textColor];
      it('generates a matcher', () => {
        expect(generateValuePluginMatcher(plugins, props)).toEqual({
          color: /(^)(black|white|pink)($)/,
        });
      });
    });

    describe('Handle multiple props with one set as plugin default', () => {
      const plugins: Plugin[] = [colorPlugin];
      const props: UserPropConfig[] = [textColor, backgroundColor];

      it('generates a matcher', () => {
        expect(generateValuePluginMatcher(plugins, props)).toEqual({
          color: /(^)(bg-|)(black|white|pink)($)/,
        });
      });
    });

    describe('Handle no props using the plugin', () => {
      const plugins: Plugin[] = [colorPlugin];
      const props: UserPropConfig[] = [];

      it('does NOT generate a matcher', () => {
        expect(generateValuePluginMatcher(plugins, props)).toEqual({});
      });
    });

    describe('"Lookup" type plugin', () => {
      const lookupPlugin: Plugin = {
        type: 'lookup',
        name: 'color',
        values: {
          black: '#000000',
          white: '#ffffff',
          pink: '#ff9dd8',
        },
      };

      const plugins: Plugin[] = [lookupPlugin];
      const props: UserPropConfig[] = [backgroundColor];

      it('generates a regex that contains each value from the pluginConfig', () => {
        const matcher = generateValuePluginMatcher(plugins, props).color;
        expect(String(matcher).includes('white'));
        expect(String(matcher).includes('black'));
        expect(String(matcher).includes('pink'));
      });
    });

    describe('"Pattern" type plugin', () => {
      const integerPlugin: Plugin = {
        type: 'pattern',
        name: 'integer',
        identifier: /-?\d{1,4}/,
      };

      describe('And none of the props using the plugin are set as the default', () => {
        it('Then it generates a regex to match classes using the plugin', () => {
          const plugins: Plugin[] = [integerPlugin];
          const props: UserPropConfig[] = [zIndex];

          expect(generateValuePluginMatcher(plugins, props)).toEqual({
            integer: /(^)(z)(-?\d{1,4})($)/,
          });
        });
      });
    });
  });

  describe('Class plugins', () => {
    describe('Handle prefixes', () => {
      const formatPseudo: ModifierFn = (cx, pseudo) => `${cx}:${pseudo}`;
      const pseudoPlugin: Plugin = {
        name: 'pseudos',
        type: 'selector',
        identifierType: 'prefix',
        modifiers: [
          {
            name: 'hover',
            separator: '-',
            identifier: 'hover',
            modifierFn: formatPseudo,
          },
          {
            name: 'focus',
            separator: '-',
            identifier: 'focus',
            modifierFn: formatPseudo,
          },
        ],
      };
      const plugins: Plugin[] = [colorPlugin, pseudoPlugin];

      const props: UserPropConfig[] = [textColor, backgroundColor];

      it('generates a matcher', () => {
        expect(generateValuePluginMatcher(plugins, props)).toEqual({
          color: /(hover-|focus-|^)(bg-|)(black|white|pink)($)/,
        });
      });
    });
  });
});
