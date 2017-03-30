let bodyParser = require('body-parser');
let expressFactoryFunction = require('express');
let nunjucks = require('nunjucks');

exports.configure = function configure(repo, app) {
  nunjucks.configure('templates', {
    autoescape: true,
    watch: true,
    express: app
  });

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(function (req, res, next) {
    if (req.body && req.body['X-HTTP-METHOD']) {
      req.method = req.body['X-HTTP-METHOD'].toUpperCase();
    }
    next();
  });

  app.use(function requestLogger(req, res, next) {
    console.log('a request went by', req.method, req.path);
    next();
  });

  app.post('/:id', (req, res) => {
    let desc = repo.get(req.params.id);
    if (!desc) {
      return req.redirect('/');
    }

    let { row, col } = req.body;
    row = Number.parseInt(row);
    col = Number.parseInt(col);
    desc.game.play(row, col);
    repo.update(desc)
      .then(() => res.redirect(`/${req.params.id}`))
      .catch(() => res.redirect('/'));
  });

  app.delete('/:id', (req, res) => {
    let desc = repo.get(req.params.id);
    if (!desc) {
      return res.redirect('/');
    }

    repo.destroy(desc)
      .then(() => res.redirect('/'))
      .catch(() => res.redirect('/'));
  });

  app.get('/:id', (req, res) => {
    let desc = repo.get(req.params.id);
    if (!desc) {
      return res.redirect('/');
    }
    res.render('game.html', desc);
  });

  app.post('/', function (req, res) {
    repo.create(true)
      .then(desc => res.redirect(`/${ desc.id }`))
      .catch(() => res.redirect('/'));
  });

  app.get('/', function (req, res) {
    res.render('index.html', {
      message: 'Hi, Max!',
      descs: repo.getAll()
    });
  });

  return repo;
};
