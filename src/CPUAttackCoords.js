function generateRandomCoords() {
  let randomCoords = { x: -5, y: -5 }

  randomCoords.x = Math.floor(Math.random() * 10);
  randomCoords.y = Math.floor(Math.random() * 10);

  return randomCoords;
}

function generateEducatedCoords(lastshot) {
  let educatedCoords = {x:-5, y:-5};

  while (educatedCoords.x < 0 || educatedCoords.x > 9 || educatedCoords.y < 0 || educatedCoords.y > 9) {
    switch(Math.floor(Math.random() * 4)){
      case 0:
        educatedCoords.x = lastshot.x + 1
        educatedCoords.y = lastshot.y
        break;
      case 1:
        educatedCoords.x = lastshot.x - 1
        educatedCoords.y = lastshot.y
        break;
      case 2:
        educatedCoords.x = lastshot.x
        educatedCoords.y = lastshot.y + 1
        break;
      case 3:
        educatedCoords.x = lastshot.x
        educatedCoords.y = lastshot.y - 1
        break;
    };
  }

  return educatedCoords;
}

export { generateRandomCoords, generateEducatedCoords };
