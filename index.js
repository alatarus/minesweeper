import { FLAG, MineSweeper } from "./minesweeper.js";
import { createTile, createContainer, updateTile, createCounter, createLabel, createActionSelector, createHeader } from "./render.js";

function main() {
  const width = 16;
  const height = 16;
  const minesCount = 40;

  const game = new MineSweeper(width, height, minesCount);
  const field = game.field;
  const container = createContainer(width, height);
  const header = createHeader();
  const counterLabel = createLabel("Mines left:")
  const counter = createCounter();
  const actionSelectorLabel = createLabel("Choose touch action:");
  const actionSelector = createActionSelector();
  /**
   * @type {HTMLDivElement[]}
   */
  const tiles = Array.from(field, (value, i) => {
    const tile = createTile();

    updateTile(tile, value, false, () => {
      if (actionSelector.checked) {
        game.mark(i);
      } else {
        game.stepOn(i);
      }
    }, () => game.mark(i));

    container.appendChild(tile);

    return tile;
  });

  game.onChange = (field, lastStep) => {
    tiles.forEach((tile, i) => updateTile(tile, field[i], i === lastStep, () => {
      if (actionSelector.checked) {
        game.mark(i);
      } else {
        game.stepOn(i);
      }
    }, () => game.mark(i)));
    const flags = field.reduce((acc, value) => {
      return acc + ((value & FLAG) > 0 ? 1 : 0);
    }, 0);
    counter.textContent = (minesCount - flags).toString();
  };

  counter.textContent = minesCount.toString();

  actionSelectorLabel.appendChild(actionSelector);
  counterLabel.appendChild(counter);

  header.appendChild(counterLabel);
  header.appendChild(actionSelectorLabel);

  document.body.appendChild(header);
  document.body.appendChild(container);
}

main();