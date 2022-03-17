import GameEvent from './game-event.js';

describe('game event', () => {
  test('check correct handler called', () => {
    let e = new GameEvent();

    let handler = jest.fn();

    e.addHandler(handler);

    expect(handler).not.toHaveBeenCalled();

    e.trigger(1, 2, 3);

    expect(handler.mock.calls.length).toBe(1);
    expect(handler).toHaveBeenCalledWith(1, 2, 3);

    e.trigger(4, 5);

    expect(handler.mock.calls.length).toBe(2);
    expect(handler).toHaveBeenCalledWith(4, 5);
  });
});
