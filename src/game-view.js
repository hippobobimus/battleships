import GameboardView from './gameboard-view.js';
import TickerView from './ticker-view.js';

class GameView {
  constructor(root, boardSize, playerTitleStr, computerTitleStr) {
    this.root = root;

    this.boards = document.createElement('div');
    this.boards.id = 'boards';

    this.player = new GameboardView(this.boards, boardSize, playerTitleStr);
    this.computer = new GameboardView(this.boards, boardSize, computerTitleStr);
    this.ticker = new TickerView(root);
  }

  load() {
    this.root.appendChild(this.boards);

    this.player.load();
    this.computer.load();
    this.ticker.load();
  }
}

export default GameView;
