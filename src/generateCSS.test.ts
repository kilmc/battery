import { generateCSS } from './generateCSS';
import { BatteryConfig } from 'types/battery-config';
import { ModifierFn } from 'types/plugin-config';
import { pseudoPlugin } from 'fixtures/plugins/pseudo';
import { hoverTargetPlugin } from 'fixtures/plugins/hoverTarget';
import { breakpointPlugin } from 'fixtures/plugins/breakpoint';

describe('generateCSS', () => {
  describe('Handles keywords', () => {
    describe('with propIndicator', () => {
      const input = ['bg-contain', 'text-center'];
      const config: BatteryConfig = {
        props: [
          {
            prop: 'background-size',
            propIdentifier: 'bg',
            keywordSeparator: '-',
            keywordValues: {
              contain: 'contain',
              cover: 'cover',
            },
          },
          {
            prop: 'text-align',
            propIdentifier: 'text',
            keywordSeparator: '-',
            keywordValues: {
              center: 'center',
            },
          },
        ],
      };

      it('renders valid CSS', () => {
        expect(generateCSS(input, config).trim()).toEqual(
          '.bg-contain { background-size: contain } .text-center { text-align: center }'.trim(),
        );
      });
    });

    describe('with NO propIndicator', () => {
      const input = ['block', 'absolute'];
      const config: BatteryConfig = {
        props: [
          {
            prop: 'display',
            keywordValues: {
              block: 'block',
            },
          },
          {
            prop: 'position',
            keywordValues: {
              absolute: 'absolute',
            },
          },
        ],
      };

      test('renders valid CSS', () => {
        expect(generateCSS(input, config).trim()).toEqual(
          '.block { display: block } .absolute { position: absolute }'.trim(),
        );
      });
    });
  });

  describe('Handles pattern plugins', () => {
    describe('with NO modifiers', () => {
      const input = ['z100', 'flex1'];
      const config: BatteryConfig = {
        props: [
          {
            prop: 'z-index',
            propIdentifier: 'z',
            plugin: 'integer',
          },
          {
            prop: 'flex',
            propIdentifier: 'flex',
            plugin: 'integer',
          },
        ],
        plugins: [
          { type: 'pattern', name: 'integer', identifier: /-?\d{1,4}/ },
        ],
      };

      it('renders valid CSS', () => {
        expect(generateCSS(input, config).trim()).toEqual(
          '.z100 { z-index: 100 } .flex1 { flex: 1 }'.trim(),
        );
      });
    });

    describe('with modifiers', () => {
      const input = ['w100p', 'h50p'];
      const config: BatteryConfig = {
        props: [
          {
            prop: 'width',
            propIdentifier: 'w',
            plugin: 'lengthUnit',
          },
          {
            prop: 'height',
            propIdentifier: 'h',
            plugin: 'lengthUnit',
          },
        ],
        plugins: [
          {
            type: 'pattern',
            name: 'lengthUnit',
            identifier: /-?\d{1,4}/,
            modifiers: [
              {
                name: 'percent',
                identifier: 'p',
                modifierFn: value => `${value}%`,
              },
            ],
          },
        ],
      };

      it('renders valid CSS', () => {
        expect(generateCSS(input, config).trim()).toEqual(
          '.w100p { width: 100% } .h50p { height: 50% }'.trim(),
        );
      });
    });

    describe('with default modifier', () => {
      const input = ['m3'];
      const config: BatteryConfig = {
        props: [
          {
            prop: 'margin',
            propIdentifier: 'm',
            plugin: 'lengthUnit',
          },
        ],
        plugins: [
          {
            type: 'pattern',
            name: 'lengthUnit',
            identifier: /-?\d{1,4}/,
            modifiers: [
              {
                name: 'baseline',
                defaultModifier: true,
                modifierFn: value => {
                  const number = (parseInt(value) * 6) / 10;
                  return `${number}rem`;
                },
              },
            ],
          },
        ],
      };

      it('renders valid CSS', () => {
        expect(generateCSS(input, config).trim()).toEqual(
          '.m3 { margin: 1.8rem }'.trim(),
        );
      });
    });
  });

  describe('Handles lookup plugins', () => {
    describe('with NO modifiers', () => {
      const input = ['bg-black', 'white'];
      const config: BatteryConfig = {
        props: [
          {
            prop: 'color',
            pluginDefault: true,
            plugin: 'color',
          },
          {
            prop: 'background-color',
            propIdentifier: 'bg',
            pluginSeparator: '-',
            plugin: 'color',
          },
        ],
        plugins: [
          {
            type: 'lookup',
            name: 'color',
            values: { black: '#000000', white: '#FFFFFF' },
          },
        ],
      };

      it('renders valid CSS', () => {
        expect(generateCSS(input, config).trim()).toEqual(
          '.bg-black { background-color: #000000 } .white { color: #FFFFFF }'.trim(),
        );
      });
    });

    describe('with modifiers', () => {
      const hexToRgba: ModifierFn = (hex, opacity) => {
        const hexValue = hex.replace('#', '');
        const r = parseInt(hexValue.substring(0, 2), 16);
        const g = parseInt(hexValue.substring(2, 4), 16);
        const b = parseInt(hexValue.substring(4, 6), 16);

        return `rgba(${r},${g},${b},${parseInt(opacity) / 100})`;
      };

      const input = ['bg-black_50', 'white_01'];
      const config: BatteryConfig = {
        props: [
          {
            prop: 'color',
            pluginDefault: true,
            plugin: 'color',
          },
          {
            prop: 'background-color',
            propIdentifier: 'bg',
            pluginSeparator: '-',
            plugin: 'color',
          },
        ],
        plugins: [
          {
            type: 'lookup',
            name: 'color',
            values: { black: '#000000', white: '#FFFFFF' },
            modifiers: [
              {
                name: 'opacity',
                modifierFn: hexToRgba,
                separator: '_',
                identifier: /\d+/,
              },
            ],
          },
        ],
      };

      it('renders valid CSS', () => {
        expect(generateCSS(input, config).trim()).toEqual(
          '.bg-black_50 { background-color: rgba(0,0,0,0.5) } .white_01 { color: rgba(255,255,255,0.01) }'.trim(),
        );
      });
    });
  });

  describe('Handles selector plugins', () => {
    const input = ['hover-bg-contain', 'hover-item-text-center'];
    const config: BatteryConfig = {
      props: [
        {
          prop: 'background-size',
          propIdentifier: 'bg',
          keywordSeparator: '-',
          keywordValues: {
            contain: 'contain',
            cover: 'cover',
          },
        },
        {
          prop: 'text-align',
          propIdentifier: 'text',
          keywordSeparator: '-',
          keywordValues: {
            center: 'center',
          },
        },
      ],
      plugins: [pseudoPlugin, hoverTargetPlugin],
    };

    describe('', () => {
      it('renders valid CSS', () => {
        expect(generateCSS(input, config).trim()).toEqual(
          '.hover-bg-contain:hover { background-size: contain } .hover-target:hover .hover-item-text-center { text-align: center }'.trim(),
        );
      });
    });
  });

  describe('Handles atrule plugins', () => {
    const input = ['bg-contain-md', 'bg-cover-md', 'text-center-sm'];
    const config: BatteryConfig = {
      props: [
        {
          prop: 'background-size',
          propIdentifier: 'bg',
          keywordSeparator: '-',
          keywordValues: {
            contain: 'contain',
            cover: 'cover',
          },
        },
        {
          prop: 'text-align',
          propIdentifier: 'text',
          keywordSeparator: '-',
          keywordValues: {
            center: 'center',
          },
        },
      ],
      plugins: [breakpointPlugin],
    };

    describe('', () => {
      it('renders valid CSS', () => {
        expect(generateCSS(input, config).replace(/\s/g, '')).toEqual(
          `
          @media (min-width: 560px) {
            .text-center-sm { text-align: center }
          }
          @media (min-width: 940px) {
            .bg-contain-md { background-size: contain }
            .bg-cover-md { background-size: cover }
          }
        `.replace(/\s/g, ''),
        );
      });
    });
  });
});
