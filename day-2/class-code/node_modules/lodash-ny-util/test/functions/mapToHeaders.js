var _ = require('lodash'),
  expect = require('chai').expect;

describe('mapToHeaders', function () {

  before(function () {
    _.mixin(require('../../lodash-ny-util'));
  });

  it('Throw on empty', function () {
    //When data is bad, throwing exception is better than displaying half-built component
    expect(function() {
      _.mapToHeaders();
    }).to.throw(Error);
  });

  it('Throw on missing headers (need at least one row)', function () {
    //When data is bad, throwing exception is better than displaying half-built component
    expect(function() {
      _.mapToHeaders([]);
    }).to.throw(Error);
  });

  it('Throw on null header', function () {
    //When data is bad, throwing exception is better than displaying half-built component
    expect(function() {
      _.mapToHeaders([['header1', null, 'header3'], ['a', 'b', 'c']]);
    }).to.throw(Error);
  });

  it('Do not throw on false (false is a valid header name)', function () {
    //When data is bad, throwing exception is better than displaying half-built component
    expect(function() {
      _.mapToHeaders([['header1', false, 'header3'], ['a', 'b', 'c']]);
    }).to.not.throw(Error);
  });

  it('Produces expected map when given two basic rows', function () {
    var result = _.mapToHeaders([['a', 'b'], ['c', 'd']]);

    expect(result).to.deep.equal([{a: 'c', b: 'd'}]);
  });

  it('Produces expected map when given two basic rows with spaces and capitals in headers', function () {
    var result = _.mapToHeaders([['a a', 'b b B b', 'Aaa Bbb', 'AaaAaa'], ['c c', 'd D', 'eee', '  ']]);

    expect(result).to.deep.equal([{aA: 'c c', bBBB: 'd D', aaaBbb: 'eee', aaaAaa: '  '}]);
  });
});