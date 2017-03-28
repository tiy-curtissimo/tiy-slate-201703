let TicTacToeGame = require('./src/tic-tac-toe-game');
let fs = require('fs');
let BBPromise = require('bluebird');
let writeFile = BBPromise.promisify(fs.writeFile);

let mkdir = function (path) {
  return new Promise((good, bad) => {
    fs.mkdir(path, err => {
      if (err && err.code !== 'EEXIST') {
        return bad(err);
      }
      good();
    });
  });
};

function makeANewGame() {
  let game = new TicTacToeGame();
  game.play(1, 1);
  return game;
}

let promise = mkdir('./sandwich');
for (let i of [1, 2]) { // Add the chain of file creation twice
  promise = promise
    .then(() => makeANewGame()) // Returns a new TicTacToeGame();
    .then((game) => game.toJson()) // Takes the game -> json
    .then((json) => {   // Build the file name for the data
      return {
        fileName: `./sandwich/${new Date().valueOf()}.json`,
        data: json
      };
    })
    .then(({ fileName, data }) => writeFile(fileName, data));
}
promise.catch(err => console.error(err));

// fs.mkdir('./sandwich', err => {
//   let game = new TicTacToeGame();
//   game.play(1, 1);
//   let json = game.toJson();

//   let fileName = Math.floor(Math.random() * 10000);
//   fs.writeFile(`./sandwich/${fileName}.json`, json, err => {
//     game = new TicTacToeGame();
//     game.play(1, 1);
//     json = game.toJson();

//     fileName = Math.floor(Math.random() * 10000);
//     fs.writeFile(`./sandwich/${fileName}.json`, json, err => {
//       console.log('Thank you, Mr. Rumsfeld.');
//     });
//   });
// });
