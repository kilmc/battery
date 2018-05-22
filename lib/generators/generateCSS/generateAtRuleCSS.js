'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _generateClasses = require('./generateClasses');

var _generateClasses2 = _interopRequireDefault(_generateClasses);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var generateAtRuleCSS = function generateAtRuleCSS(_ref) {
  var atrule = _ref.atrule,
      output = _ref.output,
      library = _ref.library,
      condition = _ref.condition;

  var renderedClasses = (0, _generateClasses2.default)(library, true);
  if (!renderedClasses) return output;
  var renderedAtrule = '\n@' + atrule + ' ' + condition + ' {\n  ' + renderedClasses + '\n}\n';
  return output += renderedAtrule;
};

exports.default = generateAtRuleCSS;