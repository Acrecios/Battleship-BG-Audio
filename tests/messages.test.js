import { setSinkMessage, checkForWin } from '../src/messages';


let gameOverDiv = document.createElement('div');
gameOverDiv.id = 'game-over';
document.body.appendChild(gameOverDiv);

let boardDiv = document.createElement('div');
boardDiv.classList = 'board';
document.body.appendChild(boardDiv);

let territory = {};
territory.sunkenShips = 5;


test ('Displays correct message when ship is sunk', () => {
  setSinkMessage("player");
  expect(gameOverDiv.innerHTML).toBe('You sunk their ship!');

  setSinkMessage("NPC");
  expect(gameOverDiv.innerHTML).toBe('PC sunk your ship!');
});


test ('Displays correct message after win condition', () => {
  checkForWin(territory, "player");
  expect(gameOverDiv.innerHTML).toBe('You Win!');

  checkForWin(territory, "NPC");
  expect(gameOverDiv.innerHTML).toBe('You Lose!');
});
