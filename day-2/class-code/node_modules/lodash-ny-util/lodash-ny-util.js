/**
 * Lodash mixins for generic functions for New York Magazine.
 *
 * File format inspired by lodash-deep.
 * @license MIT
 */
(function (root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['lodash'], factory);
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require('lodash').runInContext());
  } else {
    // Browser globals (root is window)
    root._ = factory(root._.runInContext());
  }
}(this, function (_) {
  'use strict';

  /**
   *
   * @param {string|function} fn
   * @returns {function(this:null)}
   */
  function convertToPromisePartial(fn) {
    fn = _.isFunction(fn) ? fn : _[fn];
    var result = _.partial.bind(null, fn, _);
    if (arguments.length > 1) {
      result = result.apply(null, _.slice(arguments, 1));
    }
    return result;
  }

  var mixins = /** @lends _ */ {

    /**
     * Maps the first row to become the property names of every following row, returning a list of maps.
     *
     * Example:  [['a', 'b'], ['c', 'd']] becomes {a: 'c', b: 'd'}
     * @param {[[]]} list    rows containing columns as arrays
     * @returns {[{}]}  rows containing columns as objects
     */
    mapToHeaders: function (list) {
      if (!_.isArray(list)) {
        throw new Error('first parameter must be array');
      }
      if (list.length < 1) {
        throw new Error('first parameter must have at least one row (headers)');
      }

      var headers = _.map(list.shift(), function (header, index) {
        if (header === null) {
          throw new Error('Missing header name of column ' + index);
        }
        return _.camelCase(header.toString());
      });

      return _.map(list, function (row) {
        return _.reduce(headers, function (obj, header, index) {
          obj[header] = row[index];
          return obj;
        }, {});
      });
    },

    /**
     * Shorthand for using lodash functions with A+ Promise's `.then` function
     *
     * @param {string|function} fn
     * @example return Promise.resolve(thing).then(_.promise(_.indexBy)('name')))
     * @example return Promise.resolve(thing).then(_.promise('indexBy')('name')))
     * @example return Promise.resolve(thing).then(_.promise(_.indexBy, 'name')))
     * @example return Promise.resolve(thing).then(_.promise('indexBy', 'name')))
     * @returns {function}
     */
    promise: convertToPromisePartial,

    /**
     * Takes an object that contains other objects, and flips the keys of the object and the inner object
     * @param {{}} map
     * @returns {{}}
     */
    invertKeys: function (map) {
      return _.reduce(map, function (obj, innerObj, key) {
        _.each(innerObj, function (value, innerKey) {
          obj[innerKey] = obj[innerKey] || {};
          obj[innerKey][key] = value;
        });
        return obj;
      }, {});
    },

    /**
     * @param obj
     * @param [filter=_.identity]  Optional filter
     *
     * NOTE:  Should probably put this in our lodash utils
     */
    listDeepObjects: function (obj, filter) {
      var cursor, items,
        list = [],
        queue = [obj];

      while (queue.length) {
        cursor = queue.pop();
        items = _.filter(cursor, _.isObject);
        list = list.concat(_.filter(items, filter || _.identity));
        queue = queue.concat(items);
      }

      return list;
    }
  };

  _.mixin(mixins);
  return mixins;
}));
