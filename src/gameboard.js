import Cell from './cell.js';

class Gameboard {
  #board;
  #ships;
  #shipIdCounter;

  constructor(size) {
    this.size = size;
    this.#board = [];
    this.#ships = new Map();
    this.#shipIdCounter = 0;

    for (let i = 0; i < size * size; i += 1) {
      this.#board.push(new Cell());
    }
  }

  canPlaceShip(ship) {
    // check ship fits inside board area.
    if (
      !this.#isValidPosition(ship.start) ||
      !this.#isValidPosition(ship.end)
    ) {
      return false;
    }

    // check ship is not overlapping any other ships.
    for (let i = 0; i < ship.length; i += 1) {
      let anotherShip = this.getShip(
        ship.start.row + (ship.isHorizontal ? 0 : i),
        ship.start.col + (ship.isHorizontal ? i : 0)
      );

      if (anotherShip !== null) {
        return false;
      }
    }

    return true;
  }

  placeShip(ship) {
    if (!this.canPlaceShip(ship)) {
      throw new Error('cannot place ship here');
    }
    let id = this.#nextShipId;

    this.#ships.set(id, ship);

    for (let i = 0; i < ship.length; i += 1) {
      this.#getCell(
        ship.start.row + (ship.isHorizontal ? 0 : i),
        ship.start.col + (ship.isHorizontal ? i : 0)
      ).shipId = id;
    }
  }

  getShip(row, col) {
    let cell = this.#getCell(row, col);

    if (cell.shipId === null) {
      return null;
    }

    return this.#ships.get(cell.shipId);
  }

  get #nextShipId() {
    let result = this.#shipIdCounter;
    this.#shipIdCounter += 1;
    return result;
  }

  #isValidPosition(position) {
    return (
      position.row >= 0 &&
      position.row < this.size &&
      position.col >= 0 &&
      position.col < this.size
    );
  }

  #getCell(row, col) {
    let idx = row * this.size + col;

    return this.#board[idx];
  }
}

export default Gameboard;
