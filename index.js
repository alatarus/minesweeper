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

function createTile() {
    const tile  = document.createElement("div");

    tile.className = "tile";

    return tile;
}

/**
 * 
 * @param {number} width 
 * @param {number} height
 */
function createContainer(width, height) {
    const container = document.createElement("div");

    container.className = "container";
    container.style.setProperty("--columns", width);
    container.style.setProperty("--rows", height);

    return container;
}

function main() {
    const width = 16;
    const height = 16;

    const field = createField(width, height);
    const container = createContainer(width, height);
    const tiles = new Array();

    for (const item of field) {
        const tile = createTile()
        tiles.push(tile);
        container.appendChild(tile);
    }
    
    document.body.appendChild(container);

    console.log("bla bla bla");
}

main();