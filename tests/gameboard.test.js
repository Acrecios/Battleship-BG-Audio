import { Gameboard } from '../src/gameboard';

let testGameboard = new Gameboard();

test ('creates a valid gameboard', () => {
  expect(testGameboard.sunkenShips).toBe(0);
  expect(testGameboard.ships).toHaveLength(5);

  let shipSpots = 0;
  testGameboard.board.forEach(row => shipSpots += row.filter(value => value == 1).length);
  expect(shipSpots).toBe(18);

  let EmptySpots = 0;
  testGameboard.board.forEach(row => EmptySpots += row.filter(value => value == 0).length);
  expect(EmptySpots).toBe(82);

  let AttackedSpots = 0;
  testGameboard.board.forEach(row => AttackedSpots += row.filter(value => value == 2).length);
  expect(AttackedSpots).toBe(0);

  expect(testGameboard.lastShotSucceeded).toBe(false);
  expect(testGameboard.lastShotXY).toBe(null);
  expect(testGameboard.shotsSinceLastHit).toBe(0);
});

test ('educated shot generates valid coordinates', () => {

  testGameboard.board = [
    [1,1,1,1,1,1,1,1,1,1],
    [1,2,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1]];

  let target = {enemyboard: testGameboard};
  testGameboard.lastShotSucceeded = true;
  testGameboard.lastShotXY = { x:1, y:1 };

  let surroundedSpots = [{ x: 0, y: 1 },
                         { x: 1, y: 0 },
                         { x: 1, y: 2 },
                         { x: 2, y: 1 }];
  let nextTarget = testGameboard.educatedShot(target);
  expect(surroundedSpots).toContainEqual(nextTarget);
});
