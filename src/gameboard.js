class Gameboard {
  constructor(size) {
    this.size = size;
    this.missedAttacks = new Array(size).fill(new Array(size).fill(false));
    this.ships = new Array(size).fill(new Array(size).fill(null));
  }
}

export default Gameboard;
