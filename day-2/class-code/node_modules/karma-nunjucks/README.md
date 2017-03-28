karma-nunjucks
===========

Nunjucks for Karma

Uses html2js preprocessor ("karma-html2js-preprocessor") or an ordinary template string to compile nunjucks templates
using any version of nunjucks.

[![Build Status](https://travis-ci.org/TakenPilot/karma-nunjucks.svg?branch=master)](https://travis-ci.org/TakenPilot/karma-nunjucks)

[![Code Climate](https://codeclimate.com/github/TakenPilot/karma-nunjucks/badges/gpa.svg)](https://codeclimate.com/github/TakenPilot/karma-nunjucks)

[![Coverage Status](https://coveralls.io/repos/TakenPilot/karma-nunjucks/badge.png?branch=master)](https://coveralls.io/r/TakenPilot/karma-nunjucks?branch=master)

[![Dependencies](https://david-dm.org/TakenPilot/karma-nunjucks.svg?style=flat)](https://david-dm.org/TakenPilot/karma-nunjucks.svg?style=flat)

[![NPM version](https://badge.fury.io/js/general-markov.svg)](http://badge.fury.io/js/general-markov)


##Basic Example

Nunjucks is now available to your tests.

```javascript

describe("nunjucks example test", function () {
    var template;

    before(function () {
        template = nunjucks.compile('<div class="{{ thing }}"></div>');
    })

    it('Thing has class', function () {
        var result = template.render({thing: "something"});
        document.body.innerHTML += result;
        expect(document.querySelector('.something')).to.exist;
    });;    
});

```

##Example with templates

A new convenience method is available in nunjucks environments to make templates available 
called `getPreprocessedTemplate`.

```javascript

describe("nunjucks example test", function () {
    var template, env;

    before(function () {
        env = new nunjucks.Environment();
        template = env.getPreprocessedTemplate('index.html');
    })

    it('Thing has class', function () {
        var result = template.render({thing: "something"});
        document.body.innerHTML += result;
        expect(document.querySelector('.something')).to.exist;
    });

    it('Thing has widget class', function () {
        var $el = $(template.render({widget: {items: []}}));
        var thing = new Thing($el);
        expect($el.find('.widget').length).to.equal(1);
    });

    it('Thing has widget class', function () {
        var $el = $(template.render({widget: {items: [{label: "Item 1", tag: "itemTag"}]}}));
        var thing = new Thing($el);
        expect($el.find('.widget').find('li[data-filter]').length).to.equal(1);
    });
});

```

##Example with mocked filters

Sometimes it's useful to mock filters that access the disk or other resources.  Use `mockFilter`.

```javascript

describe("nunjucks example test", function () {
    var template, env;

    before(function () {
        env = new nunjucks.Environment();
        
        //this has a filter called test
        template = env.getPreprocessedTemplate('index.html'); 
    })

    it('Thing has widget class', function () {
        var noop = function () { return 'test string' };
        env.mockFilter('test', noop); //mock the filter
        expect(template.render()).to.contain('test string');
    });
});

```
