class Ship {
  #hitsTaken;

  constructor(length) {
    this.length = length;

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
