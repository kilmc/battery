/* eslint-env node */

const fs = require('fs-extra');
const { generateCSS } = require('../src/index');
const { config } = require('../src/testConfig');

const atomsCSSFile = './output/library.css';
const outputCSS = (file, obj) => fs.outputFile(file, obj);

const libraryClasses = [
  'bg-cover',
  'bg-cover-md',
  'w100p',
  'z100',
  'green-500',
  'hover-green-500',
  'bg-green-800',
  'hover-bg-green-800',
  'order-100',
  'fill-green-800-lg'
];
outputCSS(atomsCSSFile,generateCSS(libraryClasses,config));