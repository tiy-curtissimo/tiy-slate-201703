'use strict';

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

  isFull() {
    return this._state.every(x => x !== 0);
  }

  isEmpty() {
    return this._state.every(x => x === 0);
  }

  get state() {
    return this._state.slice(0);
  }

  set state(value) {
    this._state = value;
  }

  get winner() {
    return this._columnWinner(0) ||
           this._columnWinner(1) ||
           this._columnWinner(2) ||
           this._rowWinner(0) ||
           this._rowWinner(1) ||
           this._rowWinner(2) ||
           this._ldiagWinner() ||
           this._rdiagWinner();
  }

  _ldiagWinner() {
    let diag = [
      this._state[0],
      this._state[4],
      this._state[8]
    ];
    if (diag[0] === diag[1] && diag[1] === diag[2] && diag[0] !== 0) {
      return diag[0];
    }
  }

  _rdiagWinner() {
    let diag = [
      this._state[2],
      this._state[4],
      this._state[6]
    ];
    if (diag[0] === diag[1] && diag[1] === diag[2] && diag[0] !== 0) {
      return diag[0];
    }
  }

  _columnWinner(i) {
    let column = [
      this._state[i],
      this._state[3 + i],
      this._state[6 + i]
    ];
    if (column[0] === column[1] && column[1] === column[2] && column[0] !== 0) {
      return column[0];
    }
  }

  _rowWinner(i) {
    let row = [
      this._state[3 * i],
      this._state[3 * i + 1],
      this._state[3 * i + 2]
    ];
    if (row[0] === row[1] && row[1] === row[2] && row[0] !== 0) {
      return row[0];
    }
  }
}

class Singularity {
  constructor() {
    this._decisionMatrix = [
      [1, 1],
      [0, 1],
      [2, 1],
      [1, 0],
      [1, 2],
      [0, 0],
      [0, 2],
      [2, 0],
      [2, 2]
    ];
  }

  decideMove(board) {
    for (let [row, col] of this._decisionMatrix) {
      if (!board.whatsInThisSpace(row, col)) {
        return [row, col];
      }
    }
    return [undefined, undefined];
  }
}

class TicTacToeGame {
  static fromJson(id, json) {
    let state = JSON.parse(json);
    let game = new TicTacToeGame({ humanFirst: state.humanFirst });
    game._board.state = state.board;

    TicTacToeGame._maxId = Math.max(TicTacToeGame._maxId || -1, id);

    return game;
  }

  static getNextGameId() {
    if (TicTacToeGame._maxId === undefined) {
      TicTacToeGame._maxId = 0;
    }
    TicTacToeGame._maxId += 1;
    return TicTacToeGame._maxId;
  }

  constructor({ humanFirst: hf } = { humanFirst: true }) {
    this._humanIndex = hf ? 1 : 2;
    this._computerIndex = hf ? 2 : 1;
    this.humanFirst = hf;
    this._board = new Board(this.humanFirst);
    this._computer = new Singularity();
    if (!hf) {
      this._letComputerMakeMove();
    }
  }

  play(row, col) {
    this._board.mark(this._humanIndex, row, col);
    this._letComputerMakeMove();
  }

  get board() {
    return this._board;
  }

  isOver() {
    return this.board.winner !== undefined || this._board.isFull();
  }

  get winner() {
    return this.board.winner;
  }

  toJson() {
    return JSON.stringify({
      isOver: this.isOver(),
      winner: this.winner || null,
      humanFirst: this.humanFirst,
      board: this._board.state
    });
  }

  _letComputerMakeMove() {
    if (this._board.winner === undefined) {
      let [row, col] = this._computer.decideMove(this._board);
      if (row !== undefined && col !== undefined) {
        this._board.mark(this._computerIndex, row, col);
      }
    }
  }
}

module.exports = TicTacToeGame;
