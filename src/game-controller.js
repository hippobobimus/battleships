import GameboardView from './gameboard-view.js';
import Player from './player.js';

class GameController {
  static BOARD_SIZE = 10;

  static SHIP_LENGTHS = [5, 4, 3, 3, 2, 1];

  constructor() {
    this.player = new Player(GameController.BOARD_SIZE, false);
    this.computer = new Player(GameController.BOARD_SIZE, true);

    this.isGameover = false;
    this.isPlayerTurn = true;

    this.playerView = new GameboardView(
      document.getElementById('content'),
      GameController.BOARD_SIZE,
      'Your Zone',
    );
    this.computerView = new GameboardView(
      document.getElementById('content'),
      GameController.BOARD_SIZE,
      'The Admiral\'s Zone',
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

  load() {
    this.playerView.load();
    this.computerView.load();

    // display all of the player's ship positions.
    this.player.gameboard.ships.forEach((ship) => {
      this.playerView.displayShip(
        ship.position,
        ship.length,
        ship.isHorizontal
      );
    });
  }

  #takeComputerTurn() {
    if (this.isGameover || this.isPlayerTurn) {
      return;
    }

    this.player.gameboard.receiveAttack(this.computer.getAiMove());

    this.isPlayerTurn = true;
  }

  onPlayerAttackInputEvent = async (position) => {
    if (this.isGameover || !this.isPlayerTurn) {
      return;
    }

    this.isPlayerTurn = false;
    this.computer.gameboard.receiveAttack(position);

    setTimeout(() => this.#takeComputerTurn(), 1000);
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
    console.log('player ship sunk!');
    // TODO
  };

  onComputerBoardSunkEvent = (position, length, isHorizontal) => {
    this.computerView.displayShip(position, length, isHorizontal);
  };

  onPlayerBoardAllShipsSunkEvent = () => {
    console.log('player loses!');
    this.isGameover = true;
  };

  onComputerBoardAllShipsSunkEvent = () => {
    console.log('computer loses!');
    this.isGameover = true;
  };
}

export default GameController;
