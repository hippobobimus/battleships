import Gameboard from './gameboard.js';

class Player {
  constructor(gameboardSize, isAi) {
    this.gameboard = new Gameboard(gameboardSize);
    this.isAi = isAi;
  }
}

export default Player;
