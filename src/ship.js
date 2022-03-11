class Ship {
  #hitArr;

  constructor(length) {
    this.length = length;
    this.#hitArr = new Array(length);
    this.#hitArr.fill(false);
  }

  hit(pos) {
    this.#hitArr[pos] = true;
  }

  isHit(pos) {
    return this.#hitArr[pos];
  }
  
  isSunk() {
    return !this.#hitArr.includes(false);
  }
}

export default Ship;
