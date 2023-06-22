const MINED = 0b0000001;
const VISIBLE = 0b0000010;
const FLAG = 0b0000100;
const QUESTION = 0b0001000;

/**
 * 
 * @param {number} width 
 * @param {number} height
 * @param {number} minesCount 
 * 
 * @returns {Uint8Array}
 */
function createField(width, height, minesCount) {
  const field = new Uint8Array(width * height);
  field.fill(MINED | VISIBLE, 0, minesCount);

  return shuffle(field);
}

/**
 * @type {<T>(T[]) => T[]}
 */
function shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

/**
 * 
 * @returns {HTMLDivElement}
 */
function createTile() {
  return document.createElement("div");
}

/**
 * 
 * @param {HTMLDivElement} element 
 * @param {number} value 
 * @param {(mark: boolean) => void} probe 
 */
function updateTile(element, value, probe) {
  if (!(value & VISIBLE)) {
    element.className = "tile";
    element.onmouseup = (event) => {
      if (event.button === 0 || event.button === 2)
        probe(Boolean(event.button))
    }
  } else {
    element.className = "tile-opened";
    element.onmousedown = undefined;

    if (value & MINED) {
      element.innerText = "O"
    }
  }
}

/**
 * 
 * @param {number} width 
 * @param {number} height
 * 
 * @returns {HTMLDivElement}
 */
function createContainer(width, height) {
  const container = document.createElement("div");

  container.className = "container";
  container.style.setProperty("--columns", width);
  container.style.setProperty("--rows", height);

  container.oncontextmenu = (event) => event.preventDefault();

  return container;
}

/**
 * 
 * @param {number} index 
 * @param {Uint8Array}} array 
 */
function fillArea(index, array) {

}

/**
 * 
 * @param {number} index 
 * @param {Uint8Array} array 
 * @param {number} width 
 */
function getNumberOfMinesAround(index, array, width) {
  const topLeft = index % width > 0 && index >= width ? array[index - 1 - width] : 0;
  const top = index >= width ? array[index - width] : 0;
  const topRight = (index + 1) % width !== 0 && index >= width ? array[index + 1 - width] : 0;
  const right = (index + 1) % width !== 0 ? array[index + 1] : 0;
  const bottomRight = (index + 1) % width !== 0 !== 0 && index < (array.length - width) ? array[index + 1 + width] : 0;
  const bottom = index < (array.length - width) ? array[index + width] : 0;
  const bottomLeft = index % width > 0 && index < (array.length - width) ? array[index - 1 + width] : 0;
  const left = index % width > 0 ? array[index - 1] : 0;

  return (topLeft & MINED) + (top & MINED) + (topRight & MINED) + (right & MINED) + (bottomRight & MINED) +
    (bottom & MINED) + (bottomLeft & MINED) + (left & MINED);
}



class MineSweeper {
  field;
  /**
   * @type {(field: Uint8Array) => void}
   */
  onChange;

  constructor(width, height, minesCount) {
    this.field = createField(width, height, minesCount);
  }

  probe(index, mark) {
    const item = this.field[index];

    if (!mark) {

    } else {
      this.field[index] |= FLAG;
    }

    this.onChange?.(this.field);
  }
}

function main() {
  const width = 10;
  const height = 10;

  const field = createField(width, height, 10);
  const container = createContainer(width, height);
  /**
   * @type {HTMLDivElement[]}
   */
  const tiles = new Array();


  for (let i = 0; i < field.length; i++) {
    const tile = createTile()

    updateTile(tile, field[i], (mark) => {
      console.log("item:", i, "marked:", mark);

      console.log(getNumberOfMinesAround(i, field, width));
    });

    tiles.push(tile);
    container.appendChild(tile);
  }

  document.body.appendChild(container);
}

main();