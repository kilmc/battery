'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classNameType = require('../../plugins/classNameType');

var _generateLibrary = require('../generateLibrary');

var _generateLibrary2 = _interopRequireDefault(_generateLibrary);

var _generateClasses = require('./generateClasses');

var _generateClasses2 = _interopRequireDefault(_generateClasses);

var _generateAtRules = require('../generateAtRules');

var _generateAtRules2 = _interopRequireDefault(_generateAtRules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var generateCSS = function generateCSS(classNames, config) {
  var library = (0, _generateLibrary2.default)(classNames, config);
  var libraryCSS = '';

  libraryCSS += (0, _generateAtRules2.default)(library, config.plugins, 'css');
  (0, _classNameType.processClassNameTypes)(library, config.plugins);

  libraryCSS = (0, _generateClasses2.default)(library) + '\n' + libraryCSS;

  return libraryCSS;
};

exports.default = generateCSS;