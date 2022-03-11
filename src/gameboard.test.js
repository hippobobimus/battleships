import Gameboard from './gameboard.js';

describe('gameboard', () => {
  test.only('gameboard initialisation', () => {
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

  test.todo('horizontal ship placement');
  test.todo('vertical ship placement');
  test.todo('receive attack');
  test.todo('all ships sunk');
});
