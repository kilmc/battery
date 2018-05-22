'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ = require('../');

var _generateAtRules = require('../generateAtRules');

var _generateAtRules2 = _interopRequireDefault(_generateAtRules);

var _classNameType = require('../../plugins/classNameType');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var generateStyleTags = function generateStyleTags(config) {
  return function (classNames) {
    var library = (0, _.generateLibrary)(classNames, config);
    var libraryCSS = '';

    libraryCSS += (0, _generateAtRules2.default)(library, config.plugins, 'styletags');
    (0, _classNameType.processClassNameTypes)(library, config.plugins);

    return libraryCSS;
  };
};

exports.default = generateStyleTags;