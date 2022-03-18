import Cell from './cell.js';
import GameEvent from './game-event.js';
import Position from './position.js';
import Ship from './ship.js';

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

    // events
    this.hitEvent = new GameEvent();
    this.missEvent = new GameEvent();
    this.sunkEvent = new GameEvent();
    this.allShipsSunkEvent = new GameEvent();
  }

  get ships() {
    return Array.from(this.#ships.values());
  }

  canPlaceShip(position, length, isHorizontal) {
    // check ship is not overlapping any other ships and fits inside the board.
    for (let i = 0; i < length; i += 1) {
      let p = new Position(
        position.row + (isHorizontal ? 0 : i),
        position.col + (isHorizontal ? i : 0)
      );

      if (!this.#isValidPosition(p) || this.hasShip(p)) {
        return false;
      }
    }

    return true;
  }

  hasShip(position) {
    return this.#getCell(position).shipId !== null;
  }

  placeShip(position, length, isHorizontal) {
    if (!this.canPlaceShip(position, length, isHorizontal)) {
      throw new Error('cannot place ship here');
    }

    let id = this.#nextShipId;
    let ship = new Ship(position, length, isHorizontal);

    this.#ships.set(id, ship);

    for (let i = 0; i < ship.length; i += 1) {
      let p = new Position(
        position.row + (isHorizontal ? 0 : i),
        position.col + (isHorizontal ? i : 0)
      );

      this.#getCell(p).shipId = id;
    }
  }

  placeShipsRandomly(shipLengths) {
    shipLengths.forEach((length) => {
      let position = this.#randomPosition();
      let isHorizontal = Gameboard.#randomBool();

      while (!this.canPlaceShip(position, length, isHorizontal)) {
        position = this.#randomPosition();
        isHorizontal = Gameboard.#randomBool();
      }

      this.placeShip(position, length, isHorizontal);
    });
  }

  receiveAttack(position) {
    let cell = this.#getCell(position);

    if (cell.attacked) {
      throw new Error('cannot attack the same position again');
    }

    cell.attacked = true;

    if (cell.shipId !== null) {
      this.hitEvent.trigger(position);

      let ship = this.#ships.get(cell.shipId);
      ship.hit();

      if (ship.isSunk()) {
        this.sunkEvent.trigger(ship.position, ship.length, ship.isHorizontal);
        if (this.#allShipsSunk()) {
          this.allShipsSunkEvent.trigger();
        }
      }
    } else {
      this.missEvent.trigger(position);
    }
  }

  get #nextShipId() {
    let result = this.#shipIdCounter;
    this.#shipIdCounter += 1;
    return result;
  }

  static #randomBool() {
    return Math.random() < 0.5;
  }

  #allShipsSunk() {
    for (let i = 0; i < this.ships.length; i += 1) {
      if (!this.ships[i].isSunk()) {
        return false;
      }
    }

    return true;
  }

  #getCell(position) {
    let idx = position.row * this.size + position.col;

    return this.#board[idx];
  }

  #isValidPosition(position) {
    return (
      position.row >= 0 &&
      position.row < this.size &&
      position.col >= 0 &&
      position.col < this.size
    );
  }

  #randomPosition() {
    return new Position(
      Math.floor(Math.random() * this.size),
      Math.floor(Math.random() * this.size)
    );
  }
}

export default Gameboard;
