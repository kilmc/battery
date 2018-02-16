/* eslint-env node */

const { execSync } = require('child_process');
const path = require('path');
const Watchpack = require('watchpack');
const fs = require('fs-extra');

function getDirectories(dir) {
  return fs
    .readdirSync(dir)
    .map(file => path.resolve(dir, file))
    .filter(f => fs.lstatSync(path.resolve(f)).isDirectory());
}

const HTMLFILE = path.resolve(__dirname, '../demo/index.html');
const CONFIG_SRC = path.resolve(__dirname, '../config');

const BUILD_CMD = `NODE_ENV=development babel-node ${path.resolve(__dirname, './demo-build.js')}`;

var wp = new Watchpack({
  aggregateTimeout: 1000,
  poll: true,
  ignored: /node_modules/,
});

wp.watch([HTMLFILE],getDirectories(CONFIG_SRC));

wp.on('aggregated', function(changes) {
  execSync(`${BUILD_CMD} ${changes.join(' ')}`, {stdio: [0, 1, 2]});
});
