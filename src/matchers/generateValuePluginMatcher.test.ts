import { generateValuePluginMatcher } from '../matchers/generateValuePluginMatcher';
import { PluginConfig, ModifierFn } from '../types/plugin-config';
import { DeveloperPropertyConfig } from '../types/property-config';

describe('generateValuePluginMatcher', () => {
  const colorPlugin: PluginConfig = {
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
        const plugins: PluginConfig[] = [colorPlugin];

        const props: DeveloperPropertyConfig[] = [
          {
            cssProperty: ['background-color'],
            classNamespace: 'bg',
            pluginSeparator: '-',
            valuePlugin: colorPlugin,
          },
          {
            cssProperty: ['fill'],
            classNamespace: 'fill',
            pluginSeparator: '-',
            valuePlugin: colorPlugin,
          },
        ];

        expect(generateValuePluginMatcher(plugins, props)).toEqual({
          color: /(^)(fill-|bg-)(black|white|pink)($)/,
        });
      });
    });

    describe('Handle single prop set as plugin default', () => {
      const plugins: PluginConfig[] = [colorPlugin];
      const props: DeveloperPropertyConfig[] = [
        {
          cssProperty: ['color'],
          classNamespace: 'text',
          pluginDefault: true,
          valuePlugin: colorPlugin,
        },
      ];
      it('generates a matcher', () => {
        expect(generateValuePluginMatcher(plugins, props)).toEqual({
          color: /(^)(black|white|pink)($)/,
        });
      });
    });

    describe('Handle multiple props with one set as plugin default', () => {
      const plugins: PluginConfig[] = [colorPlugin];
      const props: DeveloperPropertyConfig[] = [
        {
          cssProperty: ['color'],
          classNamespace: 'text',
          pluginDefault: true,
          valuePlugin: colorPlugin,
        },
        {
          cssProperty: ['background-color'],
          classNamespace: 'bg',
          pluginSeparator: '-',
          valuePlugin: colorPlugin,
        },
      ];

      it('generates a matcher', () => {
        expect(generateValuePluginMatcher(plugins, props)).toEqual({
          color: /(^)(bg-|)(black|white|pink)($)/,
        });
      });
    });

    describe('Handle no props using the plugin', () => {
      const plugins: PluginConfig[] = [colorPlugin];
      const props: DeveloperPropertyConfig[] = [];

      it('does NOT generate a matcher', () => {
        expect(generateValuePluginMatcher(plugins, props)).toEqual({});
      });
    });

    describe('"Lookup" type plugin', () => {
      const lookupPlugin: PluginConfig = {
        type: 'lookup',
        name: 'color',
        values: {
          black: '#000000',
          white: '#ffffff',
          pink: '#ff9dd8',
        },
      };

      const plugins: PluginConfig[] = [lookupPlugin];
      const props: DeveloperPropertyConfig[] = [
        {
          cssProperty: ['background-color'],
          classNamespace: 'bg',
          pluginSeparator: '-',
          valuePlugin: colorPlugin,
        },
      ];

      it('generates a regex that contains each value from the pluginConfig', () => {
        const matcher = generateValuePluginMatcher(plugins, props).color;
        expect(String(matcher).includes('white'));
        expect(String(matcher).includes('black'));
        expect(String(matcher).includes('pink'));
      });
    });

    describe('"Pattern" type plugin', () => {
      const integerPlugin: PluginConfig = {
        type: 'pattern',
        name: 'integer',
        identifier: /-?\d{1,4}/,
      };

      describe('And none of the props using the plugin are set as the default', () => {
        it('Then it generates a regex to match classes using the plugin', () => {
          const plugins: PluginConfig[] = [integerPlugin];
          const props: DeveloperPropertyConfig[] = [
            {
              cssProperty: ['z-index'],
              classNamespace: 'z',
              valuePlugin: integerPlugin,
            },
          ];

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
      const pseudoPlugin: PluginConfig = {
        name: 'pseudos',
        type: 'selector',
        affixType: 'prefix',
        modifiers: {
          hover: {
            separator: '-',
            identifier: 'hover',
            modifierFn: formatPseudo,
          },
          focus: {
            separator: '-',
            identifier: 'focus',
            modifierFn: formatPseudo,
          },
        },
      };
      const plugins: PluginConfig[] = [colorPlugin, pseudoPlugin];

      const props: DeveloperPropertyConfig[] = [
        {
          cssProperty: ['color'],
          classNamespace: 'text',
          pluginDefault: true,
          valuePlugin: colorPlugin,
        },
        {
          cssProperty: ['background-color'],
          classNamespace: 'bg',
          pluginSeparator: '-',
          valuePlugin: colorPlugin,
        },
      ];

      it('generates a matcher', () => {
        expect(generateValuePluginMatcher(plugins, props)).toEqual({
          color: /(hover-|focus-|^)(bg-|)(black|white|pink)($)/,
        });
      });
    });

    describe('Handle suffixes', () => {
      const breakpointsPlugin: PluginConfig = {
        name: 'breakpoints',
        type: 'at-rule',
        atrule: 'media',
        affixType: 'suffix',
        modifiers: {
          responsiveSmall: {
            identifier: 'sm',
            separator: '-',
            condition: '(min-width: 560px)',
          },
          responsiveMedium: {
            identifier: 'md',
            separator: '-',
            condition: '(min-width: 940px)',
          },
          responsiveLarge: {
            identifier: 'lg',
            separator: '-',
            condition: '(min-width: 1040px)',
          },
        },
      };

      const plugins: PluginConfig[] = [colorPlugin, breakpointsPlugin];

      const props: DeveloperPropertyConfig[] = [
        {
          cssProperty: ['color'],
          classNamespace: 'text',
          pluginDefault: true,
          valuePlugin: colorPlugin,
        },
        {
          cssProperty: ['background-color'],
          classNamespace: 'bg',
          pluginSeparator: '-',
          valuePlugin: colorPlugin,
        },
      ];

      it('generates a matcher', () => {
        expect(generateValuePluginMatcher(plugins, props)).toEqual({
          color: /(^)(bg-|)(black|white|pink)(-sm|-md|-lg|$)/,
        });
      });
    });
  });
});
