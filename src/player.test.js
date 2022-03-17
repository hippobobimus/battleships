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
    expect(p1.isAi).toBeFalsy;

    expect(p2.gameboard.size).toBe(expected2.gameboardSize);
    expect(p2.isAi).toBeTruthy;
  });
});
