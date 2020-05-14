import { generateCSS } from './generateCSS';
import { BatteryConfig } from './types/battery-config';
import { ModifierFn } from './types/plugin-config';
import { colorPlugin } from './fixtures/plugins/color';
import { integerPlugin } from './fixtures/plugins/integer';
import { pseudoPlugin } from './fixtures/plugins/pseudo';
import { hoverTargetPlugin } from './fixtures/plugins/hoverTarget';
import { breakpointPlugin } from './fixtures/plugins/breakpoint';
import { margin } from './fixtures/props/margin';
import { lengthUnitsPlugin } from './fixtures/plugins/lengthUnits';
import { PropertyConfig } from './types/property-config';

const testOutput = (source: string, expectation: string) => {
  expect(source.replace(/\s/g, '')).toEqual(expectation.replace(/\s/g, ''));
};

describe('generateCSS', () => {
  describe('Handles keywords', () => {
    describe('with classNamespace', () => {
      const input = ['bg-contain', 'text-center'];
      const config: BatteryConfig = {
        props: [
          {
            cssProperty: 'background-size',
            classNamespace: 'bg',
            valueSeparator: '-',
            values: {
              contain: 'contain',
              cover: 'cover',
            },
          },
          {
            cssProperty: 'text-align',
            classNamespace: 'text',
            valueSeparator: '-',
            values: {
              center: 'center',
            },
          },
        ],
      };

      it('renders valid CSS', () => {
        testOutput(
          generateCSS(input, config),
          '.bg-contain { background-size: contain } .text-center { text-align: center }',
        );
      });
    });

    describe('with NO classNamespace', () => {
      const input = ['block', 'absolute'];
      const config: BatteryConfig = {
        props: [
          {
            cssProperty: 'display',
            values: {
              block: 'block',
            },
          },
          {
            cssProperty: 'position',
            values: {
              absolute: 'absolute',
            },
          },
        ],
      };

      test('renders valid CSS', () => {
        testOutput(
          generateCSS(input, config),
          '.block { display: block } .absolute { position: absolute }',
        );
      });
    });

    describe('with clashing classNamespaces', () => {
      const input = ['bg-contain', 'bg100p', 'bg-black'];
      const config: BatteryConfig = {
        props: [
          {
            cssProperty: 'background-size',
            classNamespace: 'bg',
            valueSeparator: '-',
            valuePlugin: lengthUnitsPlugin(),
            values: {
              contain: 'contain',
              cover: 'cover',
            },
          },
          {
            cssProperty: 'background-color',
            classNamespace: 'bg',
            pluginSeparator: '-',
            valuePlugin: colorPlugin(),
          },
        ],
      };

      test('renders valid CSS', () => {
        testOutput(
          generateCSS(input, config),
          '.bg-black { background-color: #000000 } .bg-contain { background-size: contain } .bg100p { background-size: 100% }',
        );
      });
    });

    describe('with a default value', () => {
      const input = ['border'];
      const config: BatteryConfig = {
        props: [
          {
            cssProperty: 'border',
            classNamespace: 'border',
            valueSeparator: '-',
            values: { __DEFAULT__: '1px solid #000' },
          },
        ],
      };

      test('renders valid CSS', () => {
        testOutput(
          generateCSS(input, config),
          '.border { border: 1px solid #000 }',
        );
      });
    });
  });

  describe('Handles subProps', () => {
    describe('standard set', () => {
      const classNames = ['mb2', 'mt10p', 'm3', 'mr1'];
      const config: BatteryConfig = {
        props: [margin],
        plugins: [],
      };
      it('renders valid CSS', () => {
        testOutput(
          generateCSS(classNames, config),
          `
          .m3 { margin: 1.125rem }
          .mb2 { margin-bottom: 0.75rem }
          .mr1 { margin-right: 0.375rem }
          .mt10p { margin-top: 10% }
          `,
        );
      });
    });

    describe('multiple prop set', () => {
      const classNames = ['mx2', 'my50p'];
      const config: BatteryConfig = {
        props: [margin],
        plugins: [],
      };
      it('renders valid CSS', () => {
        testOutput(
          generateCSS(classNames, config),
          `
          .mx2 { margin-right: 0.75rem; margin-left: 0.75rem }
          .my50p { margin-top: 50%; margin-bottom: 50% }
          `,
        );
      });
    });

    describe('border prop set', () => {
      const classNames = ['border-top-solid', 'border-x-dashed'];
      const config: BatteryConfig = {
        props: [
          {
            cssProperty: 'border-style',
            classNamespace: 'border',
            subPropSeparator: '-',
            subProps: {
              top: 'top',
              right: 'right',
              bottom: 'bottom',
              left: 'left',
              horizontal: 'x',
              vertical: 'y',
            },
            valueSeparator: '-',
            values: {
              solid: 'solid',
              dashed: 'dashed',
            },
          },
        ],
        plugins: [],
      };
      it('renders valid CSS', () => {
        testOutput(
          generateCSS(classNames, config),
          `
          .border-x-dashed {  border-right-style: dashed; border-left-style: dashed}
          .border-top-solid { border-top-style: solid }
          `,
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
            cssProperty: 'z-index',
            classNamespace: 'z',
            valuePlugin: integerPlugin(),
          },
          {
            cssProperty: 'flex',
            classNamespace: 'flex',
            valuePlugin: integerPlugin(),
          },
        ],
        plugins: [],
      };

      it('renders valid CSS', () => {
        testOutput(
          generateCSS(input, config),
          ' .flex1 { flex: 1 } .z100 { z-index: 100 }',
        );
      });
    });

    describe('with modifiers', () => {
      const input = ['w100p', 'h50p'];
      const config: BatteryConfig = {
        props: [
          {
            cssProperty: 'width',
            classNamespace: 'w',
            valuePlugin: lengthUnitsPlugin(),
          },
          {
            cssProperty: 'height',
            classNamespace: 'h',
            valuePlugin: lengthUnitsPlugin(),
          },
        ],
        plugins: [],
      };

      it('renders valid CSS', () => {
        testOutput(
          generateCSS(input, config),
          '.h50p { height: 50% } .w100p { width: 100% }',
        );
      });
    });

    describe('with default modifier', () => {
      const input = ['m3'];
      const config: BatteryConfig = {
        props: [
          {
            cssProperty: 'margin',
            classNamespace: 'm',
            valuePlugin: lengthUnitsPlugin(),
          },
        ],
        plugins: [],
      };

      it('renders valid CSS', () => {
        testOutput(generateCSS(input, config), '.m3 { margin: 1.125rem }');
      });
    });
  });

  describe('Handles lookup plugins', () => {
    describe('with NO modifiers', () => {
      const input = ['bg-black', 'white'];
      const config: BatteryConfig = {
        props: [
          {
            cssProperty: 'color',
            pluginDefault: true,
            valuePlugin: colorPlugin(),
          },
          {
            cssProperty: 'background-color',
            classNamespace: 'bg',
            pluginSeparator: '-',
            valuePlugin: colorPlugin(),
          },
        ],
        plugins: [],
      };

      it('renders valid CSS', () => {
        testOutput(
          generateCSS(input, config),
          '.bg-black { background-color: #000000 } .white { color: #FFFFFF }',
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
            cssProperty: 'color',
            pluginDefault: true,
            valuePlugin: colorPlugin(),
          },
          {
            cssProperty: 'background-color',
            classNamespace: 'bg',
            pluginSeparator: '-',
            valuePlugin: colorPlugin(),
          },
        ],
        plugins: [],
      };

      it('renders valid CSS', () => {
        testOutput(
          generateCSS(input, config),
          '.bg-black_50 { background-color: rgba(0,0,0,0.5) } .white_01 { color: rgba(255,255,255,0.01) }',
        );
      });
    });
  });

  describe('Handles selector plugins', () => {
    const input = ['hover-bg-contain', 'hover-item-text-center'];
    const config: BatteryConfig = {
      props: [
        {
          cssProperty: 'background-size',
          classNamespace: 'bg',
          valueSeparator: '-',
          values: {
            contain: 'contain',
            cover: 'cover',
          },
        },
        {
          cssProperty: 'text-align',
          classNamespace: 'text',
          valueSeparator: '-',
          values: {
            center: 'center',
          },
        },
      ],
      plugins: [pseudoPlugin(), hoverTargetPlugin()],
    };

    describe('', () => {
      it('renders valid CSS', () => {
        testOutput(
          generateCSS(input, config),
          '.hover-bg-contain:hover { background-size: contain } .hover-target:hover .hover-item-text-center { text-align: center }',
        );
      });
    });
  });

  describe('Handles atrule plugins', () => {
    const input = ['bg-contain-md', 'bg-cover-md', 'text-center-sm'];
    const config: BatteryConfig = {
      props: [
        {
          cssProperty: 'background-size',
          classNamespace: 'bg',
          valueSeparator: '-',
          values: {
            contain: 'contain',
            cover: 'cover',
          },
        },
        {
          cssProperty: 'text-align',
          classNamespace: 'text',
          valueSeparator: '-',
          values: {
            center: 'center',
          },
        },
      ],
      plugins: [breakpointPlugin()],
    };

    describe('', () => {
      it('renders valid CSS', () => {
        testOutput(
          generateCSS(input, config),
          `
          @media (min-width: 560px) {
            .text-center-sm { text-align: center }
          }
          @media (min-width: 940px) {
            .bg-contain-md { background-size: contain }
            .bg-cover-md { background-size: cover }
          }`,
        );
      });
    });
  });

  describe('Sorts', () => {
    describe('into descending alpha-numeric order', () => {
      const backgroundSize: PropertyConfig = {
        cssProperty: 'background-size',
        classNamespace: 'bg',
        valueSeparator: '-',
        values: {
          contain: 'contain',
          cover: 'cover',
        },
      };
      const textAlign: PropertyConfig = {
        cssProperty: 'text-align',
        classNamespace: 'text',
        valueSeparator: '-',
        values: {
          center: 'center',
        },
      };
      const classNames = [
        'text-center',
        'bg-cover',
        'mb2',
        'mt10p',
        'm3',
        'mr1',
        'bg-contain',
        'mr2',
        'mr3',
        'mt11',
        'mt11p',
      ];
      const config: BatteryConfig = {
        props: [margin, backgroundSize, textAlign],
        plugins: [],
      };
      it('renders valid CSS', () => {
        testOutput(
          generateCSS(classNames, config),
          `
            .bg-contain { background-size: contain }
            .bg-cover { background-size: cover }
            .m3 { margin: 1.125rem }
            .mb2 { margin-bottom: 0.75rem }
            .mr1 { margin-right: 0.375rem }
            .mr2 { margin-right: 0.75rem }
            .mr3 { margin-right: 1.125rem }
            .mt11 { margin-top: 4.125rem }
            .mt10p { margin-top: 10% }
            .mt11p { margin-top: 11% }
            .text-center { text-align: center }
          `,
        );
      });
    });

    describe('moves auto and inherit values to the bottom of the list', () => {
      const margin: PropertyConfig = {
        cssProperty: 'margin',
        classNamespace: 'm',
        valueSeparator: '-',
        values: {
          base: '1rem',
          zzzz: '10rem',
          auto: 'auto',
          inherit: 'inherit',
        },
      };
      const classNames = ['m-auto', 'm-zzzz', 'm-inherit', 'm-base'];
      const config: BatteryConfig = {
        props: [margin],
        plugins: [],
      };
      it('renders valid CSS', () => {
        testOutput(
          generateCSS(classNames, config),
          `
            .m-base { margin: 1rem }
            .m-zzzz { margin: 10rem }
            .m-auto { margin: auto }
            .m-inherit { margin: inherit }
            `,
        );
      });
    });
  });

  describe('When in static mode', () => {
    describe('Handles generating values from a PropertyConfig', () => {
      const textAlign: PropertyConfig = {
        cssProperty: 'text-align',
        classNamespace: 'text',
        valueSeparator: '-',
        values: {
          center: 'center',
          left: 'left',
          right: 'right',
        },
        static: {
          values: ['center', 'left', 'right'],
        },
      };
      const config: BatteryConfig = {
        props: [textAlign],
      };
      it('renders valid CSS', () => {
        testOutput(
          generateCSS([], config, true),
          `
          .text-center { text-align: center }
          .text-left { text-align: left }
          .text-right { text-align: right }
          `,
        );
      });
    });

    describe('Handles automatically generating all values from a PropertyConfig', () => {
      const display: PropertyConfig = {
        cssProperty: 'display',
        classNamespace: '',
        values: {
          inline: 'inline',
          block: 'block',
          'display-none': 'none',
          flex: 'flex',
          'inline-flex': 'inline-flex',
          table: 'table',
          grid: 'grid',
        },
      };

      const config: BatteryConfig = {
        props: [display],
        static: {
          generateAllValues: true,
        },
      };

      it('renders valid CSS', () => {
        testOutput(
          generateCSS([], config, true),
          `
            .block { display: block }
            .display-none { display: none }
            .flex { display: flex }
            .grid { display: grid }
            .inline { display: inline }
            .inline-flex { display: inline-flex }
            .table { display: table }
          `,
        );
      });
    });
  });
});
