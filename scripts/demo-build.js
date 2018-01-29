/* eslint-env node */

const fs = require('fs-extra');
const path = require('path');
const { HTMLParser } = require('../src/parsers');
const { generateCSS } = require('../src/index');
const config = require('../config').default;

const atomsCSSFile = './demo/battery.css';
const HTMLFile = path.resolve('demo/index.html');
const outputCSS = (file, obj) => fs.outputFile(file, obj);
const HTMLString = fs.readFileSync(HTMLFile,'utf8',(err, data) => err + data);

outputCSS(atomsCSSFile,generateCSS(HTMLParser(HTMLString),config));
