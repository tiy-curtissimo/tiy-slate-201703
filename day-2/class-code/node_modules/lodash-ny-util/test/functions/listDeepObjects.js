'use strict';

var _ = require('lodash'),
  expect = require('chai').expect;

describe('listDeepObjects', function () {

  before(function () {
    _.mixin(require('../../lodash-ny-util'));
  });


  it('listDeepObjects gets all deep objects', function () {
    var result = _.listDeepObjects({a:{b:{c:{d:'e'}}, f:{g:{h:'e'}}}});

    expect(result).to.have.length(5);
  });

  it('listDeepObjects can filter by existence of properties', function () {
    var result = _.listDeepObjects({a:{b:{c:{d:'e'}}, f:{d:{g:'e'}}}}, 'd');

    expect(result).to.have.length(2);
  });

  it('listDeepObjects can filter by component', function () {
    var result = _.listDeepObjects({a: {type:'yarn'}, b: {c: {type:'sweater'}}}, function (obj) { return !!obj.type; });

    expect(result).to.deep.equal([
      {type:'yarn'},
      {type:'sweater'}
    ]);
  });
});