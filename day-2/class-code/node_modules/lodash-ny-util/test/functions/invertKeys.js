var _ = require('lodash'),
  expect = require('chai').expect;

describe('invertKeys', function () {

  before(function () {
    _.mixin(require('../../lodash-ny-util'));
  });

  it('returns map of objects with keys of inner and outer objects reversed', function () {
    var result = _.invertKeys({a: {b: 'c', d: 'e'}, f: {g: 'h', i: 'j'}});

    expect(result).to.deep.equal({b: {a: 'c'}, d: {a: 'e'}, g: {f: 'h'}, i: {f: 'j'}});
  });
});