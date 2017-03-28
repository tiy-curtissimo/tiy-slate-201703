var jsdom = require("jsdom");
function getWindow(cb) {
  jsdom.env(
    '<p><a class="the-link" href="https://github.com/tmpvar/jsdom">jsdom!</a></p>',
    ["http://code.jquery.com/jquery.js"],
    function (errors, window) {
      global.window = window;
      window.nunjucks = nunjucks;
      cb(errors, window);
    }
  );
}

var expect = require('chai').expect;
global.nunjucks = require('nunjucks');

describe('Nunjucks for Karma Adapter', function () {
  var adapter, env;

  before(function (done) {
    getWindow(function (err, window) {
      if (window) {
        adapter = require('../adapter.js');
        env = new nunjucks.Environment();
        done();
      }
    });
  });

  it('should throw exception when preprocessor has not been run', function () {
    window.__html__ = void 0;
    expect(function() { env.getPreprocessedTemplate('test') }).to.throw(Error);
  });

  it('should throw exception for template that does not exist', function () {
    window.__html__ = {};
    expect(function() { env.getPreprocessedTemplate('test') }).to.throw(Error);
  });

  it('should get preprocessed template that exists', function () {
    window.__html__ = {
      'test': 'some test'
    };
    var template = env.getPreprocessedTemplate('test');
    expect(template.render()).to.equal('some test');
  });

  it('should get preprocessed template that exists', function () {
    window.__html__ = {
      'test': '  {{ content }}  '
    };
    var template = env.getPreprocessedTemplate('test');
    expect(template.render({content: "some content"})).to.equal('  some content  ');
  });

  it('should create mock filter', function () {
    var mockFilter = function () {};
    env.mockFilter('test', mockFilter);
    expect(env.getFilter('test')).to.equal(mockFilter);
  })
});

