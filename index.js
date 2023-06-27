import { FLAG, MineSweeper } from "./minesweeper.js";
import { createTile, createContainer, updateTile, createCounter } from "./render.js";

function main() {
  const width = 16;
  const height = 16;
  const minesCount = 40;

  const game = new MineSweeper(width, height, minesCount);
  const field = game.field
  const container = createContainer(width, height);
  const counter = createCounter();
  /**
   * @type {HTMLDivElement[]}
   */
  const tiles = Array.from(field, (value, i) => {
    const tile = createTile();

    updateTile(tile, value, () => game.stepOn(i), () => game.mark(i));

    container.appendChild(tile);

    return tile;
  });

  game.onChange = (field) => {
    tiles.forEach((tile, i) => updateTile(tile, field[i], () => game.stepOn(i), () => game.mark(i)));
    const flags = field.reduce((acc, value) => {
      return acc + ((value & FLAG) > 0 ? 1 : 0);
    }, 0);
    counter.innerText = (minesCount - flags).toString();
    console.log("minesCount:", minesCount, "flags:", flags);
  };

  counter.innerText = minesCount.toString();
  document.body.appendChild(counter);
  document.body.appendChild(container);
}

main();