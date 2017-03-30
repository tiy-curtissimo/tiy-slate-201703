let TicTacToeGameRepo = require('./lib/tic-tac-toe-game-repo'),
    runner = require('./app'),
    express = require('express'),
    repo = new TicTacToeGameRepo(),
    app = express();

runner.configure(repo, app)
  .init()
  .then(() => process.env.PORT || 8080)
  .then(port => app.listen(port, () => console.log(`Listening to port ${port}`)))
  .catch(console.error);
