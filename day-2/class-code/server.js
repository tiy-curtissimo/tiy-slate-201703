const path = './sandwich';
let TicTacToeGameRepo = require('./src/tic-tac-toe-game-repo');
let fs = require('fs');
let BBPromise = require('bluebird');
let bodyParser = require('body-parser');
let expressFactoryFunction = require('express');
let nunjucks = require('nunjucks');
let globalGames = [];

let app = expressFactoryFunction();
nunjucks.configure('templates', {
  autoescape: true,
  watch: true,
  express: app
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  console.log('a request went by', req.path);
  next(); // go to the next middleware
});

app.use(function (req, res, next) {
  // if the X-HTTP-METHOD key exists
  // in the request body, then set
  // the method property of the
  // request object to that value
  // all uppercased.
  next();
});

app.use(function (err, req, res, next) {
  console.error('something bad happened', req.path, err);
  next(err);
});

app.post('/:id', (req, res) => {
  let { row, col } = req.body;
  let desc = repo.get(req.params.id);
  if (!desc) {
    return req.redirect('/');
  }
  desc.game.play(Number.parseInt(row), Number.parseInt(col));
  res.redirect(`/${req.params.id}`);
});

app.delete('/:gameIndex', (req, res) => {
  // Delete the game.
  res.redirect('/');
});

app.get('/:id', (req, res) => {
  let desc = repo.get(req.params.id);
  if (!desc) {
    return res.redirect('/');
  }
  res.render('game.html', desc);
});

app.get('/', function (req, res) {
  res.render('index.html', {
    message: 'Hi, Max!',
    descs: repo.getAll()
  });
});

let repo = new TicTacToeGameRepo();
repo
  .init()
  .then(() => process.env.PORT || 8080)
  .then(port => app.listen(port, () => console.log(`Listening to port ${port}`)))
  .catch(console.error);
