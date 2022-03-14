import Gameboard from './gameboard.js';
import Ship from './ship.js';

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
    let pos = { row: 3, col: 6 };
    let isHor = true;

    let ship = new Ship(pos, length, isHor);
    g.placeShip(ship);

    for (let row = 0; row < size; row += 1) {
      for (let col = 0; col < size; col += 1) {
        if (row === ship.start.row && col >= ship.start.col && col <= ship.end.col) {
          expect(g.ships[row][col]).toBe(ship);
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

    let ship = new Ship(pos, length, isHor);
    g.placeShip(ship);

    for (let row = 0; row < size; row += 1) {
      for (let col = 0; col < size; col += 1) {
        if (row >= ship.start.row && row <= ship.end.row && col === ship.start.col) {
          expect(g.ships[row][col]).toBe(ship);
        } else {
          expect(g.ships[row][col]).toBeNull();
        }
      }
    }
  });

  test('check out of bounds horizontal ship placement', () => {
    let size = 5;
    let g = new Gameboard(size);

    let length = 3;
    let pos = { row: 3, col: 4 };
    let isHor = true;

    let ship = new Ship(pos, length, isHor);

    expect(() => g.placeShip(ship)).toThrow(
      'ship cannot be placed outside the board'
    );
  });

  test('check out of bounds vertical ship placement', () => {
    let size = 5;
    let g = new Gameboard(size);

    let length = 3;
    let pos = { row: 3, col: 4 };
    let isHor = false;

    let ship = new Ship(pos, length, isHor);

    expect(() => g.placeShip(ship)).toThrow(
      'ship cannot be placed outside the board'
    );
  });

  test('receive attack', () => {
    let size = 5;
    let g = new Gameboard(size);

    let length = 3;
    let pos = { row: 1, col: 4 };
    let isHor = false;

    let ship = new Ship(pos, length, isHor);

    g.placeShip(ship);

    let targetPos = { row: 2, col: 4 };
    g.receiveAttack(targetPos);

    let targetShip = g.ships[targetPos.row][targetPos.col];

    expect(targetShip).toBe(ship);
    expect(targetShip.isHit(targetPos)).toBeTruthy();
    expect(targetShip.isHit({ row: 1, col: 4 })).toBeFalsy();
  });
});
