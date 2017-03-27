class GitHub {
  constructor() {
    this._token = '9f416ae726d490ec1af988533c3629fcfd796cb1';
  }
  reposForUser(user) {
    let uri = `https://api.github.com/users/${user}/repos?access_token=${this._token}`;
    return this._get(uri);
  }

  repos() {
    let uri = `https://api.github.com/repositories?access_token=${this._token}`;
    return this._get(uri);
  }

  searchUsers(partial) {
    let uri = `https://api.github.com/search/users?q=${partial}+in:login&access_token=${this._token}`;
    return this._get(uri);
  }

  _get(uri) {
    return {
      then: function (callback) {
        new Ajax(uri)
          .then(callback)
          .get();
      }
    };
  }
}