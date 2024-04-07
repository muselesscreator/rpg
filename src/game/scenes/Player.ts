export class Player {
  x: number;
  y: number;
  items: string[];
  constructor() {
    this.x = 24;
    this.y = 8;
    this.items = [];
  }
  get pos() {
    return [this.x, this.y];
  }
  set pos(newPos) {
    [this.x, this.y] = newPos;
  }
}

export default Player;
