import { Gameboard } from './gameboard';

function buildBoard(ownTerritory, enemyTerritory=null) {

  // if (territory == nil)


  let boardDiv = document.createElement('div');
  boardDiv.classList = 'board';
  if (enemyTerritory !== null) {
    boardDiv.id = "top-board";
  } else {
    boardDiv.id = "bottom-board";
  }
  document.body.appendChild(boardDiv);
  // gameBoard.board.forEach(
  //
  // )
  for (let x=0; x<10; x++) {
    for (let y=0; y<10; y++) {
      let square = document.createElement('div');
      square.classList = 'square';

      if (enemyTerritory === null) {
        square.id = `X${x}-Y${y}`
      }


      if (y == 0) {
        square.classList.toggle('first');
      }
      square.x = x;
      square.y = y;
      // CRUCIAL LINE BELOW:
      // applying the gamboard (line 4) to the squares, means that when you click on one of the squares, and "this" is called on it, "this" is also the gamebaord (line 4).
      square.gameboard = ownTerritory;
      square.enemyboard = enemyTerritory;
      if (enemyTerritory !== null) {
        square.addEventListener('click', ownTerritory.playerAttack);
        square.addEventListener('click', enemyTerritory.computerAttack);
      } else if (ownTerritory.board[x][y] == 1) {
        square.classList.toggle('player-ship');
      }
      boardDiv.appendChild(square);
    }
  }
}

function initialSetup() {
  let NPCterritory = new Gameboard();
  let PlayerTerritory = new Gameboard();
  // Computer's perspective:
  buildBoard(NPCterritory, PlayerTerritory);

  let gameOverDiv = document.createElement('div');
  gameOverDiv.id = 'game-over';
  document.body.appendChild(gameOverDiv);


  let resetButton = document.createElement('input');
  resetButton.type = "button";
  // resetButton.onclick = window.location.reload;
  resetButton.id = 'reset';
  resetButton.value = "New Game";
  resetButton.addEventListener('click', () => window.location.reload());
  document.body.appendChild(resetButton);


  // Player's perspective:
  buildBoard(PlayerTerritory);
  // buildBoard('NPC');
  // buildBoard('player');
}

export {initialSetup};
