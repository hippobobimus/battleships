import './gameboard.css';
import HitImage from './assets/game-graphics/hit.svg';
import MissImage from './assets/game-graphics/miss.svg';
import GameEvent from './game-event.js';
import Position from './position.js';

class GameboardView {
  constructor(root, gameboardSize) {
    this.root = root;
    this.gameboardSize = gameboardSize;

    this.moveInputEvent = new GameEvent();

    this.board = document.createElement('div');
    this.board.classList.add('board');

    for (let row = 0; row < gameboardSize; row += 1) {
      for (let col = 0; col < gameboardSize; col += 1) {
        let cell = document.createElement('div');

        cell.classList.add('cell');

        cell.addEventListener(
          'click',
          () => this.moveInputEvent.trigger(new Position(row, col)),
          { once: true }
        );

        this.board.appendChild(cell);
      }
    }

    this.root.appendChild(this.board);
  }

  displayHit(position) {
    this.#displayCellImage(HitImage, position);
  }

  displayMiss(position) {
    this.#displayCellImage(MissImage, position);
  }

  #displayCellImage(image, position) {
    let img = document.createElement('img');

    img.classList.add('hit');
    img.src = image;

    let cells = this.board.querySelectorAll('.cell');

    let idx = this.gameboardSize * position.row + position.col;
    cells[idx].appendChild(img);
  }
}

export default GameboardView;
