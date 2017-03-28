(function(window) {

  window.nunjucks.Environment.prototype.getPreprocessedTemplate = function (path) {
    if (!window.__html__) {
      throw new Error('html2js preprocessor is required for template files');
    } else if (!window.__html__[path]) {
      throw new Error('nunjucks template does not exist');
    } else {
      return nunjucks.compile(window.__html__[path], this);
    }
  };

  window.nunjucks.Environment.prototype.mockFilter = function (name, fn) {
    this.addFilter(name, fn || function () { return '' });
  };

})(window);
