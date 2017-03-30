let Promise = require('bluebird'),
    fs = require('fs'),
    path = require('path'),
    TicTacToeGame = require('./tic-tac-toe-game'),
    readdir = Promise.promisify(fs.readdir),
    readfile = Promise.promisify(fs.readFile),
    writefile = Promise.promisify(fs.writeFile),
    unlinkfile = Promise.promisify(fs.unlink);

class TicTacToeGameRepository {
  constructor(path = './sandwich') {
    this._path = path;
  }

  init() {
    return readdir(`${this._path}`)
      .map(file => Promise.props({
        id: Number.parseInt(path.basename(file, '.json')),
        json: readfile(path.join(this._path, file), 'utf8')
      }))
      .map(({id, json}) => ({
        game: TicTacToeGame.fromJson(json),
        id: id
      }))
      .then(descs => this._descs = descs);
  }

  getAll() {
    return this._descs;
  }

  get(id) {
    id = Number.parseInt(id);
    return this._descs
      .find(desc => desc.id === id);
  }

  create(humanFirst) {
    let desc = {
      id: new Date().valueOf(),
      game: new TicTacToeGame({ humanFirst })
    };
    return writefile(this._filename(desc), desc.game.toJson())
      .then(() => this._descs.push(desc));
  }

  update(desc) {
    return writefile(this._filename(desc), desc.game.toJson());
  }

  destroy(desc) {
    return unlinkfile(this._filename(desc))
      .then(() => this._descs.findIndex(d => d.id === desc.id))
      .then(i => this._descs = this._descs.splice(i, 1));
  }

  _filename(desc) {
    return path.join(this._path, `${desc.id}.json`);
  }
}

module.exports = TicTacToeGameRepository;
