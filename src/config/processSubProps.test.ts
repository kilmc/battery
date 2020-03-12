import { convertSubProps } from './processSubProps';
import { UserPropConfig } from 'types/prop-config';

describe('processSubProps', () => {
  it('converts configs with subProps into their own separate configs', () => {
    const margin: UserPropConfig = {
      cssProperty: ['margin'],
      classNamespace: 'm',
      subProps: {
        all: '',
        top: 't',
        right: 'r',
        bottom: 'b',
        left: 'l',
        vertical: 'y',
        horizontal: 'x',
      },
      valueSeparator: '',
      values: {
        auto: 'auto',
      },
      valuePlugin: 'lengthUnit',
    };

    const props = [margin];
    const marginSubProps = [
      {
        cssProperty: ['margin'],
        classNamespace: 'm',
        valueSeparator: '',
        values: {
          auto: 'auto',
        },
        valuePlugin: 'lengthUnit',
      },
      {
        cssProperty: ['margin-top'],
        classNamespace: 'mt',
        valueSeparator: '',
        values: {
          auto: 'auto',
        },
        valuePlugin: 'lengthUnit',
      },
      {
        cssProperty: ['margin-right'],
        classNamespace: 'mr',
        valueSeparator: '',
        values: {
          auto: 'auto',
        },
        valuePlugin: 'lengthUnit',
      },
      {
        cssProperty: ['margin-bottom'],
        classNamespace: 'mb',
        valueSeparator: '',
        values: {
          auto: 'auto',
        },
        valuePlugin: 'lengthUnit',
      },
      {
        cssProperty: ['margin-left'],
        classNamespace: 'ml',
        valueSeparator: '',
        values: {
          auto: 'auto',
        },
        valuePlugin: 'lengthUnit',
      },
      {
        cssProperty: ['margin-top', 'margin-bottom'],
        classNamespace: 'my',
        valueSeparator: '',
        values: {
          auto: 'auto',
        },
        valuePlugin: 'lengthUnit',
      },
      {
        cssProperty: ['margin-right', 'margin-left'],
        classNamespace: 'mx',
        valueSeparator: '',
        values: {
          auto: 'auto',
        },
        valuePlugin: 'lengthUnit',
      },
    ];

    expect(convertSubProps(props)).toEqual(marginSubProps);
  });
});
