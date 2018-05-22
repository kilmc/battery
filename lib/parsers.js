'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var HTMLParser = exports.HTMLParser = function HTMLParser() {
  var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  var classes = input.match(/class=('|")(.*?)('|")/g).map(function (x) {
    return x.replace('class=', '').replace(/("|')/g, '');
  }).reduce(function (xs, x) {
    return xs.concat(x.split(' '));
  }, []).filter(function (x) {
    return x !== '';
  });

  return [].concat(_toConsumableArray(new Set(classes)));
};