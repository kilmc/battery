import { convertSubProps } from './processSubProps';
import { UserPropConfig } from 'types/prop-config';

describe('processSubProps', () => {
  it('converts configs with subProps into their own separate configs', () => {
    const margin: UserPropConfig = {
      cssProperty: ['margin'],
      propIdentifier: 'm',
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
      keywordValues: {
        auto: 'auto',
      },
      plugin: 'lengthUnit',
    };

    const props = [margin];
    const marginSubProps = [
      {
        cssProperty: ['margin'],
        propIdentifier: 'm',
        keywordSeparator: '',
        keywordValues: {
          auto: 'auto',
        },
        plugin: 'lengthUnit',
      },
      {
        cssProperty: ['margin-top'],
        propIdentifier: 'mt',
        keywordSeparator: '',
        keywordValues: {
          auto: 'auto',
        },
        plugin: 'lengthUnit',
      },
      {
        cssProperty: ['margin-right'],
        propIdentifier: 'mr',
        keywordSeparator: '',
        keywordValues: {
          auto: 'auto',
        },
        plugin: 'lengthUnit',
      },
      {
        cssProperty: ['margin-bottom'],
        propIdentifier: 'mb',
        keywordSeparator: '',
        keywordValues: {
          auto: 'auto',
        },
        plugin: 'lengthUnit',
      },
      {
        cssProperty: ['margin-left'],
        propIdentifier: 'ml',
        keywordSeparator: '',
        keywordValues: {
          auto: 'auto',
        },
        plugin: 'lengthUnit',
      },
      {
        cssProperty: ['margin-top', 'margin-bottom'],
        propIdentifier: 'my',
        keywordSeparator: '',
        keywordValues: {
          auto: 'auto',
        },
        plugin: 'lengthUnit',
      },
      {
        cssProperty: ['margin-right', 'margin-left'],
        propIdentifier: 'mx',
        keywordSeparator: '',
        keywordValues: {
          auto: 'auto',
        },
        plugin: 'lengthUnit',
      },
    ];

    expect(convertSubProps(props)).toEqual(marginSubProps);
  });
});
