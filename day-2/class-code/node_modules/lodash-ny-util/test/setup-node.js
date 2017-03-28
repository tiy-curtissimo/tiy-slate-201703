'use strict';

var _ = require('lodash'),
  expect = require('chai').expect;

//so we can test if this disappears or not
_.mixin({
  fakeFunction: function () {}
});

_.mixin(require('../lodash-ny-util'));

require('./functions/mapToHeaders');
require('./functions/promise');
require('./functions/invertKeys');
require('./functions/listDeepObjects');

describe('initialization', function () {
  it('mixin: does not remove previous mixins', function () {
    expect(function () {
      _.fakeFunction();
    }).to.not.throw(Error);
  });
});