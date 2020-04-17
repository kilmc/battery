import { DeveloperBatteryConfig } from '../types/battery-config';
import { addMetaData } from './addMetaData';
import { colorPlugin } from '../fixtures/plugins/color';
import { integerPlugin } from '../fixtures/plugins/integer';
import { lengthUnitsPlugin } from '../fixtures/plugins/lengthUnits';
import { breakpointPlugin } from '../fixtures/plugins/breakpoint';
import { pseudoPlugin } from '../fixtures/plugins/pseudo';
import { hoverTargetPlugin } from '../fixtures/plugins/hoverTarget';

describe('addMetaData', () => {
  describe('Handles keyword classNames', () => {
    const config: DeveloperBatteryConfig = {
      props: [
        {
          cssProperty: ['position'],
          values: {
            absolute: 'absolute',
          },
        },
        {
          cssProperty: ['display'],
          values: {
            block: 'block',
          },
        },
        {
          cssProperty: ['background-size'],
          classNamespace: 'bg',
          valueSeparator: '-',
          values: {
            contain: 'contain',
            cover: 'cover',
          },
          valuePlugin: lengthUnitsPlugin,
        },
      ],
    };
    const inputClassNames = ['block', 'absolute', 'bg-contain'];

    test('All meta data is added to the classMetaData object', () => {
      expect(addMetaData(inputClassNames, config)).toEqual([
        {
          source: 'block',
          selector: 'block',
          keyword: true,
          property: ['display'],
          explodedSource: {
            prefix: '',
            prefixSeparator: '',
            classNamespace: '',
            valueOrPluginSeparator: '',
            valueIdentifier: 'block',
            modifierSeparator: '',
            modifierIdentifier: '',
            suffix: '',
            suffixSeparator: '',
          },
          classObject: {
            display: 'block',
          },
        },
        {
          source: 'absolute',
          selector: 'absolute',
          keyword: true,
          property: ['position'],
          explodedSource: {
            prefix: '',
            prefixSeparator: '',
            classNamespace: '',
            valueOrPluginSeparator: '',
            valueIdentifier: 'absolute',
            modifierSeparator: '',
            modifierIdentifier: '',
            suffix: '',
            suffixSeparator: '',
          },
          classObject: {
            position: 'absolute',
          },
        },
        {
          source: 'bg-contain',
          selector: 'bg-contain',
          keyword: true,
          property: ['background-size'],
          explodedSource: {
            prefix: '',
            prefixSeparator: '',
            classNamespace: 'bg',
            valueOrPluginSeparator: '-',
            valueIdentifier: 'contain',
            modifierSeparator: '',
            modifierIdentifier: '',
            suffix: '',
            suffixSeparator: '',
          },
          classObject: {
            'background-size': 'contain',
          },
        },
      ]);
    });
  });

  describe('Handles value plugin classNames', () => {
    const config: DeveloperBatteryConfig = {
      props: [
        {
          cssProperty: ['z-index'],
          classNamespace: 'z',
          valuePlugin: integerPlugin,
        },
        {
          cssProperty: ['background-color'],
          classNamespace: 'bg',
          pluginSeparator: '-',
          valuePlugin: colorPlugin,
        },
        {
          cssProperty: ['background-size'],
          classNamespace: 'bg',
          valueSeparator: '-',
          values: {
            contain: 'contain',
            cover: 'cover',
          },
          valuePlugin: lengthUnitsPlugin({
            static: {
              percent: [0, 50, 100],
            },
          }),
        },
        {
          cssProperty: ['width'],
          classNamespace: 'w',
          valuePlugin: lengthUnitsPlugin,
        },
      ],
    };
    const inputClassNames = ['bg-white', 'bg-white_10', 'z100', 'w3'];

    test('All meta data is added to the classMetaData object', () => {
      expect(addMetaData(inputClassNames, config)).toEqual([
        {
          source: 'bg-white',
          selector: 'bg-white',
          keyword: false,
          property: ['background-color'],
          valuePlugin: colorPlugin,
          valuePluginType: 'lookup',
          explodedSource: {
            prefix: '',
            prefixSeparator: '',
            classNamespace: 'bg',
            valueOrPluginSeparator: '-',
            valueIdentifier: 'white',
            modifierSeparator: '',
            modifierIdentifier: '',
            suffix: '',
            suffixSeparator: '',
          },
          classObject: {
            'background-color': '#FFFFFF',
          },
        },
        {
          source: 'bg-white_10',
          selector: 'bg-white_10',
          keyword: false,
          property: ['background-color'],
          valuePlugin: colorPlugin,
          valuePluginType: 'lookup',
          explodedSource: {
            prefix: '',
            prefixSeparator: '',
            classNamespace: 'bg',
            valueOrPluginSeparator: '-',
            valueIdentifier: 'white',
            modifierSeparator: '_',
            modifierIdentifier: '10',
            suffix: '',
            suffixSeparator: '',
          },
          valueModifier: 'opacity',
          classObject: {
            'background-color': 'rgba(255,255,255,0.1)',
          },
        },
        {
          source: 'z100',
          selector: 'z100',
          keyword: false,
          property: ['z-index'],
          valuePlugin: integerPlugin,
          valuePluginType: 'pattern',
          explodedSource: {
            prefix: '',
            prefixSeparator: '',
            classNamespace: 'z',
            valueOrPluginSeparator: '',
            valueIdentifier: '100',
            modifierSeparator: '',
            modifierIdentifier: '',
            suffix: '',
            suffixSeparator: '',
          },
          classObject: {
            'z-index': '100',
          },
        },
        {
          source: 'w3',
          selector: 'w3',
          keyword: false,
          property: ['width'],
          valuePlugin: lengthUnitsPlugin,
          valuePluginType: 'pattern',
          explodedSource: {
            prefix: '',
            prefixSeparator: '',
            classNamespace: 'w',
            valueOrPluginSeparator: '',
            valueIdentifier: '3',
            modifierSeparator: '',
            modifierIdentifier: '',
            suffix: '',
            suffixSeparator: '',
          },
          valueModifier: 'ratio',
          classObject: {
            width: '1.125rem',
          },
        },
      ]);
    });
  });

  describe('Handles class plugin classNames', () => {
    const config: DeveloperBatteryConfig = {
      props: [
        {
          cssProperty: ['z-index'],
          classNamespace: 'z',
          valuePlugin: integerPlugin,
        },
        {
          cssProperty: ['background-color'],
          classNamespace: 'bg',
          pluginSeparator: '-',
          valuePlugin: colorPlugin,
        },
        {
          cssProperty: ['background-size'],
          classNamespace: 'bg',
          valueSeparator: '-',
          values: {
            contain: 'contain',
            cover: 'cover',
          },
          valuePlugin: lengthUnitsPlugin,
        },
        {
          cssProperty: ['width'],
          classNamespace: 'w',
          valuePlugin: lengthUnitsPlugin,
        },
      ],
      plugins: [breakpointPlugin, pseudoPlugin, hoverTargetPlugin],
    };
    const inputClassNames = [
      'bg-white-md',
      'hover-bg-white_10',
      'z100-lg',
      'hover-item-bg-contain',
    ];

    test('All meta data is added to the classMetaData object', () => {
      expect(addMetaData(inputClassNames, config)).toEqual([
        {
          source: 'bg-white-md',
          selector: 'bg-white-md',
          keyword: false,
          property: ['background-color'],
          valuePlugin: colorPlugin,
          valuePluginType: 'lookup',
          atrulePlugin: 'breakpoint',
          atruleModifier: 'responsiveMedium',
          explodedSource: {
            prefix: '',
            prefixSeparator: '',
            classNamespace: 'bg',
            valueOrPluginSeparator: '-',
            valueIdentifier: 'white',
            modifierSeparator: '',
            modifierIdentifier: '',
            suffixSeparator: '-',
            suffix: 'md',
          },
          classObject: {
            'background-color': '#FFFFFF',
          },
        },
        {
          source: 'hover-bg-white_10',
          selector: 'hover-bg-white_10',
          keyword: false,
          property: ['background-color'],
          valuePlugin: colorPlugin,
          valuePluginType: 'lookup',
          selectorPlugin: 'pseudo',
          selectorModifier: 'hover',
          explodedSource: {
            prefix: 'hover',
            prefixSeparator: '-',
            classNamespace: 'bg',
            valueOrPluginSeparator: '-',
            valueIdentifier: 'white',
            modifierSeparator: '_',
            modifierIdentifier: '10',
            suffix: '',
            suffixSeparator: '',
          },
          valueModifier: 'opacity',
          classObject: {
            'background-color': 'rgba(255,255,255,0.1)',
          },
        },
        {
          source: 'z100-lg',
          selector: 'z100-lg',
          keyword: false,
          property: ['z-index'],
          valuePlugin: integerPlugin,
          valuePluginType: 'pattern',
          atrulePlugin: 'breakpoint',
          atruleModifier: 'responsiveLarge',
          explodedSource: {
            prefix: '',
            prefixSeparator: '',
            classNamespace: 'z',
            valueOrPluginSeparator: '',
            valueIdentifier: '100',
            modifierSeparator: '',
            modifierIdentifier: '',
            suffixSeparator: '-',
            suffix: 'lg',
          },
          classObject: {
            'z-index': '100',
          },
        },
        {
          source: 'hover-item-bg-contain',
          selector: 'hover-item-bg-contain',
          keyword: true,
          property: ['background-size'],
          selectorPlugin: 'hoverTarget',
          selectorModifier: 'hoverItem',
          explodedSource: {
            prefix: 'hover-item',
            prefixSeparator: '-',
            classNamespace: 'bg',
            valueOrPluginSeparator: '-',
            valueIdentifier: 'contain',
            modifierSeparator: '',
            modifierIdentifier: '',
            suffixSeparator: '',
            suffix: '',
          },
          classObject: {
            'background-size': 'contain',
          },
        },
      ]);
    });
  });
});
