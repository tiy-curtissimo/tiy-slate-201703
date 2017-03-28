class Board {
  constructor(empty) {
    this._empty = empty;
    this._state = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  }

  mark(player, row, col) {
    this._state[row * 3 + col] = player;
  }

  whatsInThisSpace(row, col) {
    return this._state[row * 3 + col];
  }

  isEmpty() {
    return this._empty;
  }
}

class TicTacToeGame {
  constructor({ humanFirst: hf } = {}) {
    this.humanFirst = (hf === undefined)? true : hf;
    this._board = new Board(this.humanFirst);
  }

  play(row, col) {
    this._board.mark(1, row, col);
  }

  get board() {
    return this._board;
  }
}

module.exports = TicTacToeGame;
