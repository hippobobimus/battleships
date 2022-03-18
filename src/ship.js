class Ship {
  #hitsTaken;

  constructor(position, length, isHorizontal) {
    this.position = position;
    this.length = length;
    this.isHorizontal = isHorizontal;

    this.#hitsTaken = 0;
  }

  hit() {
    if (this.isSunk()) {
      throw new Error('already sunk!');
    }

    this.#hitsTaken += 1;
  }

  get hits() {
    return this.#hitsTaken;
  }

  isSunk() {
    return this.#hitsTaken >= this.length;
  }
}

export default Ship;
