import GameboardView from './gameboard-view.js';
import Player from './player.js';

class GameController {
  static BOARD_SIZE = 10;
  static SHIP_LENGTHS = [5, 4, 3, 3, 2, 1];

  constructor() {
    this.player = new Player(GameController.BOARD_SIZE, false);
    this.computer = new Player(GameController.BOARD_SIZE, true);

    this.playerView = new GameboardView(
      document.getElementById('content'),
      GameController.BOARD_SIZE
    );
    this.computerView = new GameboardView(
      document.getElementById('content'),
      GameController.BOARD_SIZE
    );

    // place ships.
    this.player.gameboard.placeShipsRandomly(GameController.SHIP_LENGTHS);
    this.computer.gameboard.placeShipsRandomly(GameController.SHIP_LENGTHS);

    // events
    this.computerView.moveInputEvent.addHandler(this.onPlayerAttackInputEvent);

    this.player.gameboard.hitEvent.addHandler(this.onPlayerBoardHitEvent);
    this.player.gameboard.missEvent.addHandler(this.onPlayerBoardMissEvent);
    this.player.gameboard.sunkEvent.addHandler(this.onPlayerBoardSunkEvent);
    this.player.gameboard.allShipsSunkEvent.addHandler(
      this.onPlayerBoardAllShipsSunkEvent
    );

    this.computer.gameboard.hitEvent.addHandler(this.onComputerBoardHitEvent);
    this.computer.gameboard.missEvent.addHandler(this.onComputerBoardMissEvent);
    this.computer.gameboard.sunkEvent.addHandler(this.onComputerBoardSunkEvent);
    this.computer.gameboard.allShipsSunkEvent.addHandler(
      this.onComputerBoardAllShipsSunkEvent
    );
  }

  onPlayerAttackInputEvent = (position) => {
    this.computer.gameboard.receiveAttack(position);
  };

  onPlayerBoardHitEvent = (position) => {
    this.playerView.displayHit(position);
  };

  onComputerBoardHitEvent = (position) => {
    this.computerView.displayHit(position);
  };

  onPlayerBoardMissEvent = (position) => {
    this.playerView.displayMiss(position);
  };

  onComputerBoardMissEvent = (position) => {
    this.computerView.displayMiss(position);
  };

  onPlayerBoardSunkEvent = () => {
    console.log('sunk!');
    // TODO
  };

  onComputerBoardSunkEvent = () => {
    console.log('sunk!');
    // TODO
  };

  onPlayerBoardAllShipsSunkEvent = () => {
    console.log('player loses!');
    // TODO
  };

  onComputerBoardAllShipsSunkEvent = () => {
    console.log('computer loses!');
    // TODO
  };
}

export default GameController;
