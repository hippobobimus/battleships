class Ship {
  #hitArr;

  constructor(start, length, isHorizontal) {
    this.start = start;
    this.end = {
      row: start.row + (isHorizontal ? 0 : length),
      col: start.col + (isHorizontal ? length : 0),
    };
    this.length = length;
    this.isHorizontal = isHorizontal;
    this.#hitArr = new Array(length);
    this.#hitArr.fill(false);
  }

  hit(position) {
    if (!this.#isWithinShip(position)) {
      throw new Error(
        `position out of bounds: [${position.row}, ${position.col}]`
      );
    }

    this.#hitArr[this.#getHitArrIdx(position)] = true;
  }

  isHit(position) {
    if (!this.#isWithinShip(position)) {
      throw new Error(
        `position out of bounds: [${position.row}, ${position.col}]`
      );
    }

    return this.#hitArr[this.#getHitArrIdx(position)];
  }

  #isWithinShip(position) {
    return (
      position.row >= this.start.row &&
      position.row <= this.end.row &&
      position.col >= this.start.col &&
      position.col <= this.end.col
    );
  }

  #getHitArrIdx(position) {
    // convert position to local ship coords
    let localPosition = {
      row: position.row - this.start.row,
      col: position.col - this.start.col,
    };

    if (this.isHorizontal) {
      return localPosition.col;
    } else {
      return localPosition.row;
    }
  }

  isSunk() {
    return !this.#hitArr.includes(false);
  }
}

export default Ship;
