import Ship from './ship.js';

describe('ship', () => {
  test('check ship has correct length', () => {
    let expected = 9;

    let s = new Ship(expected);

    expect(s.length).toBe(expected);
  });

  test('check correct position is hit', () => {
    let length = 5;
    let s = new Ship(length);

    let hitPos = 2;
    s.hit(hitPos);

    for (let pos = 0; pos < length; pos += 1) {
      if (pos === hitPos) {
        expect(s.isHit(pos)).toBeTruthy();
      } else {
        expect(s.isHit(pos)).toBeFalsy();
      }
    }
  });

  test('check isSunk', () => {
    let length = 4;
    let s = new Ship(length);

    expect(s.isSunk()).toBeFalsy();

    for (let pos = 0; pos < length; pos += 1) {
      s.hit(pos);
    }
    
    expect(s.isSunk()).toBeTruthy();
  });
});
