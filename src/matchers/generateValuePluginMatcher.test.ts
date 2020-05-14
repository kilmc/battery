import { BatteryPlugin } from './../battery-plugin';
import { generateValuePluginMatcher } from '../matchers/generateValuePluginMatcher';
import { PluginConfig, ModifierFn } from '../types/plugin-config';
import { DeveloperPropertyConfig } from '../types/property-config';

describe('generateValuePluginMatcher', () => {
  const colorPlugin = BatteryPlugin({
    type: 'lookup',
    values: {
      black: '#000000',
      white: '#ffffff',
      pink: '#ff9dd8',
    },
  });

  describe('Value plugins', () => {
    describe('Handle no multiple props', () => {
      it('Then it generates a regex to match classes using the plugin', () => {
        const plugins: PluginConfig[] = [];

        const props: DeveloperPropertyConfig[] = [
          {
            cssProperty: ['background-color'],
            classNamespace: 'bg',
            valuePlugin: colorPlugin({ separator: '-' }),
          },
          {
            cssProperty: ['fill'],
            classNamespace: 'fill',
            valuePlugin: colorPlugin({ separator: '-' }),
          },
        ];

        expect(generateValuePluginMatcher(plugins, props)).toEqual({
          'background-color': /(^)(bg-)(black|white|pink)($)/,
          fill: /(^)(fill-)(black|white|pink)($)/,
        });
      });
    });

    describe('Handle single prop set as plugin default', () => {
      const plugins: PluginConfig[] = [];

      const props: DeveloperPropertyConfig[] = [
        {
          cssProperty: ['color'],
          classNamespace: 'text',
          pluginDefault: true,
          valuePlugin: colorPlugin(),
        },
      ];
      it('generates a matcher', () => {
        expect(generateValuePluginMatcher(plugins, props)).toEqual({
          color: /(^)()(black|white|pink)($)/,
        });
      });
    });

    describe('Handle multiple props with one set as plugin default', () => {
      const plugins: PluginConfig[] = [];
      const props: DeveloperPropertyConfig[] = [
        {
          cssProperty: ['color'],
          classNamespace: 'text',
          pluginDefault: true,
          valuePlugin: colorPlugin(),
        },
        {
          cssProperty: ['background-color'],
          classNamespace: 'bg',
          valuePlugin: colorPlugin({ separator: '-' }),
        },
      ];

      it('generates a matcher', () => {
        expect(generateValuePluginMatcher(plugins, props)).toEqual({
          'background-color': /(^)(bg-)(black|white|pink)($)/,
          color: /(^)()(black|white|pink)($)/,
        });
      });
    });

    describe('Handle no props using the plugin', () => {
      const plugins: PluginConfig[] = [];
      const props: DeveloperPropertyConfig[] = [];

      it('does NOT generate a matcher', () => {
        expect(generateValuePluginMatcher(plugins, props)).toEqual({});
      });
    });

    describe('"Lookup" type plugin', () => {
      const lookupPlugin = BatteryPlugin({
        type: 'lookup',
        values: {
          black: '#000000',
          white: '#ffffff',
          pink: '#ff9dd8',
        },
      });

      const plugins: PluginConfig[] = [];
      const props: DeveloperPropertyConfig[] = [
        {
          cssProperty: ['background-color'],
          classNamespace: 'bg',
          valuePlugin: lookupPlugin({ separator: '-' }),
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
            'z-index': /(^)(z)(-?\d{1,4})($)/,
          });
        });
      });
    });
  });

  describe('Class plugins', () => {
    describe('Handle prefixes', () => {
      const formatPseudo: ModifierFn = (cx, pseudo) => `${cx}:${pseudo}`;
      const pseudoPlugin: PluginConfig = {
        type: 'selector',
        affixType: 'prefix',
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

      const plugins: PluginConfig[] = [pseudoPlugin];

      const props: DeveloperPropertyConfig[] = [
        {
          cssProperty: ['color'],
          classNamespace: 'text',
          pluginDefault: true,
          valuePlugin: colorPlugin(),
        },
        {
          cssProperty: ['background-color'],
          classNamespace: 'bg',
          valuePlugin: colorPlugin({ separator: '-' }),
        },
      ];

      it('generates a matcher', () => {
        expect(generateValuePluginMatcher(plugins, props)).toEqual({
          'background-color': /(hover-|focus-|^)(bg-)(black|white|pink)($)/,
          color: /(hover-|focus-|^)()(black|white|pink)($)/,
        });
      });
    });

    describe('Handle suffixes', () => {
      const breakpointsPlugin: PluginConfig = {
        type: 'at-rule',
        atrule: 'media',
        affixType: 'suffix',
        modifiers: [
          {
            name: 'responsiveSmall',
            identifier: 'sm',
            separator: '-',
            condition: '(min-width: 560px)',
          },
          {
            name: 'responsiveSmall',
            identifier: 'md',
            separator: '-',
            condition: '(min-width: 940px)',
          },
          {
            name: 'responsiveLarge',
            identifier: 'lg',
            separator: '-',
            condition: '(min-width: 1040px)',
          },
        ],
      };

      const plugins: PluginConfig[] = [breakpointsPlugin];

      const props: DeveloperPropertyConfig[] = [
        {
          cssProperty: ['color'],
          classNamespace: 'text',
          pluginDefault: true,
          valuePlugin: colorPlugin(),
        },
        {
          cssProperty: ['background-color'],
          classNamespace: 'bg',
          valuePlugin: colorPlugin({ separator: '-' }),
        },
      ];

      it('generates a matcher', () => {
        expect(generateValuePluginMatcher(plugins, props)).toEqual({
          'background-color': /(^)(bg-)(black|white|pink)(-sm|-md|-lg|$)/,
          color: /(^)()(black|white|pink)(-sm|-md|-lg|$)/,
        });
      });
    });
  });
});
