/* eslint-env jest, node */

import parseCSS from '../../src/parsers/parseCSS';

describe('parseCSS', () => {
  it('converts a CSS string to a classObject', () => {
    const cssString = `
.project-card {
  display: block;
  border-radius: 0.2rem;
  background-color: #fff;
  padding: 1.8rem;
}
`;
    expect(parseCSS(cssString)).toEqual({
      '.project-card': {
        display: 'block',
        'border-radius': '0.2rem',
        'background-color': '#fff',
        padding: '1.8rem'
      }
    });
  });
});