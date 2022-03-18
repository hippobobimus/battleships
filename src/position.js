class Position {
  constructor(row, col) {
    this.row = row;
    this.col = col;
  }

  static random(boardSize) {
    let row = Math.floor(Math.random() * boardSize);
    let col = Math.floor(Math.random() * boardSize);

    return new Position(row, col);
  }
}

export default Position;
