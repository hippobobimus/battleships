import './button.css';
import './game.css';
import GameEvent from './game-event.js';
import GameboardView from './gameboard-view.js';
import TickerView from './ticker-view.js';

class GameView {
  #root;

  constructor(root, boardSize, playerTitleStr, computerTitleStr) {
    this.#root = root;

    this.boards = document.createElement('div');
    this.boards.id = 'boards';

    this.ticker = new TickerView(root);
    this.player = new GameboardView(this.boards, boardSize, playerTitleStr);
    this.computer = new GameboardView(this.boards, boardSize, computerTitleStr);

    this.resetEvent = new GameEvent();
  }

  load() {
    this.ticker.load();

    this.#root.appendChild(this.boards);

    this.player.load();
    this.computer.load();
  }

  displayPlayAgain() {
    let btn = document.createElement('div');

    btn.classList.add('btn');
    btn.innerText = 'Play Again';
    btn.addEventListener('click', () => this.resetEvent.trigger());

    this.#root.appendChild(btn);
  }
}

export default GameView;
