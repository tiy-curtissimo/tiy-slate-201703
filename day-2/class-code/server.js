const path = './sandwich';
let TicTacToeGame = require('./src/tic-tac-toe-game');
let fs = require('fs');
let BBPromise = require('bluebird');
let bodyParser = require('body-parser');
let readdir = BBPromise.promisify(fs.readdir);
let readFile = BBPromise.promisify(fs.readFile);
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

app.use(function (err, req, res, next) {
  console.error('something bad happened', req.path, err);
  next(err);
});

app.post('/:gameIndex', (req, res) => {
  let { row, col } = req.body;
  let gameIndex = req.params.gameIndex;
  globalGames[gameIndex]
    .play(Number.parseInt(row), Number.parseInt(col));
  res.redirect(`/${gameIndex}`);
});

app.get('/:gameIndex', (req, res) => {
  let gameIndex = req.params.gameIndex - 0;
  if (Number.isNaN(gameIndex) || !globalGames[gameIndex]) {
    return res.redirect('/');
  }
  res.render('game.html', {
    game: globalGames[gameIndex],
    gameIndex: gameIndex
  });
});

app.get('/', function (req, res) {
  res.render('index.html', {
    message: 'Hi, Max!',
    games: globalGames
  });
});

readdir(path)
  .map(file => readFile(`${path}/${file}`, "utf-8"))
  .map(gameJson => TicTacToeGame.fromJson(gameJson))
  .then(gameList => {
    let port = process.env.PORT || 8080;
    globalGames = gameList;
    app.listen(port, () => console.log('Listening to port 8080'));
  })
  .catch(err => console.log(err));
