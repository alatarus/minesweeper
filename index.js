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
  const tiles = Array.from(field, (element, i) => {
    const tile = createTile()

    updateTile(tile, element, (mark) => {
      game.probe(i, mark);
    });

    container.appendChild(tile);

    return tile;
  });

  game.onChange = (field) => {
    tiles.forEach((tile, i) => updateTile(tile, field[i], (mark) => {
      game.probe(i, mark);
    }));
  };

  document.body.appendChild(container);
}

main();