import './gameboard.css';
import GameEvent from './game-event.js';
import Position from './position.js';

class GameboardView {
  constructor(root, gameboardSize) {
    this.moveInputEvent = new GameEvent();

    let board = document.createElement('div');
    board.classList.add('board');

    for (let row = 0; row < gameboardSize; row += 1) {
      for (let col = 0; col < gameboardSize; col += 1) {
        let cell = document.createElement('div');

        cell.classList.add('cell');

        cell.addEventListener(
          'click',
          () => this.moveInputEvent.trigger(new Position(row, col)),
          { once: true }
        );

        board.appendChild(cell);
      }
    }

    root.appendChild(board);
  }
}

export default GameboardView;
