/*
  var ajax = new Ajax(...);
  ajax
    .then(function (data) { return changed data })   // All 200s
    .then(function (changed data) {})
    .catch(fn)  // 404, no internet connection
    .get();
*/
class Ajax {
  constructor(url) {
    this._url = url;
    this._thenChain = [];
    this._catchChain = [];
  }

  then(fn) {
    this._thenChain.push(fn);
    return this;
  }

  catch(fn) {
    this._catchChain.push(fn);
    return this;
  }

  get() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', this._url, true);

    xhr.addEventListener('readystatechange', () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status >= 200 && xhr.status < 300) {
          var data = JSON.parse(xhr.responseText);
          this._thenChain.forEach(function (callback) {
            data = callback(data);
          });
        } else if (xhr.status >= 400) {
          var err = {
            code: xhr.status,
            body: xhr.responseText,
            message: xhr.statusText
          };
          this._catchChain.forEach(function (callback) {
            err = callback(err);
          });
        }
      }
    });

    xhr.send();
  }
}
