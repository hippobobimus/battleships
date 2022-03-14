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

  placeShip(ship) {
    if (!this.#isValidShipPlacement(ship)) {
      throw new Error('ship cannot be placed outside the board');
    }

    for (let row = ship.start.row; row <= ship.end.row; row += 1) {
      for (let col = ship.start.col; col <= ship.end.col; col += 1) {
        this.ships[row][col] = ship;
      }
    }
  }

  receiveAttack(position) {
    this.ships[position.row][position.col].hit(position);
  }

  #isValidShipPlacement(ship) {
    return (this.#isValidPosition(ship.start) && this.#isValidPosition(ship.end));
  }

  #isValidPosition(position) {
    return (
      position.row >= 0 &&
      position.row < this.size &&
      position.col >= 0 &&
      position.col < this.size
    );
  }
}

export default Gameboard;
