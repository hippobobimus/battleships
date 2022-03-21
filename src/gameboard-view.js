import './gameboard.css';
import HitImage from './assets/game-graphics/hit.svg';
import MissImage from './assets/game-graphics/miss.svg';
import GameEvent from './game-event.js';
import Position from './position.js';

class GameboardView {
  #root;

  #gameboardSize;

  #headingStr;

  #container;

  #heading;

  #board;

  constructor(root, gameboardSize, headingStr) {
    this.#root = root;
    this.#gameboardSize = gameboardSize;
    this.#headingStr = headingStr;

    this.moveInputEvent = new GameEvent();
  }

  load() {
    this.#container = document.createElement('div');
    this.#container.classList.add('ui-container');

    this.#heading = document.createElement('h2');
    this.#board = document.createElement('div');

    this.#container.appendChild(this.#heading);
    this.#container.appendChild(this.#board);

    this.#root.appendChild(this.#container);

    this.#loadHeading();
    this.#loadBoard();
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

    ship.style.gridArea = `${position.row + 1} / ${
      position.col + 1
    } / span ${rowsSpanned} / span ${colsSpanned}`;

    this.#board.appendChild(ship);
  }

  #displayCellImage(image, position) {
    let img = document.createElement('img');

    img.classList.add('hit');

    img.src = image;

    img.style.gridRow = position.row + 1;
    img.style.gridColumn = position.col + 1;

    this.#board.appendChild(img);
  }

  #loadBoard() {
    this.#board.classList.add('board');

    for (let row = 0; row < this.#gameboardSize; row += 1) {
      for (let col = 0; col < this.#gameboardSize; col += 1) {
        let cell = document.createElement('div');

        cell.classList.add('cell');

        cell.style.gridRow = row + 1;
        cell.style.gridColumn = col + 1;

        cell.addEventListener('click', () =>
          this.moveInputEvent.trigger(new Position(row, col))
        );

        this.#board.appendChild(cell);
      }
    }
  }

  #loadHeading() {
    this.#heading.classList.add('board-title');
    this.#heading.innerText = this.#headingStr;
  }
}

export default GameboardView;
