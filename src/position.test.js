import Position from './position.js';

describe('position', () => {
  test('random position generation within given board size', () => {
    let boardSize = 10;

    for (let i = 0; i < 1000; i += 1) {
      let p = Position.random(boardSize);

      expect(p.row).toBeGreaterThanOrEqual(0);
      expect(p.row).toBeLessThan(boardSize);

      expect(p.col).toBeGreaterThanOrEqual(0);
      expect(p.col).toBeLessThan(boardSize);
    }
  });
});
