(function () {
  'use strict';
  let list = new List('repo-list');
  let search = new Search('search-box');

  search.on('autocomplete', function () {
    new GitHub()
      .searchUsers(search.value)
      .then(data => {
        search.completions = data
          .items
          .map(item => item.login);
      });
  });
  search.on('change', function () {
    let gh = new GitHub();
    if (search.value) {
      gh
        .reposForUser(search.value)
        .then(data => list.renderData(data));
    } else {
      gh
        .repos()
        .then(data => list.renderData(data));
    }
  });
  document.body.appendChild(search.render());

  list.on('itemRendering', e => {
    let repo = e.detail.data;
    e.detail.html = `<div class="repo-entry">
      <h1 class="repo-entry-title">
        <a href="${repo.html_url}">
          ${repo.full_name}
        </a>
      </h1>
      <div class="repo-entry-description">
        ${repo.description}
      </div>
    </div>`;
  });
  document.body.appendChild(list.render());
  new GitHub().repos().then(data => list.renderData(data));
})();