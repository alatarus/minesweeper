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
  field.fill(MINED, 0, minesCount);

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
 * @param {Uint8Array} field 
 * @param {number} width 
 * @returns 
 */
function pick(index, field, width) {
  if (field[index] & VISIBLE) {
    return;
  }

  const adjacents = getAdjacentIndexes(index, field.length, width);
  const minesNumber = adjacents.reduce((acc, current) => {
    return acc + (field[current] & MINED);
  }, 0);

  field[index] |= VISIBLE;

  if (minesNumber > 0) {
    field[index] |= (minesNumber << 4);
    return;
  }

  adjacents.forEach((value) => {
    pick(value, field, width);
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
  if ((index + 1) % width !== 0 && index < (length - width)) {
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

function openAll(field, width) {
  for (let i = 0; i < field.length; i++) {
    if (field[i] & VISIBLE) {
      continue;
    }

    field[i] |= VISIBLE;

    if (!(field[i] & MINED)) {
      const adjacents = getAdjacentIndexes(i, field.length, width);
      const minesNumber = adjacents.reduce((acc, current) => {
        return acc + (field[current] & MINED);
      }, 0);
    
      field[i] |= (minesNumber << 4);
    }
  }
}


export class MineSweeper {
  field;
  width;
  height;
  /**
   * @type {(field: Uint8Array) => void}
   */
  onChange;

  constructor(width, height, minesCount) {
    this.field = createField(width, height, minesCount);
    this.width = width;
    this.height = height;
  }

  stepOn(index) {
    if (this.field[index] & MINED) {
      openAll(this.field, this.width);
    } else {
      pick(index, this.field, this.width)
    }

    this.onChange?.(this.field);
  }

  mark(index) {
    if (this.field[index] & FLAG) {
      this.field[index] ^= FLAG | QUESTION;
    } else if (this.field[index] & QUESTION) {
      this.field[index] ^= QUESTION;
    } else {
      this.field[index] |= FLAG;
    }
    this.onChange?.(this.field);
  }
}