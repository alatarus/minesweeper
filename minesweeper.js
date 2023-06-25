export const MINED = 0b0000001;
export const VISIBLE = 0b0000010;
export const FLAG = 0b0000100;
export const QUESTION = 0b0001000;

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
 * @param {number} index 
 * @param {Uint8Array} array 
 * @param {number} width 
 * @returns 
 */
function pick(index, array, width) {
  let item = array[index];

  if (item & VISIBLE) {
    return;
  }

  const adjacents = getAdjacentIndexes(index, array.length, width);
  const minesNumber = adjacents.reduce((acc, current) => {
    return acc += array[current] & MINED;
  }, 0);

  array[index] |= VISIBLE;

  if (minesNumber > 0) {
    array[index] |= (minesNumber << 4);
    return;
  }

  adjacents.forEach((value) => {
    pick(value, array, width);
  })
}

/**
 * 
 * @param {number} index 
 * @param {number} length 
 * @param {number} width 
 * @returns {number[]}
 */
function getAdjacentIndexes(index, length, width) {
  const result = new Array();

  // top left
  if (index % width > 0 && index >= width) {
    result.push(index - 1 - width);
  }

  // top
  if (index >= width) {
    result.push(index - width);
  }

  // top right
  if ((index + 1) % width !== 0 && index >= width) {
    result.push(index + 1 - width);
  }

  // right
  if ((index + 1) % width !== 0) {
    result.push(index + 1);
  }

  // bottom right
  if ((index + 1) % width !== 0 !== 0 && index < (length - width)) {
    result.push(index + 1 + width);
  }

  // bottom
  if (index < (length - width)) {
    result.push(index + width);
  }

  // bottom left
  if (index % width > 0 && index < (length - width)) {
    result.push(index - 1 + width);
  }

  // left
  if (index % width > 0) {
    result.push(index - 1);
  }

  return result;
}


export class MineSweeper {
  field;
  widht;
  height;
  /**
   * @type {(field: Uint8Array) => void}
   */
  onChange;

  constructor(width, height, minesCount) {
    this.field = createField(width, height, minesCount);
    this.widht = width;
    this.height = height;
  }

  probe(index, mark) {
    if (!mark) {
      pick(index, this.field, this.widht)
    } else {
      this.field[index] |= FLAG;
    }

    this.onChange?.(this.field);
  }
}