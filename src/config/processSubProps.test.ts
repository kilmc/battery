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
      keywordSeparator: '',
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
        keywordSeparator: '',
        values: {
          auto: 'auto',
        },
        valuePlugin: 'lengthUnit',
      },
      {
        cssProperty: ['margin-top'],
        classNamespace: 'mt',
        keywordSeparator: '',
        values: {
          auto: 'auto',
        },
        valuePlugin: 'lengthUnit',
      },
      {
        cssProperty: ['margin-right'],
        classNamespace: 'mr',
        keywordSeparator: '',
        values: {
          auto: 'auto',
        },
        valuePlugin: 'lengthUnit',
      },
      {
        cssProperty: ['margin-bottom'],
        classNamespace: 'mb',
        keywordSeparator: '',
        values: {
          auto: 'auto',
        },
        valuePlugin: 'lengthUnit',
      },
      {
        cssProperty: ['margin-left'],
        classNamespace: 'ml',
        keywordSeparator: '',
        values: {
          auto: 'auto',
        },
        valuePlugin: 'lengthUnit',
      },
      {
        cssProperty: ['margin-top', 'margin-bottom'],
        classNamespace: 'my',
        keywordSeparator: '',
        values: {
          auto: 'auto',
        },
        valuePlugin: 'lengthUnit',
      },
      {
        cssProperty: ['margin-right', 'margin-left'],
        classNamespace: 'mx',
        keywordSeparator: '',
        values: {
          auto: 'auto',
        },
        valuePlugin: 'lengthUnit',
      },
    ];

    expect(convertSubProps(props)).toEqual(marginSubProps);
  });
});
