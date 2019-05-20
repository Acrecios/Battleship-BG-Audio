function setSinkMessage(player) {
  let gameOverDiv = document.getElementById('game-over');
  if (player == 'player') {
    gameOverDiv.innerHTML = 'You sunk their ship!'
  } else {
    gameOverDiv.innerHTML = 'PC sunk your ship!'
  }
}

function checkForWin(targetBoard, player) {
  let board = document.getElementsByClassName('board')[0];
  let gameOverDiv = document.getElementById('game-over');

  if (targetBoard.sunkenShips >= 5) {
    board.style.pointerEvents = 'none';
    if (player == 'player') {
      gameOverDiv.innerHTML = 'You Win!';
    } else {
      gameOverDiv.innerHTML = 'You Lose!';
    }
  }
}

export { setSinkMessage, checkForWin };
