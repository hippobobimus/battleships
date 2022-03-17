import Gameboard from './gameboard.js';
import Position from './position.js';

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

    g.placeShip(pos, length, isHor);

    for (let row = 0; row < size; row += 1) {
      for (let col = 0; col < size; col += 1) {
        let p = new Position(row, col);

        if (row === 2 && col >= 1 && col <= 3) {
          expect(g.hasShip(p)).toBeTruthy();
        } else {
          expect(g.hasShip(p)).toBeFalsy();
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

    g.placeShip(pos, length, isHor);

    for (let row = 0; row < size; row += 1) {
      for (let col = 0; col < size; col += 1) {
        let p = new Position(row, col);

        if (row >= 1 && row <= 4 && col === 3) {
          expect(g.hasShip(p)).toBeTruthy();
        } else {
          expect(g.hasShip(p)).toBeFalsy();
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

    expect(() => g.placeShip(pos, length, isHor)).toThrow(
      'cannot place ship here'
    );
  });

  test('check out of bounds vertical ship placement', () => {
    let size = 5;
    let g = new Gameboard(size);

    let length = 3;
    let pos = new Position(3, 4);
    let isHor = false;

    expect(() => g.placeShip(pos, length, isHor)).toThrow(
      'cannot place ship here'
    );
  });

  test('check overlapping ship placement', () => {
    let size = 10;
    let g = new Gameboard(size);

    let length = 3;
    let pos = new Position(3, 4);
    let isHor = false;

    g.placeShip(pos, length, isHor);
    expect(() => g.placeShip(pos, length, isHor)).toThrow(
      'cannot place ship here'
    );
  });

  test('receive hit and miss attacks', () => {
    let size = 5;
    let g = new Gameboard(size);

    let length = 3;
    let pos = new Position(1, 4);
    let isHor = false;

    g.placeShip(pos, length, isHor);

    let hitPos = new Position(2, 4);
    let missPos = new Position(2, 5);

    // mock handlers
    let hitHandler = jest.fn();
    let missHandler = jest.fn();
    let sunkHandler = jest.fn();

    g.hitEvent.addHandler(hitHandler);
    g.missEvent.addHandler(missHandler);
    g.sunkEvent.addHandler(sunkHandler);

    expect(hitHandler).not.toHaveBeenCalled();
    expect(missHandler).not.toHaveBeenCalled();
    expect(sunkHandler).not.toHaveBeenCalled();

    g.receiveAttack(hitPos);

    expect(hitHandler.mock.calls.length).toBe(1);
    expect(hitHandler).toHaveBeenCalledWith(hitPos);
    expect(missHandler).not.toHaveBeenCalled();
    expect(sunkHandler).not.toHaveBeenCalled();

    g.receiveAttack(missPos);

    expect(hitHandler.mock.calls.length).toBe(1);
    expect(missHandler.mock.calls.length).toBe(1);
    expect(missHandler).toHaveBeenCalledWith(missPos);
    expect(sunkHandler).not.toHaveBeenCalled();
  });

  test('sink ship', () => {
    let size = 5;
    let g = new Gameboard(size);

    let length = 3;
    let pos = new Position(1, 4);
    let isHor = false;

    g.placeShip(pos, length, isHor);

    // mock handlers
    let hitHandler = jest.fn();
    let missHandler = jest.fn();
    let sunkHandler = jest.fn();

    g.hitEvent.addHandler(hitHandler);
    g.missEvent.addHandler(missHandler);
    g.sunkEvent.addHandler(sunkHandler);

    expect(hitHandler).not.toHaveBeenCalled();
    expect(missHandler).not.toHaveBeenCalled();
    expect(sunkHandler).not.toHaveBeenCalled();

    for (let i = 0; i < length; i += 1) {
      let p = new Position(pos.row + i, pos.col);

      g.receiveAttack(p);

      expect(hitHandler.mock.calls.length).toBe(i + 1);
      expect(hitHandler).toHaveBeenCalledWith(p);
      expect(missHandler).not.toHaveBeenCalled();
      if (i < length - 1) {
        expect(sunkHandler).not.toHaveBeenCalled();
      } else {
        expect(sunkHandler.mock.calls.length).toBe(1);
      }
    }
  });

  test("same position can't be hit twice", () => {
    let size = 5;
    let g = new Gameboard(size);

    let length = 3;
    let pos = new Position(1, 4);
    let isHor = false;

    g.placeShip(pos, length, isHor);

    let attackPos = new Position(1, 4);
    g.receiveAttack(attackPos);

    expect(() => g.receiveAttack(attackPos)).toThrow(
      'cannot attack the same position again'
    );
  });

  test('all ships sunk', () => {
    let size = 10;
    let g = new Gameboard(size);

    // mock handlers
    let allShipsSunkHandler = jest.fn();
    let oneShipSunkHandler = jest.fn();

    g.allShipsSunkEvent.addHandler(allShipsSunkHandler);
    g.sunkEvent.addHandler(oneShipSunkHandler);

    g.placeShip(new Position(0, 0), 3, false);
    g.placeShip(new Position(1, 2), 2, true);
    g.placeShip(new Position(0, 4), 1, true);

    expect(allShipsSunkHandler).not.toHaveBeenCalled();
    expect(oneShipSunkHandler).not.toHaveBeenCalled();

    // sink ships
    for (let row = 0; row < 3; row += 1) {
      g.receiveAttack(new Position(row, 0));
    }

    expect(oneShipSunkHandler.mock.calls.length).toBe(1);
    expect(allShipsSunkHandler).not.toHaveBeenCalled();

    for (let col = 2; col < 4; col += 1) {
      g.receiveAttack(new Position(1, col));
    }

    expect(oneShipSunkHandler.mock.calls.length).toBe(2);
    expect(allShipsSunkHandler).not.toHaveBeenCalled();

    for (let col = 4; col < 5; col += 1) {
      g.receiveAttack(new Position(0, col));
    }

    expect(oneShipSunkHandler.mock.calls.length).toBe(3);
    expect(allShipsSunkHandler.mock.calls.length).toBe(1);
  });
});
