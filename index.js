/**
 * 
 * @param {number} width 
 * @param {number} height
 * 
 * @returns {Int8Array}
 */
function createField(width, height) {
  return new Int8Array(width * height)
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
 * @param {(mark: boolean) => void} update 
 */
function updateTile(element, value, update) {
  if (!value) {
    element.className = "tile";
    element.onmouseup = (event) => {
      if (event.button === 0 || event.button === 2)
      update(Boolean(event.button))
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

function main() {
  const width = 10;
  const height = 10;

  const field = createField(width, height);
  const container = createContainer(width, height);
  /**
   * @type {HTMLDivElement[]}
   */
  const tiles = new Array();


  for (let i = 0; i < field.length; i++) {
    const tile = createTile()

    updateTile(tile, field[i], (mark) => {
      console.log("item:", i, "marked:", mark);
    });

    tiles.push(tile);
    container.appendChild(tile);
  }

  document.body.appendChild(container);
}

main();