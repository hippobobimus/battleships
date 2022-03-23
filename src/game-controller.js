import GameView from './game-view.js';
import Player from './player.js';
import StartView from './start-view.js';

class GameController {
  static BOARD_SIZE = 10;

  static SHIP_LENGTHS = [5, 4, 3, 3, 2, 1];

  constructor() {
    this.player = new Player(GameController.BOARD_SIZE, false);
    this.computer = new Player(GameController.BOARD_SIZE, true);

    this.isGameover = false;
    this.isPlayerTurn = true;

    let root = document.getElementById('content');

    this.startView = new StartView(root);
    this.gameView = new GameView(
      root,
      GameController.BOARD_SIZE,
      'Your Zone',
      "The Admiral's Zone"
    );

    // place ships.
    this.player.gameboard.placeShipsRandomly(GameController.SHIP_LENGTHS);
    this.computer.gameboard.placeShipsRandomly(GameController.SHIP_LENGTHS);

    // events
    this.startView.startEvent.addHandler(this.onStartGameEvent);

    this.gameView.computer.moveInputEvent.addHandler(
      this.onPlayerAttackInputEvent
    );

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

  start() {
    this.startView.load();
  }

  onStartGameEvent = () => {
    this.startView.clear();

    this.gameView.load();

    // display all of the player's ship positions.
    this.player.gameboard.ships.forEach((ship) => {
      this.gameView.player.displayShip(
        ship.position,
        ship.length,
        ship.isHorizontal
      );
    });

    this.gameView.player.fade();
  };

  onPlayerAttackInputEvent = async (position) => {
    if (this.isGameover || !this.isPlayerTurn) {
      return;
    }

    this.gameView.ticker.clear();

    this.isPlayerTurn = false;
    this.computer.gameboard.receiveAttack(position);

    setTimeout(() => {
      if (!this.isGameover) {
        this.gameView.computer.fade();
        this.gameView.player.clearFade();
      }
    }, 2000);

    setTimeout(() => {
      this.#takeComputerTurn();
      setTimeout(() => {
        if (!this.isGameover) {
          this.gameView.computer.clearFade();
          this.gameView.player.fade();
          this.gameView.ticker.displayMessage(
            "Select a target in the Admiral's zone"
          );
        }
        this.isPlayerTurn = true;
      }, 2000);
    }, 2500);
  };

  #takeComputerTurn() {
    if (this.isGameover || this.isPlayerTurn) {
      return;
    }

    this.player.gameboard.receiveAttack(this.computer.getAiMove());
  }

  onPlayerBoardHitEvent = (position) => {
    this.gameView.player.displayHit(position);
    this.gameView.player.displayBoardMessage('Hit!');
    setTimeout(() => this.gameView.player.hideBoardMessage(), 1500);
  };

  onComputerBoardHitEvent = (position) => {
    this.gameView.computer.displayHit(position);
    this.gameView.computer.displayBoardMessage('Hit!');
    setTimeout(() => this.gameView.computer.hideBoardMessage(), 1500);
  };

  onPlayerBoardMissEvent = (position) => {
    this.gameView.player.displayMiss(position);
    this.gameView.player.displayBoardMessage('Miss!');
    setTimeout(() => this.gameView.player.hideBoardMessage(), 1500);
  };

  onComputerBoardMissEvent = (position) => {
    this.gameView.computer.displayMiss(position);
    this.gameView.computer.displayBoardMessage('Miss!');
    setTimeout(() => this.gameView.computer.hideBoardMessage(), 1500);
  };

  onPlayerBoardSunkEvent = (hitPosition) => {
    this.gameView.player.displayHit(hitPosition);
    this.gameView.player.displayBoardMessage('Ship sunk!');
    setTimeout(() => this.gameView.player.hideBoardMessage(), 1500);
  };

  onComputerBoardSunkEvent = (
    hitPosition,
    shipPosition,
    shipLength,
    shipIsHor
  ) => {
    this.gameView.computer.displayShip(shipPosition, shipLength, shipIsHor);
    this.gameView.computer.displayHit(hitPosition);
    this.gameView.computer.displayBoardMessage('Ship sunk!');
    setTimeout(() => this.gameView.computer.hideBoardMessage(), 1500);
  };

  onPlayerBoardAllShipsSunkEvent = (
    hitPosition,
    shipPosition,
    shipLength,
    shipIsHor
  ) => {
    this.isGameover = true;
    this.gameView.ticker.displayMessage('YOU HAVE BEEN DEFEATED');
    this.gameView.player.displayShip(shipPosition, shipLength, shipIsHor);
    this.gameView.player.displayHit(hitPosition);
    this.gameView.player.displayBoardMessage('Fleet sunk!');
    setTimeout(() => this.gameView.player.fade(), 2500);
  };

  onComputerBoardAllShipsSunkEvent = (
    hitPosition,
    shipPosition,
    shipLength,
    shipIsHor
  ) => {
    this.isGameover = true;
    this.gameView.ticker.displayMessage('YOU ARE VICTORIOUS');
    this.gameView.computer.displayShip(shipPosition, shipLength, shipIsHor);
    this.gameView.computer.displayHit(hitPosition);
    this.gameView.computer.displayBoardMessage('Fleet sunk!');
    setTimeout(() => this.gameView.computer.fade(), 2500);
  };
}

export default GameController;
