class GameEvent {
  #handlers;

  constructor() {
    this.#handlers = [];
  }

  addHandler(handler) {
    this.#handlers.push(handler);
  }

  trigger(...params) {
    this.#handlers.forEach((h) => h(...params));
  }
}

export default GameEvent;
