import { margin } from 'fixtures/props/margin';
import { convertSubProps } from './processSubProps';

describe('processSubProps', () => {
  it('converts configs with subProps into their own separate configs', () => {
    const props = [margin];
    const marginSubProps = [
      {
        prop: ['margin'],
        propIdentifier: 'm',
        keywordSeparator: '',
        keywordValues: {
          auto: 'auto',
        },
        plugin: 'lengthUnit',
      },
      {
        prop: ['margin-top'],
        propIdentifier: 'mt',
        keywordSeparator: '',
        keywordValues: {
          auto: 'auto',
        },
        plugin: 'lengthUnit',
      },
      {
        prop: ['margin-right'],
        propIdentifier: 'mr',
        keywordSeparator: '',
        keywordValues: {
          auto: 'auto',
        },
        plugin: 'lengthUnit',
      },
      {
        prop: ['margin-bottom'],
        propIdentifier: 'mb',
        keywordSeparator: '',
        keywordValues: {
          auto: 'auto',
        },
        plugin: 'lengthUnit',
      },
      {
        prop: ['margin-left'],
        propIdentifier: 'ml',
        keywordSeparator: '',
        keywordValues: {
          auto: 'auto',
        },
        plugin: 'lengthUnit',
      },
      {
        prop: ['margin-top', 'margin-bottom'],
        propIdentifier: 'my',
        keywordSeparator: '',
        keywordValues: {
          auto: 'auto',
        },
        plugin: 'lengthUnit',
      },
      {
        prop: ['margin-right', 'margin-left'],
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
