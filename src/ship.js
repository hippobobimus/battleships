import Position from './position.js';

class Ship {
  #hitArr;

  constructor(start, length, isHorizontal) {
    this.start = start;
    this.length = length;
    this.isHorizontal = isHorizontal;
    this.end = new Position(
      start.row + (isHorizontal ? 0 : length),
      start.col + (isHorizontal ? length : 0)
    );
    this.#hitArr = new Array(length);
    this.#hitArr.fill(false);
  }

  hit(position) {
    if (!this.#isWithinShip(position)) {
      throw new Error(
        `position out of bounds: [${position.row}, ${position.col}]`
      );
    }

    this.#hitArr[this.#positionToIndex(position)] = true;
  }

  isHit(position) {
    if (!this.#isWithinShip(position)) {
      throw new Error(
        `position out of bounds: [${position.row}, ${position.col}]`
      );
    }

    return this.#hitArr[this.#positionToIndex(position)];
  }

  #isWithinShip(position) {
    return (
      position.row >= this.start.row &&
      position.row <= this.end.row &&
      position.col >= this.start.col &&
      position.col <= this.end.col
    );
  }

  #positionToIndex(position) {
    // position is assumed to be within ship.
    return position.row - this.start.row + position.col - this.start.col;
  }

  isSunk() {
    return !this.#hitArr.includes(false);
  }
}

export default Ship;
