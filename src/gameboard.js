import { Ship } from './shipClass';
import { generateRandomCoords, generateEducatedCoords } from './CPUAttackCoords';
import { setSinkMessage, checkForWin } from './messages';

class Gameboard {
  constructor() {
    let self = this;
    this.sunkenShips = 0;
    this.board = [];
    for (let i = 0; i < 10; i++) {
      this.board.push(new Array(10).fill(0));
    }
    this.ships = [];

    function placeRandom(length) {
        let randomX = -5;
        let randomY = -5;
        while (randomX+length < 0 || randomX+length > 9 || randomY+length < 0 || randomY+length > 9) {
          randomX = Math.floor(Math.random() * 10);
          randomY = Math.floor(Math.random() * 10);
        }

        let randomDir = Math.random() < 0.5 ? "H" : "V";
        let ship;
        if (randomDir == "V") {
          ship = new Ship(`ship${length+1}`, {x: randomX, y: randomY}, {x: randomX, y: randomY+length});
        } else {
          ship = new Ship(`ship${length+1}`, {x: randomX, y: randomY}, {x: randomX+length, y: randomY});
        }
        // check if spots have already been taken:
        let spotisValid = true
        ship.spots.forEach(spot => {
          if (self.board[spot.x][spot.y] != 0) {
            spotisValid = false;
          }
        });

        if (spotisValid) {
          self.ships.push(ship);
          ship.spots.forEach(spot => {
            self.board[spot.x][spot.y] = 1;
          });
        }

        return spotisValid;
    }

    // NOTE ship lengths of 5,4,4,3,1  need to be -1
    let stockShips = [4,3,3,2,1];
    stockShips.forEach(length => {
      let happened;
      do {
        happened = placeRandom(length);
      } while (!happened)

    });
    let count = 0;
    this.board.forEach(row => row.forEach(coord => {
      if (coord == 1) { count++; }
    }));

    // AI properties
    this.lastShotSucceeded = false;
    this.lastShotXY = null;
    this.shotsSinceLastHit = 0;

    console.log(this.board);
  }

  playerAttack(event) {
    // let gameOverDiv = document.getElementById('game-over');
    // gameOverDiv.innerHTML = 'Computer Firing...';
    let boardTarget = this.gameboard.board[this.x][this.y];
    let gameOverDiv = document.getElementById('game-over');
    gameOverDiv.innerHTML = '';

    this.gameboard.findAndHitShip(this.gameboard, this, 'player');

    if (boardTarget == 1) {
      this.classList.toggle('red');
    } else {
      boardTarget = 2;
      this.classList.toggle('white');
    }

    this.removeEventListener('click', this.gameboard.playerAttack);
  }

  computerAttack() {
    this.removeEventListener('click', this.enemyboard.computerAttack);
    let board = document.getElementsByClassName('board')[0];
    let gameOverDiv = document.getElementById('game-over');
    let computerShot;

    if (this.enemyboard.lastShotSucceeded) {
      computerShot = this.enemyboard.educatedShot(this);
    } else {
      computerShot = this.enemyboard.randomShot(this);
    }

    let computerTarget = document.getElementById(`X${computerShot.x}-Y${computerShot.y}`);

    if (this.enemyboard.board[computerShot.x][computerShot.y] == 1) {
      computerTarget.classList.toggle('red');
      this.enemyboard.lastShotSucceeded = true;
      this.enemyboard.shotsSinceLastHit = 0;
      this.enemyboard.lastShotXY = { x: computerShot.x, y: computerShot.y };

      // apply hit to Player's javascript Ship object:
      this.enemyboard.findAndHitShip(this.enemyboard, computerShot, 'NPC')

    } else {
      computerTarget.classList.toggle('white');
      this.enemyboard.shotsSinceLastHit++;
      if (this.enemyboard.shotsSinceLastHit >= 4) {
        this.enemyboard.lastShotSucceeded = false;
      }
    }
    this.enemyboard.board[computerShot.x][computerShot.y] = 2;
  }

  educatedShot(target) {
    let guessCount = 1;
    let computerShot = generateEducatedCoords(target.enemyboard.lastShotXY);
    while (target.enemyboard.board[computerShot.x][computerShot.y] == 2 && guessCount < 5) {
      computerShot = generateEducatedCoords(target.enemyboard.lastShotXY);
      guessCount++;
    }
    // This guessCount avoids an infinite loop if no adjacent spots are valid.
    if (guessCount == 5) {
      computerShot = target.enemyboard.randomShot(target);
    }

    return computerShot;
  }

  randomShot(target) {
    let computerShot = generateRandomCoords();
    while (target.enemyboard.board[computerShot.x][computerShot.y] == 2) {
      computerShot = generateRandomCoords();
    }
    return computerShot;
  }

  findAndHitShip(targetBoard, target, player) {
    loop1:
      for (let ship of targetBoard.ships) {
        for (let spot of ship.spots) {
          if (spot.x == target.x && spot.y == target.y) {
              ship.applyHit({x: target.x, y: target.y});
              if (ship.sunk) {
                targetBoard.sunkenShips++;
                setSinkMessage(player);
                checkForWin(targetBoard, player);
              }
              break loop1;//STOP this loop
          }
        }
      }
    }

}

export { Gameboard };

// CPU AI LOGIC:

// generate new shot with random coordinates,
// check if that location has already been targeted "state = 2",
// if yes, generate new one until it is one that is not "state = 2",
//
// if successful hit, then next generated shot will educatedCoordinate instead of random,
// it will +1 or -1 x or y from last successful hit.
// if that location is not state = "2"
// if 4 calls to educatedCoordinate occur that are invalid, switch back to random.
//
// keep track of num shots since last hit.
// keep track of num shots that are hits since last hit
//
// if go 4 shots without hit, then go back to generating random location,
// or if go 5 hits in 15 shots (sunk largest ship), then go back to generating random location.  The two variables above get reset.
//
// if hits are in a straight line?  follow line?
