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
        element.onmouseup = (event) => {
            if (event.button === 2) {
                mark();
            }
        }
        element.textContent = "🚩";
    } else {
        element.className = "tile";
        element.onmouseup = (event) => {
            if (event.button === 0) {
                stepOn();
            } else if (event.button === 2) {
                mark();
            }
        }
        element.textContent = value & QUESTION ? "?" : "";
    }
}

export function createCounter() {
    return document.createElement("span");
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

export function createActionSelector() {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "actionSelector";

    return checkbox;
}

/**
 * 
 * @param {string} text 
 * @returns
 */
export function createLabel(text) {
    const label = document.createElement("label");
    label.textContent = text;

    return label;
}

export function createHeader() {
    const header = document.createElement("div");
    header.className = "header";

    return header;
}