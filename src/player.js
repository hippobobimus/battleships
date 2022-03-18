import Gameboard from './gameboard.js';
import Position from './position.js';

class Player {
  #previousMoves;

  constructor(gameboardSize, isAi) {
    this.gameboard = new Gameboard(gameboardSize);
    this.isAi = isAi;

    this.#previousMoves = [];
  }

  getAiMove() {
    if (!this.isAi) {
      throw Error('this is not an ai player');
    }

    let result = Position.random(this.gameboard.size);

    while (this.#isRepeatedMove(result)) {
      result = Position.random(this.gameboard.size);
    }

    this.#previousMoves.push(result);

    return result;
  }

  #isRepeatedMove(position) {
    return this.#previousMoves.some(
      (prev) => prev.row === position.row && prev.col === position.col
    );
  }
}

export default Player;
