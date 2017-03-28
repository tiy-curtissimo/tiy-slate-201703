'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (list) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  if (!list || !Array.isArray(list)) {
    return Promise.reject(new Error('List must be an array'));
  }

  if (list.length === 0) {
    return Promise.reject(new Error('List must not be empty'));
  }

  if (list.filter(function (fn) {
    return typeof fn !== 'function';
  }).length > 0) {
    return Promise.reject(new Error('List items must be functions'));
  }

  try {
    return list.slice(1).reduce(function (previous, fn) {
      return previous.catch(function () {
        return tryFn(fn, args);
      });
    }, tryFn(list[0], args)).catch(function () {
      return Promise.reject(new Error('No items resolved'));
    });
  } catch (e) {
    return Promise.reject(e);
  }
};

/**
 * try to resolve a function.
 * resolve if it returns a resolved promise or value
 * reject if it returns a rejected promise or throws an error
 * @param {function} fn
 * @param {array} args
 * @returns {Promise}
 */
function tryFn(fn, args) {
  try {
    return Promise.resolve(fn.apply(null, args));
  } catch (e) {
    return Promise.reject(e);
  }
}

module.exports = exports['default'];