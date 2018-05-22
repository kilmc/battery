'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Strings
// ------------------------------------------------------------------

var camelize = exports.camelize = function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
    if (+match === 0) return ''; // or if (/\s+/.test(match)) for white spaces
    return index == 0 ? match.toLowerCase() : match.toUpperCase();
  });
};

// Arrays
// ------------------------------------------------------------------
var subtractArrays = exports.subtractArrays = function subtractArrays(arr1, arr2) {
  var returnArr = arr1;

  arr2.map(function (remove) {
    var index = arr1.indexOf(remove);
    if (index !== -1) {
      returnArr.splice(index, 1);
    }
  });
  return returnArr;
};

// Formatters
var formatPrefixOrSuffix = exports.formatPrefixOrSuffix = function formatPrefixOrSuffix(x, y, prefixOrSuffix) {
  return prefixOrSuffix === 'prefix' ? '' + x + y : '' + y + x;
};

var sortAndJoin = exports.sortAndJoin = function sortAndJoin(arr) {
  return arr.sort(function (a, b) {
    return b.length - a.length;
  }).join('|');
};