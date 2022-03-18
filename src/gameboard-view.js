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
  }

  load() {
    this.board = document.createElement('div');
    this.board.classList.add('board');

    for (let row = 0; row < this.gameboardSize; row += 1) {
      for (let col = 0; col < this.gameboardSize; col += 1) {
        let cell = document.createElement('div');

        cell.classList.add('cell');

        cell.style.gridRow = row + 1;
        cell.style.gridColumn = col + 1;

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

  displayShip(position, length, isHorizontal) {
    let ship = document.createElement('div');

    ship.classList.add('ship');

    let rowsSpanned = isHorizontal ? 1 : length;
    let colsSpanned = isHorizontal ? length : 1;

    ship.style.gridArea = `${position.row} / ${position.col} / span ${rowsSpanned} / span ${colsSpanned}`;

    this.board.appendChild(ship);
  }

  #displayCellImage(image, position) {
    let img = document.createElement('img');

    img.classList.add('hit');

    img.src = image;

    img.style.gridRow = position.row + 1;
    img.style.gridColumn = position.col + 1;

    this.board.appendChild(img);
  }
}

export default GameboardView;
