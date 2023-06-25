import { MINED, VISIBLE } from "./minesweeper.js";

/**
 * 
 * @returns {HTMLDivElement}
 */
export function createTile() {
    return document.createElement("div");
}

/**
 * 
 * @param {HTMLDivElement} element 
 * @param {number} value 
 * @param {(mark: boolean) => void} probe 
 */
export function updateTile(element, value, probe) {
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
            element.innerText = "֍"
        } else if ((value >> 4) > 0) {
            element.innerText = (value >> 4).toString();
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
export function createContainer(width, height) {
    const container = document.createElement("div");

    container.className = "container";
    container.style.setProperty("--columns", width);
    container.style.setProperty("--rows", height);

    container.oncontextmenu = (event) => event.preventDefault();

    return container;
}