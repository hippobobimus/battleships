import Gameboard from './gameboard.js';
import Position from './position.js';
import Ship from './ship.js';

describe('gameboard', () => {
  test('gameboard initialisation', () => {
    let size = 10;
    let g = new Gameboard(size);

    expect(g.size).toBe(10);
  });

  test('check horizontal ship placement position', () => {
    let size = 10;
    let g = new Gameboard(size);

    let length = 3;
    let pos = new Position(2, 1);
    let isHor = true;

    let ship = new Ship(pos, length, isHor);
    g.placeShip(ship);

    for (let row = 0; row < size; row += 1) {
      for (let col = 0; col < size; col += 1) {
        let p = new Position(row, col);

        if (
          row === ship.start.row &&
          col >= ship.start.col &&
          col <= ship.end.col
        ) {
          expect(g.getShip(p)).toBe(ship);
        } else {
          expect(g.getShip(p)).toBeNull();
        }
      }
    }
  });

  test('check vertical ship placement position', () => {
    let size = 10;
    let g = new Gameboard(size);

    let length = 4;
    let pos = new Position(1, 3);
    let isHor = false;

    let ship = new Ship(pos, length, isHor);
    g.placeShip(ship);

    for (let row = 0; row < size; row += 1) {
      for (let col = 0; col < size; col += 1) {
        let p = new Position(row, col);

        if (
          row >= ship.start.row &&
          row <= ship.end.row &&
          col === ship.start.col
        ) {
          expect(g.getShip(p)).toBe(ship);
        } else {
          expect(g.getShip(p)).toBeNull();
        }
      }
    }
  });

  test('check out of bounds horizontal ship placement', () => {
    let size = 5;
    let g = new Gameboard(size);

    let length = 3;
    let pos = new Position(3, 4);
    let isHor = true;

    let ship = new Ship(pos, length, isHor);

    expect(() => g.placeShip(ship)).toThrow('cannot place ship here');
  });

  test('check out of bounds vertical ship placement', () => {
    let size = 5;
    let g = new Gameboard(size);

    let length = 3;
    let pos = new Position(3, 4);
    let isHor = false;

    let ship = new Ship(pos, length, isHor);

    expect(() => g.placeShip(ship)).toThrow('cannot place ship here');
  });

  test('receive attack', () => {
    let size = 5;
    let g = new Gameboard(size);

    let length = 3;
    let pos = new Position(1, 4);
    let isHor = false;

    let ship = new Ship(pos, length, isHor);

    g.placeShip(ship);

    let hitPos = new Position(2, 4);
    let missPos = new Position(2, 4);
    g.receiveAttack(hitPos);

    for (let row = 0; row < size; row += 1) {
      for (let col = 0; col < size; col += 1) {
        let p = new Position(row, col);
        let hitState = g.getHitState(p);

        if (row === hitPos.row && col === hitPos.col) {
          expect(hitState).toBe('hit');
        } else if (row === missPos.row && col === missPos.col) {
          expect(hitState).toBe('miss');
        } else {
          expect(hitState).toBe('-');
        }
      }
    }
  });
});
