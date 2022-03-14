import Ship from './ship.js';

describe('ship', () => {
  test('check ship instantiation', () => {
    let expected = {
      start: { row: 2, col: 4 },
      length: 9,
      isHorizontal: true,
    };

    let s = new Ship(expected.start, expected.length, expected.isHorizontal);

    expect(s.start).toBe(expected.start);
    expect(s.length).toBe(expected.length);
    expect(s.isHorizontal).toBe(expected.isHorizontal);
  });

  test('check correct position is hit (horizontal ship)', () => {
    let params = {
      start: { row: 4, col: 2 },
      length: 5,
      isHorizontal: true,
    };
    let s = new Ship(params.start, params.length, params.isHorizontal);

    let hitPos = { row: 4, col: 3 };
    s.hit(hitPos);

    for (let col = s.start.col; col <= s.end.col; col += 1) {
      let pos = { row: s.start.row, col };

      if (pos.row === hitPos.row && pos.col === hitPos.col) {
        expect(s.isHit(pos)).toBeTruthy();
      } else {
        expect(s.isHit(pos)).toBeFalsy();
      }
    }
  });

  test('check correct position is hit (vertical ship)', () => {
    let params = {
      start: { row: 1, col: 3 },
      length: 5,
      isHorizontal: false,
    };
    let s = new Ship(params.start, params.length, params.isHorizontal);

    let hitPos = { row: 2, col: 3 };
    s.hit(hitPos);

    // Check vertically
    for (let row = s.start.row; row <= s.end.row; row += 1) {
      let pos = { row, col: s.start.col };

      if (pos.row === hitPos.row && pos.col === hitPos.col) {
        expect(s.isHit(pos)).toBeTruthy();
      } else {
        expect(s.isHit(pos)).toBeFalsy();
      }
    }
  });

  test('check calling hit with position outside ship throws error', () => {
    let params = {
      start: { row: 4, col: 7 },
      length: 2,
      isHorizontal: true,
    };
    let s = new Ship(params.start, params.length, params.isHorizontal);

    let hitPos = { row: 3, col: 7 };
    expect(() => s.hit(hitPos)).toThrow(
      `position out of bounds: [${hitPos.row}, ${hitPos.col}]`
    );
  });

  test('check isSunk', () => {
    let params = {
      start: { row: 2, col: 3 },
      length: 4,
      isHorizontal: true,
    };
    let s = new Ship(params.start, params.length, params.isHorizontal);

    expect(s.isSunk()).toBeFalsy();

    for (let col = s.start.col; col <= s.end.col; col += 1) {
      s.hit({ row: s.start.row, col });
    }

    expect(s.isSunk()).toBeTruthy();
  });
});
