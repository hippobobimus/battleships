import Player from './player.js';

describe('player', () => {
  test('player initialisation', () => {
    let expected1 = {
      gameboardSize: 5,
      isAi: false,
    };
    let expected2 = {
      gameboardSize: 10,
      isAi: true,
    };

    let p1 = new Player(expected1.gameboardSize, expected1.isAi);
    let p2 = new Player(expected2.gameboardSize, expected2.isAi);

    expect(p1.gameboard.size).toBe(expected1.gameboardSize);
    expect(p1.isAi).toBeFalsy();

    expect(p2.gameboard.size).toBe(expected2.gameboardSize);
    expect(p2.isAi).toBeTruthy();
  });

  test('non-ai players cannot generate an ai move', () => {
    let gameboardSize = 9;
    let isAi = false;

    let p = new Player(gameboardSize, isAi);

    expect(() => p.getAiMove()).toThrow('this is not an ai player');
  });

  test('ai move generation is unique and in bounds', () => {
    let gameboardSize = 5;
    let isAi = true;

    let p = new Player(gameboardSize, isAi);

    let moves = [];

    for (let i = 0; i < gameboardSize * gameboardSize; i += 1) {
      let m = p.getAiMove();

      expect(m.row).toBeGreaterThanOrEqual(0);
      expect(m.row).toBeLessThan(gameboardSize);

      expect(m.col).toBeGreaterThanOrEqual(0);
      expect(m.col).toBeLessThan(gameboardSize);

      expect(
        moves.some((elem) => elem.row === m.row && elem.col === m.col)
      ).toBeFalsy();

      moves.push(m);
    }
  });
});
