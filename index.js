import { MineSweeper } from "./minesweeper.js";
import { createTile, createContainer, updateTile } from "./render.js";

function main() {
  const width = 10;
  const height = 10;

  const game = new MineSweeper(width, height, 10);
  const field = game.field
  const container = createContainer(width, height);
  /**
   * @type {HTMLDivElement[]}
   */
  const tiles = new Array();


  for (let i = 0; i < field.length; i++) {
    const tile = createTile()

    updateTile(tile, field[i], (mark) => {
      game.probe(i, mark);
    });

    tiles.push(tile);
    container.appendChild(tile);
  }

  game.onChange = (field) => {
    tiles.forEach((tile, i) => updateTile(tile, field[i], (mark) => {
      game.probe(i, mark);
    }));
  };

  document.body.appendChild(container);
}

main();