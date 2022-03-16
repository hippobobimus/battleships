import Ship from './ship.js';

describe('ship', () => {
  test('check ship instantiation', () => {
    let expected = {
      length: 9,
    };

    let s = new Ship(expected.length);

    expect(s.length).toBe(expected.length);
  });

  test('check hit processing', () => {
    let params = {
      length: 5,
    };
    let s = new Ship(params.length);


    for (let i = 0; i < s.length; i += 1) {
      expect(s.hits).toBe(i);
      expect(s.isSunk()).toBeFalsy();
      s.hit();
    }

    expect(s.hits).toBe(s.length);
    expect(s.isSunk()).toBeTruthy();
  });
});
