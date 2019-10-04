import { BatteryConfig } from 'types/battery-config';
import { position } from 'fixtures/props/position';
import { display } from 'fixtures/props/display';
import { addMetaData } from './addMetaData';
import { backgroundSize } from 'fixtures/props/background-size';
import { zIndex } from 'fixtures/props/z-index';
import { colorPlugin } from 'fixtures/plugins/color';
import { backgroundColor } from 'fixtures/props/background-color';
import { integerPlugin } from 'fixtures/plugins/integer';
import { lengthUnitsPlugin } from 'fixtures/plugins/lengthUnits';
import { width } from 'fixtures/props/width';

describe('addMetaData', () => {
  describe('Handles keyword classNames', () => {
    const config: BatteryConfig = {
      props: [position, display, backgroundSize],
    };
    const inputClassNames = ['block', 'absolute', 'bg-contain'];

    test('All meta data is added to the classMetaData object', () => {
      expect(addMetaData(inputClassNames, config)).toEqual([
        {
          source: 'block',
          keyword: true,
          property: 'display',
          explodedSource: {
            prefix: '',
            prefixSeparator: '',
            propIdentifier: '',
            valueSeparator: '',
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
          keyword: true,
          property: 'position',
          explodedSource: {
            prefix: '',
            prefixSeparator: '',
            propIdentifier: '',
            valueSeparator: '',
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
          keyword: true,
          property: 'background-size',
          explodedSource: {
            prefix: '',
            prefixSeparator: '',
            propIdentifier: 'bg',
            valueSeparator: '-',
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
    const config: BatteryConfig = {
      props: [zIndex, backgroundColor, backgroundSize, width],
      plugins: [integerPlugin, colorPlugin, lengthUnitsPlugin],
    };
    const inputClassNames = ['bg-white', 'bg-white_10', 'z100', 'w3'];

    test('All meta data is added to the classMetaData object', () => {
      expect(addMetaData(inputClassNames, config)).toEqual([
        {
          source: 'bg-white',
          keyword: false,
          property: 'background-color',
          valuePlugin: 'color',
          valuePluginType: 'lookup',
          explodedSource: {
            prefix: '',
            prefixSeparator: '',
            propIdentifier: 'bg',
            valueSeparator: '-',
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
          keyword: false,
          property: 'background-color',
          valuePlugin: 'color',
          valuePluginType: 'lookup',
          explodedSource: {
            prefix: '',
            prefixSeparator: '',
            propIdentifier: 'bg',
            valueSeparator: '-',
            valueIdentifier: 'white',
            modifierSeparator: '_',
            modifierIdentifier: '10',
            suffix: '',
            suffixSeparator: '',
          },
          modifierPlugin: 'opacity',
          classObject: {
            'background-color': 'rgba(255,255,255,0.1)',
          },
        },
        {
          source: 'z100',
          keyword: false,
          property: 'z-index',
          valuePlugin: 'integer',
          valuePluginType: 'pattern',
          explodedSource: {
            prefix: '',
            prefixSeparator: '',
            propIdentifier: 'z',
            valueSeparator: '',
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
          keyword: false,
          property: 'width',
          valuePlugin: 'lengthUnit',
          valuePluginType: 'pattern',
          explodedSource: {
            prefix: '',
            prefixSeparator: '',
            propIdentifier: 'w',
            valueSeparator: '',
            valueIdentifier: '3',
            modifierSeparator: '',
            modifierIdentifier: '',
            suffix: '',
            suffixSeparator: '',
          },
          modifierPlugin: 'ratio',
          classObject: {
            width: '1.125rem',
          },
        },
      ]);
    });
  });
});
