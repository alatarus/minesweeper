import { FLAG, MineSweeper } from "./minesweeper.js";
import { createContainer, createTile, updateTile } from "./render.js";

/**
 * 
 * @param {number} width 
 * @param {number} height 
 * @param {number} minesCount 
 * @param {Element} placeholder 
 * @param {Element} counter 
 * @param {HTMLInputElement} actionSelector 
 */
function startGame(width, height, minesCount, placeholder, counter, actionSelector) {
  if (placeholder.childElementCount > 0) {
    for (const child of placeholder.children) {
      placeholder.removeChild(child);
    }
  }

  const game = new MineSweeper(width, height, minesCount);
  const container = createContainer(width, height);
  const field = game.field;
  /**
   * @type {HTMLDivElement[]}
   */
  const tiles = Array.from(field, (value, i) => {
    const tile = createTile();

    updateTile(tile, value, false, (event) => {
      if (event.button === 0) {
        if (actionSelector.checked) {
          game.mark(i);
        } else if ((value & FLAG) === 0) {
          game.stepOn(i);
        }
      } else if (event.button === 2) {
        game.mark(i);
      }
    });

    container.appendChild(tile);

    return tile;
  });

  game.onChange = (field, lastStep) => {
    tiles.forEach((tile, i) => updateTile(tile, field[i], i === lastStep, (event) => {
      if (event.button === 0) {
        if (actionSelector.checked) {
          game.mark(i);
        } else if ((field[i] & FLAG) === 0) {
          game.stepOn(i);
        }
      } else if (event.button === 2) {
        game.mark(i);
      }
    }));
    const flags = field.reduce((acc, value) => {
      return acc + ((value & FLAG) > 0 ? 1 : 0);
    }, 0);
    counter.textContent = (minesCount - flags).toString();
  };

  counter.textContent = minesCount.toString();

  placeholder.appendChild(container);
}

function main() {
  const width = 16;
  const height = 16;
  const minesCount = 40;

  const placeholder = document.querySelector("#placeholder");
  const counter = document.querySelector("#counter");
  const actionSelector = document.querySelector("#actionSelector");

  /**
   * @type {HTMLButtonElement | null}
   */
  const beginnerButton = document.querySelector("#beginner");
  /**
   * @type {HTMLButtonElement | null}
   */
  const intermidiateButton = document.querySelector("#intermidiate");
  /**
   * @type {HTMLButtonElement | null}
   */
  const expertButton = document.querySelector("#expert");

  if (!placeholder || !counter || !actionSelector||
    !beginnerButton || !intermidiateButton || !expertButton) {
    throw new Error("UI not found");
  }
  
  beginnerButton.onclick = () => {
    startGame(9, 9 ,10, placeholder, counter, actionSelector);
  }
  
  intermidiateButton.onclick = () => {
    startGame(16, 16 ,40, placeholder, counter, actionSelector);
  }
  
  expertButton.onclick = () => {
    startGame(30, 16 ,99, placeholder, counter, actionSelector);
  }
  
  startGame(9, 9 ,10, placeholder, counter, actionSelector);
}

main();