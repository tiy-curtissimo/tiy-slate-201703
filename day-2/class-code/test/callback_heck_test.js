let TicTacToeGame = require('../src/tic-tac-toe-game'),
    expect = require('chai').expect;

describe('Tic Tac Toe Game', () => {
  it ('should record my move', () => {
    let game = new TicTacToeGame();
    let board = game.board;
    let col = Math.floor(Math.random() * 3);
    let row = Math.floor(Math.random() * 3);

    game.play(row, col); // zero-based; 0, 0 bottom-left

    expect(board.whatsInThisSpace(row, col)).to.equal(1);
  });

  it ('after the human plays first, the computer makes a move', () => {
    let game = new TicTacToeGame();
    let board = game.board;
    game.play(0, 0);
    let player2MoveFound = false;

    for (let i = 0; i < 3 && !player2MoveFound; i += 1) {
      for (let j = 0; j < 3 && !player2MoveFound; j += 1) {
        let spaceValue = board.whatsInThisSpace(i, j);
        player2MoveFound = spaceValue === 2;
      }
    }

    expect(player2MoveFound).to.equal(true);
    expect(board.whatsInThisSpace(0, 0)).to.equal(1);
  });

  it ('should default to human playing first', () => {
    let game = new TicTacToeGame();

    expect(game.humanFirst).to.equal(true);
  });

  it ('should respect the value passed in for human playing first', () => {
    let game = new TicTacToeGame({ humanFirst: true });
    expect(game.humanFirst).to.equal(true);

    game = new TicTacToeGame({ humanFirst: false });
    expect(game.humanFirst).to.equal(false);
  });

  it ('should have a non-empty board if the human is not first', function () {
    // ARRANGE
    let game = new TicTacToeGame({ humanFirst: false });

    // ACT
    let board = game.board;

    // ASSERT
    expect(board.isEmpty()).to.equal(false);
  });

  it ('should have an empty board at the beginning if the human is first', () => {
    let game = new TicTacToeGame();

    let board = game.board;

    expect(board.isEmpty()).to.equal(true);
  });
});
