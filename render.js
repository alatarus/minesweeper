import { FLAG, MINED, QUESTION, VISIBLE } from "./minesweeper.js";

function getColor(num) {
    switch (num) {
        case 1:
            return "blue";
        case 2:
            return "green";
        case 3:
            return "orangered";
        case 4:
            return "indigo";
        case 5:
            return "brown";
        case 6:
            return "cadetblue";
        case 8:
            return "darkgray";
        default:
            return "black";
    }
}

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
 * @param {boolean} lastStep 
 * @param {(event: MouseEvent) => void} callback 
 */
export function updateTile(element, value, lastStep, callback) {
    if (value & VISIBLE) {
        element.className = "tile-opened";
        element.onmouseup = null;
        element.style.color = getColor(value >> 4);

        if (value & MINED) {
            element.textContent = lastStep ? "💥" : "💣"

            if (lastStep) {
                element.classList.add("tile-exploded");
            }
        } else if (value & FLAG) {
            element.classList.add("tile-wrong");
            element.textContent = "💣";
        } else if ((value >> 4) > 0) {
            element.textContent = (value >> 4).toString();
        } else {
            element.textContent = null;
        }
    } else if (value & FLAG) {
        element.className = "tile";
        element.onmouseup = callback;
        element.textContent = "🚩";
    } else {
        element.className = "tile";
        element.onmouseup = callback;
        element.textContent = value & QUESTION ? "?" : "";
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