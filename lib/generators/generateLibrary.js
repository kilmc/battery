'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _deepmerge = require('deepmerge');

var _deepmerge2 = _interopRequireDefault(_deepmerge);

var _keywordValueType = require('../plugins/keywordValueType');

var _config = require('../config/');

var _sequencers = require('../sequencers');

var _sortClassNames = require('../sortClassNames');

var _sortClassNames2 = _interopRequireDefault(_sortClassNames);

var _classObject = require('../classObject');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var generateLibrary = function generateLibrary(classNames, config) {
  var _processConfig = (0, _config.processConfig)(config),
      props = _processConfig.props,
      settings = _processConfig.settings,
      plugins = _processConfig.plugins;

  var classObjs = void 0;
  var keywordValueRegexes = void 0;

  // KeywordValues
  if (settings.enableKeywordValues) {
    var keywordValueObjs = (0, _keywordValueType.generateKeywordValueObjs)(props);
    keywordValueRegexes = (0, _sequencers.generateKeywordValueRegexObj)(keywordValueObjs, plugins);
  }

  var valuePluginRegexes = (0, _sequencers.generateValuePluginRegexObj)(plugins, props);
  var pluginRegexes = (0, _deepmerge2.default)(valuePluginRegexes, keywordValueRegexes);
  var sortedClassNames = (0, _sortClassNames2.default)(classNames, pluginRegexes);

  var convertedClassNames = (0, _classObject.convertClassNamestoClassObjs)(sortedClassNames, plugins, props);

  classObjs = _extends({}, convertedClassNames);

  return classObjs;
};

exports.default = generateLibrary;