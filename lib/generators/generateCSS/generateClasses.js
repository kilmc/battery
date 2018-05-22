'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var generateClass = exports.generateClass = function generateClass(className, declarations) {
  var classBody = Object.keys(declarations).map(function (prop) {
    return prop + ': ' + declarations[prop] + ';';
  }).join(' ');

  return '.' + className + ' { ' + classBody + ' }';
};

var generateClasses = function generateClasses(obj) {
  var indent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return Object.keys(obj).map(function (cx) {
    return generateClass(cx, obj[cx]);
  }).join(indent ? '\n  ' : '\n');
};

exports.default = generateClasses;