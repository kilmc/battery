/* eslint-env jest, node */

import { generate } from './index';
import config from './testConfig';

const textClasses = [
  'bg-cover',
  'bg-cover-md',
  'w100p',
  'z100',
  'green-500',
  'hover-green-500',
  'bg-green-800',
  'hover-bg-green-800',
  'order-100'
];

describe('generate', () => {
  it('geneates an atomic css library', () => {
    expect(generate(textClasses,config)).toEqual(`.green-500 { color: #25CB68; }
.bg-green-800 { background-color: #098530; }
.w100p { width: 100%; }
.bg-cover { background-size: cover; }
.order-100 { order: -100; }
.z100 { z-index: 100; }
.hover-green-500:hover { color: #25CB68; }
.hover-bg-green-800:hover { background-color: #098530; }
@media (min-width: 795px) {
  .bg-cover-md { background-size: cover; }
}`);
  });
});
