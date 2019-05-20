class Ship {
  constructor(name, start, end) {
    this.name = name;
    this.sunk = false;

    this.spots = [];
    if (start.y == end.y) {
      for (let i = start.x; i <= end.x; i++) {
        this.spots.push({x: i, y: start.y, hit: false});
      }
    } else {
      for (let i = start.y; i <= end.y; i++) {
        this.spots.push({x: start.x, y: i, hit: false})
      }
    }
  }
  applyHit(target) {
    let index = this.spots.indexOf(this.spots.find((spot) => spot.x == target.x && spot.y == target.y))
    this.spots[index].hit = true;

    if (this.spots.every(spot => spot.hit == true)) {
      this.sunk = true;
    }
  }
}

export { Ship }
