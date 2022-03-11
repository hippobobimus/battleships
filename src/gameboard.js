import Ship from './ship.js';

class Gameboard {
  constructor(size) {
    this.size = size;
    this.missedAttacks = [];
    this.ships = [];

    for (let r = 0; r < size; r += 1) {
      let missedAttacksRow = [];
      let shipsRow = [];

      for (let c = 0; c < size; c += 1) {
        missedAttacksRow.push(false);
        shipsRow.push(null);
      }

      this.missedAttacks.push(missedAttacksRow);
      this.ships.push(shipsRow);
    }
  }

  placeShip(length, position, isHorizontal) {
    let ship = new Ship(length);

    for (let i = 0; i < length; i += 1) {
      let rowOffset = isHorizontal ? 0 : i;
      let colOffset = isHorizontal ? i : 0;

      this.ships[position.row + rowOffset][position.col + colOffset] = ship;
    }
  }
}

export default Gameboard;
