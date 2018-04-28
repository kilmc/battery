/* eslint-env jest, node */

import { generateClassObject } from '../src/classObject';

describe('generateClassObject', () => {
  it('formats a set of inputs into a classObject structure', () => {
    expect(generateClassObject({
      className: 'bg-black',
      cssProps: 'background-color',
      value: '#000000'
    })).toEqual({
      'bg-black': {
        'background-color': '#000000'
      }
    });
  });

  it('can take multiple cssProps and render a keyValue pair for each', () => {
    expect(generateClassObject({
      className: 'my10p',
      cssProps: 'margin-top margin-bottom',
      value: '10%'
    })).toEqual({
      'my10p': {
        'margin-top': '10%',
        'margin-bottom': '10%'
      }
    });
  });
});