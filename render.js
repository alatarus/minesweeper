import { FLAG, MINED, QUESTION, VISIBLE } from "./minesweeper.js";

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
 * @param {() => void} stepOn 
 * @param {() => void} mark 
 */
export function updateTile(element, value, stepOn, mark) {
    if (value & VISIBLE) {
        element.className = "tile-opened";
        element.onmousedown = undefined;

        if (value & MINED) {
            element.innerText = "☼"
        } else if ((value >> 4) > 0) {
            element.innerText = (value >> 4).toString();
        } else {
            element.innerText = "";
        }
    } else if (value & FLAG) {
        element.className = "tile";
        element.onmouseup = (event) => {
            if (event.button === 2) {
                mark();
            }
        }
        element.innerText = "F";
    } else {
        element.className = "tile";
        element.onmouseup = (event) => {
            if (event.button === 0) {
                stepOn();
            } else if (event.button === 2) {
                mark();
            }
        }
        element.innerText = value & QUESTION ? "?" : "";
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