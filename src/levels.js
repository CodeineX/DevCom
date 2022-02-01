import Brick from "/DevCom/src/brick.js";
import Concrete from "/DevCom/src/concrete.js";

export function buildLevel(game, brickArrangement) {
  let bricks = [];

  brickArrangement.forEach((row, rowIndex) => {
    row.forEach((brick, brickIndex) => {
      if (brick === 1) {
        let position = {
          x: 100 * brickIndex,
          y: 100 + 40 * rowIndex
        };
        bricks.push(new Brick(game, position));
      }
      if (brick === 2) {
        let position = {
          x: 100 * brickIndex,
          y: 100 + 40 * rowIndex
        };
        bricks.push(new Concrete(game, position));
      }
    });
  });
  return bricks;
}

export default class Level1 {
  constructor(game) {
    this.game = game;
    this.speed = {
      x: 0.5,
      y: -1
    };
    this.brickArrangement = [
      [0, 1, 0, 0, 0, 0, 1, 0],
      [1, 1, 1, 0, 0, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1]
    ];
  }
}

export class Level2 {
  constructor(game) {
    this.game = game;
    this.speed = {
      x: 2,
      y: -3
    };
    this.brickArrangement = [
      [0, 0, 1, 1, 1, 1, 0, 0],
      [0, 2, 0, 0, 0, 0, 2, 0],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [2, 1, 2, 1, 1, 2, 1, 2]
    ];
  }
}

export class Level3 {
  constructor(game) {
    this.game = game;
    this.speed = {
      x: 2,
      y: -3
    };
    this.brickArrangement = [
      [1, 0, 2, 1, 1, 2, 0, 1],
      [0, 2, 0, 0, 0, 0, 2, 0],
      [1, 1, 1, 2, 2, 1, 1, 1],
      [2, 1, 2, 1, 1, 2, 1, 2]
    ];
  }
}
