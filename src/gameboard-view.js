import './gameboard.css';
import CrosshairsImage from './assets/game-graphics/crosshairs.svg';
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

  #boardMsg;

  #boardMsgTxt;

  constructor(root, gameboardSize, headingStr) {
    this.#root = root;
    this.#gameboardSize = gameboardSize;
    this.#headingStr = headingStr;

    this.moveInputEvent = new GameEvent();
  }

  load() {
    this.#container = document.createElement('div');
    this.#container.classList.add('ui-container', 'active');

    this.#heading = document.createElement('h2');
    this.#board = document.createElement('div');
    this.#boardMsg = document.createElement('div');

    this.#container.appendChild(this.#heading);
    this.#container.appendChild(this.#board);
    this.#board.appendChild(this.#boardMsg);

    this.#root.appendChild(this.#container);

    this.#loadHeading();
    this.#loadBoard();
    this.#loadBoardMsg();
  }

  fade() {
    this.#container.classList.remove('active');

    if (window.matchMedia('(max-width: 768px)').matches) {
      this.#container.style.display = 'none';
    } else {
      this.#container.style.opacity = 0.3;
    }
  }

  clearFade() {
    this.#container.classList.add('active');

    this.#container.style.display = 'flex';
    this.#container.style.opacity = 1;
  }

  displayBoardMessage(msgStr) {
    this.#boardMsgTxt.innerText = msgStr;
    this.#boardMsg.classList.remove('fade-out');
    this.#boardMsg.classList.add('fade-in');
  }

  hideBoardMessage() {
    this.#boardMsg.classList.remove('fade-in');
    this.#boardMsg.classList.add('fade-out');
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
        let crosshairs = document.createElement('img');

        crosshairs.classList.add('crosshairs');
        crosshairs.src = CrosshairsImage;

        cell.classList.add('cell');

        cell.style.gridRow = row + 1;
        cell.style.gridColumn = col + 1;

        cell.addEventListener('click', () =>
          this.moveInputEvent.trigger(new Position(row, col))
        );

        cell.appendChild(crosshairs);

        this.#board.appendChild(cell);
      }
    }
  }

  #loadHeading() {
    this.#heading.classList.add('board-title');
    this.#heading.innerText = this.#headingStr;
  }

  #loadBoardMsg() {
    this.#boardMsg.classList.add('board-message', 'fade-out');
    this.#boardMsgTxt = document.createElement('p');
    this.#boardMsg.appendChild(this.#boardMsgTxt);
  }
}

export default GameboardView;
