import Position from './position.js';
import Ship from './ship.js';

describe('ship', () => {
  test('check ship instantiation', () => {
    let expected = {
      id: Math.floor(Math.random() * 1000),
      start: new Position(2, 4),
      length: 9,
      isHorizontal: true,
    };

    let s = new Ship(
      expected.id,
      expected.start,
      expected.length,
      expected.isHorizontal
    );

    expect(s.id).toBe(expected.id);
    expect(s.start).toBe(expected.start);
    expect(s.length).toBe(expected.length);
    expect(s.isHorizontal).toBe(expected.isHorizontal);
  });

  test('check correct position is hit (horizontal ship)', () => {
    let params = {
      id: Math.floor(Math.random() * 1000),
      start: new Position(4, 2),
      length: 5,
      isHorizontal: true,
    };
    let s = new Ship(
      params.id,
      params.start,
      params.length,
      params.isHorizontal
    );

    let hitPos = new Position(4, 3);
    s.hit(hitPos);

    for (let col = s.start.col; col <= s.end.col; col += 1) {
      let pos = new Position(s.start.row, col);

      if (pos.row === hitPos.row && pos.col === hitPos.col) {
        expect(s.isHit(pos)).toBeTruthy();
      } else {
        expect(s.isHit(pos)).toBeFalsy();
      }
    }
  });

  test('check correct position is hit (vertical ship)', () => {
    let params = {
      id: Math.floor(Math.random() * 1000),
      start: new Position(1, 3),
      length: 5,
      isHorizontal: false,
    };
    let s = new Ship(
      params.id,
      params.start,
      params.length,
      params.isHorizontal
    );

    let hitPos = new Position(2, 3);
    s.hit(hitPos);

    for (let row = s.start.row; row <= s.end.row; row += 1) {
      let pos = new Position(row, s.start.col);

      if (pos.row === hitPos.row && pos.col === hitPos.col) {
        expect(s.isHit(pos)).toBeTruthy();
      } else {
        expect(s.isHit(pos)).toBeFalsy();
      }
    }
  });

  test('check calling hit with position outside ship throws error', () => {
    let params = {
      id: Math.floor(Math.random() * 1000),
      start: new Position(4, 7),
      length: 2,
      isHorizontal: true,
    };
    let s = new Ship(
      params.id,
      params.start,
      params.length,
      params.isHorizontal
    );

    let hitPos = new Position(3, 7);
    expect(() => s.hit(hitPos)).toThrow(
      `position out of bounds: [${hitPos.row}, ${hitPos.col}]`
    );
  });

  test('check isSunk', () => {
    let params = {
      id: Math.floor(Math.random() * 1000),
      start: new Position(2, 3),
      length: 4,
      isHorizontal: true,
    };
    let s = new Ship(
      params.id,
      params.start,
      params.length,
      params.isHorizontal
    );

    expect(s.isSunk()).toBeFalsy();

    for (let col = s.start.col; col <= s.end.col; col += 1) {
      s.hit({ row: s.start.row, col });
    }

    expect(s.isSunk()).toBeTruthy();
  });
});
