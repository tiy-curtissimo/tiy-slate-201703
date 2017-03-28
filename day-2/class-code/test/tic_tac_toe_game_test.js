let TicTacToeGame = require('../src/tic-tac-toe-game'),
    expect = require('chai').expect;

describe('Tic Tac Toe Game', () => {
  it ('should return a JSONy object representation', () => {
    let game = new TicTacToeGame();
    game._board._state = [1, 2, 1,
                          2, 0, 0,
                          0, 2, 1];

    let jsony = JSON.parse(game.toJson());

    expect(jsony).to.deep.equal({
      isOver: false,
      winner: null,
      humanFirst: true,
      board: [1, 2, 1, 2, 0, 0, 0, 2, 1]
    });
  });

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

  it ('should not be empty after the first human move', () => {
    let game = new TicTacToeGame();
    let board = game.board;

    game.play(0, 0);

    expect(board.isEmpty()).to.equal(false);
  });

  it ('should not be empty after the first computer move', () => {
    let game = new TicTacToeGame({ humanFirst: false });
    let board = game.board;

    expect(board.isEmpty()).to.equal(false);
  });

  it ('should not be over after a couple of moves', () => {
    let game = new TicTacToeGame();

    game.play(2, 1);

    expect(game.isOver()).to.equal(false);
    expect(game.winner).to.equal(undefined);
  });

  it ('should end when the board is full', () => {
    let game = new TicTacToeGame();
    game._board._state = [1, 1, 2,
                          2, 2, 1,
                          1, 0, 2];

    game.play(2, 1);
    expect(game.isOver()).to.equal(true);
    expect(game.winner).to.equal(undefined);
  });

  it ('should end when the human wins', () => {
    let game = new TicTacToeGame();
    game._board._state = [1, 0, 2,
                          1, 0, 2,
                          0, 0, 0];

    game.play(2, 0);

    expect(game.isOver()).to.equal(true);
    expect(game.winner).to.equal(1);
  });

  it ('should end when the computer wins', () => {
    let game = new TicTacToeGame({ humanFirst: false });
    game._board._state = [1, 1, 2,
                          2, 1, 2,
                          1, 0, 0 ];

    game.play(2, 1);

    expect(game.isOver()).to.equal(true);
    expect(game.winner).to.equal(1);
  });

  it ('computer does not move after human wins', () => {
    let game = new TicTacToeGame({ humanFirst: false });
    game._board._state = [2, 2, 0,
                          0, 0, 0,
                          0, 0, 0 ];

    game.play(0, 2);

    expect(game._board._state.some(x => x === 1)).to.equal(false);
  });
});
