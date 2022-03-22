import GameboardView from './gameboard-view.js';
import Player from './player.js';
import TickerView from './ticker-view.js';

class GameController {
  static BOARD_SIZE = 10;

  static SHIP_LENGTHS = [5, 4, 3, 3, 2, 1];

  constructor() {
    this.player = new Player(GameController.BOARD_SIZE, false);
    this.computer = new Player(GameController.BOARD_SIZE, true);

    this.isGameover = false;
    this.isPlayerTurn = true;

    let root = document.getElementById('content');
    let boards = document.getElementById('boards');

    this.playerView = new GameboardView(
      boards,
      GameController.BOARD_SIZE,
      'Your Zone'
    );
    this.computerView = new GameboardView(
      boards,
      GameController.BOARD_SIZE,
      "The Admiral's Zone"
    );
    this.tickerView = new TickerView(root);

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
    this.tickerView.load();

    // display all of the player's ship positions.
    this.player.gameboard.ships.forEach((ship) => {
      this.playerView.displayShip(
        ship.position,
        ship.length,
        ship.isHorizontal
      );
    });

    this.playerView.fade();
  }

  #takeComputerTurn() {
    if (this.isGameover || this.isPlayerTurn) {
      return;
    }

    this.player.gameboard.receiveAttack(this.computer.getAiMove());
  }

  onPlayerAttackInputEvent = async (position) => {
    if (this.isGameover || !this.isPlayerTurn) {
      return;
    }

    this.tickerView.clear();

    this.isPlayerTurn = false;
    this.computer.gameboard.receiveAttack(position);

    setTimeout(() => {
      if (!this.isGameover) {
        this.computerView.fade();
        this.playerView.clearFade();
      }
    }, 2000);

    setTimeout(() => {
      this.#takeComputerTurn();
      setTimeout(() => {
        if (!this.isGameover) {
          this.computerView.clearFade();
          this.playerView.fade();
          this.tickerView.displayMessage(
            "Select a target in the Admiral's zone"
          );
        }
        this.isPlayerTurn = true;
      }, 2000);
    }, 2500);
  };

  onPlayerBoardHitEvent = (position) => {
    this.playerView.displayHit(position);
    this.playerView.displayBoardMessage('Hit!');
    setTimeout(() => this.playerView.hideBoardMessage(), 1500);
  };

  onComputerBoardHitEvent = (position) => {
    this.computerView.displayHit(position);
    this.computerView.displayBoardMessage('Hit!');
    setTimeout(() => this.computerView.hideBoardMessage(), 1500);
  };

  onPlayerBoardMissEvent = (position) => {
    this.playerView.displayMiss(position);
    this.playerView.displayBoardMessage('Miss!');
    setTimeout(() => this.playerView.hideBoardMessage(), 1500);
  };

  onComputerBoardMissEvent = (position) => {
    this.computerView.displayMiss(position);
    this.computerView.displayBoardMessage('Miss!');
    setTimeout(() => this.computerView.hideBoardMessage(), 1500);
  };

  onPlayerBoardSunkEvent = (hitPosition) => {
    this.playerView.displayHit(hitPosition);
    this.playerView.displayBoardMessage('Ship sunk!');
    setTimeout(() => this.playerView.hideBoardMessage(), 1500);
  };

  onComputerBoardSunkEvent = (
    hitPosition,
    shipPosition,
    shipLength,
    shipIsHor
  ) => {
    this.computerView.displayShip(shipPosition, shipLength, shipIsHor);
    this.computerView.displayHit(hitPosition);
    this.computerView.displayBoardMessage('Ship sunk!');
    setTimeout(() => this.computerView.hideBoardMessage(), 1500);
  };

  onPlayerBoardAllShipsSunkEvent = (
    hitPosition,
    shipPosition,
    shipLength,
    shipIsHor
  ) => {
    this.isGameover = true;
    this.tickerView.displayMessage('YOU HAVE BEEN DEFEATED');
    this.playerView.displayShip(shipPosition, shipLength, shipIsHor);
    this.playerView.displayHit(hitPosition);
    this.playerView.displayBoardMessage('Fleet sunk!');
    setTimeout(() => this.playerView.fade(), 2500);
  };

  onComputerBoardAllShipsSunkEvent = (
    hitPosition,
    shipPosition,
    shipLength,
    shipIsHor
  ) => {
    this.isGameover = true;
    this.tickerView.displayMessage('YOU ARE VICTORIOUS');
    this.computerView.displayShip(shipPosition, shipLength, shipIsHor);
    this.computerView.displayHit(hitPosition);
    this.computerView.displayBoardMessage('Fleet sunk!');
    setTimeout(() => this.computerView.fade(), 2500);
  };
}

export default GameController;
