import Gameboard from './gameboard.js';

describe('gameboard', () => {
  test('gameboard initialisation', () => {
    let size = 10;
    let g = new Gameboard(size);

    expect(g.size).toBe(10);

    for (let row = 0; row < size; row += 1) {
      for (let col = 0; col < size; col += 1) {
        expect(g.missedAttacks[row][col]).toBe(false);
        expect(g.ships[row][col]).toBe(null);
      }
    }
  });

  test('check correct horizontal ship placement', () => {
    let size = 10;
    let g = new Gameboard(size);

    let length = 3;
    let pos = { row: 3, col: 7 };
    let isHor = true;
    g.placeShip(length, pos, isHor);

    for (let row = 0; row < size; row += 1) {
      for (let col = 0; col < size; col += 1) {
        if (
          row === pos.row &&
          col >= pos.col &&
          col < pos.col + length
        ) {
          expect(g.ships[row][col]).not.toBeNull();
        } else {
          expect(g.ships[row][col]).toBeNull();
        }
      }
    }
  });

  test('check correct vertical ship placement', () => {
    let size = 10;
    let g = new Gameboard(size);

    let length = 5;
    let pos = { row: 2, col: 9 };
    let isHor = false;
    g.placeShip(length, pos, isHor);

    for (let row = 0; row < size; row += 1) {
      for (let col = 0; col < size; col += 1) {
        if (
          row >= pos.row &&
          row < pos.row + length &&
          col === pos.col
        ) {
          expect(g.ships[row][col]).not.toBeNull();
        } else {
          expect(g.ships[row][col]).toBeNull();
        }
      }
    }
  });

  test.todo('check out of bounds ship placement');
  test.todo('receive attack');
  test.todo('all ships sunk');
});
