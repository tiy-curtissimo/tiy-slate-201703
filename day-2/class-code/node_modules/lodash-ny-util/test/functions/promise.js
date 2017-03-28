var _ = require('lodash'),
  expect = require('chai').expect;

describe('promise', function () {

  before(function () {
    _.mixin(require('../../lodash-ny-util'));
  });

  it('indexBy: returns indexed map', function () {
    var result = _.promise(_.indexBy, 'name');

    expect(result([
      {'name': 'a', thing: 'b'},
      {'name': 'c', thing: 'd'}
    ])).to.deep.equal({
        a: {'name': 'a', thing: 'b'},
        c: {'name': 'c', thing: 'd'}
      });
  });

  it('omit: returns map of objects without named property', function () {
    var result = _.promise('omit', 'a');

    expect(result({a: 'b', c: 'd', e: 'f'}))
      .to.deep.equal({c: 'd', e: 'f'});
  });

  it('omit: returns map of objects without named properties (two arguments)', function () {
    var result = _.promise('omit', 'a', 'c');

    expect(result({a: 'b', c: 'd', e: 'f'}))
      .to.deep.equal({e: 'f'});
  });

  it('pick: returns map of objects with only named property', function () {
    var result = _.promise('pick', 'a');

    expect(result({a: 'b', c: 'd', e: 'f'}))
      .to.deep.equal({a: 'b'});
  });

  it('pick: returns map of objects with only named properties (two arguments)', function () {
    var result = _.promise('pick', 'a', 'c');

    expect(result({a: 'b', c: 'd', e: 'f'}))
      .to.deep.equal({a: 'b', c: 'd'});
  });
});