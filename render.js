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
 * @param {() => void} stepOn 
 * @param {() => void} mark 
 */
export function updateTile(element, value, lastStep, stepOn, mark) {
    if (value & VISIBLE) {
        element.className = "tile-opened";
        element.onmouseup = null;
        element.style.color = getColor(value >> 4);

        if (value & MINED) {
            element.innerText = lastStep ? "💥" : "💣"

            if (lastStep) {
                element.classList.add("tile-exploded");
            }
        } else if (value & FLAG) {
            element.classList.add("tile-wrong");
            element.innerText = "💣";
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
        element.innerText = "🚩";
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

export function createCounter() {
    return document.createElement("div");
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