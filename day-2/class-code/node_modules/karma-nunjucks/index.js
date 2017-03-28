var path = require('path');

var createPattern = function(path) {
  return {pattern: path, included: true, served: true, watched: false};
};

var framework = function(files) {
  var nunjucksPath = path.dirname(require.resolve('nunjucks')) + '/browser/nunjucks.js';
  files.unshift(createPattern(path.join(__dirname, 'adapter.js')));
  files.unshift(createPattern(nunjucksPath));
};

framework.$inject = ['config.files'];

module.exports = {
  'framework:nunjucks': ['factory', framework]
};