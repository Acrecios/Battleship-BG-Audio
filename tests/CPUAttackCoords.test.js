import { generateRandomCoords, generateEducatedCoords } from '../src/CPUAttackCoords';

test ('generateRandomCoords generates valid random coordinates', () => {
  for (let i = 0; i<100; i++) {
    let coords = generateRandomCoords();
    expect(coords.x).toBeGreaterThanOrEqual(0);
    expect(coords.x).toBeLessThanOrEqual(9);
    expect(coords.y).toBeGreaterThanOrEqual(0);
    expect(coords.y).toBeLessThanOrEqual(9);
  }
});

test ('generateEducatedCoords generates valid nearby coordinates', () => {
  let lastshot = {x: 5, y: 5}
  for (let i = 0; i<10; i++) {
    let coords = generateEducatedCoords(lastshot);
    expect(coords.x).toBeGreaterThanOrEqual(4);
    expect(coords.x).toBeLessThanOrEqual(6);
    expect(coords.y).toBeGreaterThanOrEqual(4);
    expect(coords.y).toBeLessThanOrEqual(6);
    expect(coords).not.toBe(lastshot);
  }

  lastshot = {x: 9, y: 0}
  for (let i = 0; i<10; i++) {
    let coords = generateEducatedCoords(lastshot);
    expect(coords.x).toBeGreaterThanOrEqual(8);
    expect(coords.x).toBeLessThanOrEqual(9);
    expect(coords.y).toBeGreaterThanOrEqual(0);
    expect(coords.y).toBeLessThanOrEqual(1);
    expect(coords).not.toBe(lastshot);
  }
});
