# lodash-ny-util
Lodash mixin for generic list, map, string functionality.

[![Build Status](https://travis-ci.org/nymag/lodash-ny-util.svg?branch=master)](https://travis-ci.org/nymag/lodash-ny-util)
[![Code Climate](https://codeclimate.com/github/nymag/lodash-ny-util/badges/gpa.svg)](https://codeclimate.com/github/nymag/lodash-ny-util)

## Install

```
npm install --save lodash-ny-util
```

## Usage

```js
_.mixin(require('lodash-ny-util'));
```

## API

### mapToHeaders

Maps the first row to become the property names of every following row, returning a list of maps.

```js
_.mapToHeaders([['a', 'b'], ['c', 'd'], ['e', 'f']]);
//becomes [{a: 'c', b: 'd'}, {a: 'e', b: 'f'}]
```

### promise

Shorthand for using lodash functions with A+ Promise's `.then` function

```js
return Promise.resolve(thing).then(_.promise(_.indexBy)('name')))
```

```js
return Promise.resolve(thing).then(_.promise('indexBy')('name')))
```

```js
return Promise.resolve(thing).then(_.promise(_.indexBy, 'name')))
```

```js
return Promise.resolve(thing).then(_.promise('indexBy', 'name')))
```

### invertKeys

Takes an object that contains other objects, and flips the keys of the object and the inner object.

```js
_.invertKeys({a: {b: 'c', d: 'e'}, f: {g: 'h', i: 'j'}})
//becomes {b: {a: 'c'}, d: {a: 'e'}, g: {f: 'h'}, i: {f: 'j'}}
```

### listDeepObjects

Takes an object, and returns every object inside that object.

```js
_.listDeepObjects({a:{b:{c:{d:'e'}}, f:{g:{h:'e'}}}})
// becomes:
//  [
//    { b: { c: { d: 'e' } }, f: { g: { h: 'e' } } },
//    { c: { d: 'e' } },
//    { g: { h: 'e' } },
//    { h: 'e' },
//    { d: 'e' },
//  ]
```

Optionally takes a filter:

```js
_.listDeepObjects({a:{b:{c:{d:'e'}}, f:{d:{g:'e'}}}}, 'd');
//becomes [ { d: { g: 'e' } }, { d: 'e' } ]
```

```js
_.listDeepObjects({a: {type:'yarn'}, b: {c: {type:'sweater'}}}, function (obj) { return !!obj.type; });
//becomes [ { type: 'yarn' }, { type: 'sweater' } ]
```
