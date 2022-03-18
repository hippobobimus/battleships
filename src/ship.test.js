import Position from './position.js';
import Ship from './ship.js';

describe('ship', () => {
  test('check ship instantiation', () => {
    let expected = {
      position: new Position(2, 3),
      length: 9,
      isHorizontal: false,
    };

    let s = new Ship(expected.position, expected.length, expected.isHorizontal);

    expect(s.position).toBe(expected.position);
    expect(s.length).toBe(expected.length);
    expect(s.isHorizontal).toBe(expected.isHorizontal);
  });

  test('check hit processing', () => {
    let params = {
      position: new Position(8, 0),
      length: 5,
      isHorizontal: true,
    };

    let s = new Ship(params.position, params.length, params.isHorizontal);

    for (let i = 0; i < s.length; i += 1) {
      expect(s.hits).toBe(i);
      expect(s.isSunk()).toBeFalsy();
      s.hit();
    }

    expect(s.hits).toBe(s.length);
    expect(s.isSunk()).toBeTruthy();
  });
});
