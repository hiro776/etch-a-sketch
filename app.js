/*
 * etch-a-sketch app
 * - draw some cool pixel art with hovering your mouse
 */

// Author: R Mehta

const MAX_GRID_SIZE = 64;

// Colors:
const colorList = [
    'black', 'red', 'blue', 'green', 'orange', 'yellow', 'pink',
    'purple', 'violet', 'turquoise', 'gold', 'lime', 'aqua',
    'navy', 'coral', 'teal', 'brown', 'cadetblue', 'darkred',
    'azure', 'bisque', 'blueviolet', 'blurywood', 'chocolate',
    'cornflowerblue', 'cyan', 'chartreuse', 'white'
];

let penColor = colorList[0];

// display current penColor
const color = document.querySelector('span.preview');
const displayPenColor = () => {
    color.style.background = penColor;
}
displayPenColor();



// get the all of the buttons
const colorBtn = document.getElementById('color');
const rainbowBtn = document.getElementById('rainbow');
const eraseBtn = document.getElementById('erase');
const clearBtn = document.getElementById('clear');
const resizeBtn = document.getElementById('resize');

// remove all inline button styles
const removeBtnStyle = () => {
    colorBtn.style.cssText = '';
    rainbowBtn.style.cssText = '';
    eraseBtn.style.cssText = '';
}
// first default set to color
colorBtn.style.cssText = 'border: 2px solid #c26060';

// Add onlclick event to all of the buttons
colorBtn.onclick = function () {
    console.log('color clicked');
    removeBtnStyle();


    colorBtn.style.cssText = 'border: 2px solid #c26060';
}

let rainbow = false;  // rainbow mode off by default
const rainbowOn = () => {
    rainbowBtn.textContent = 'Rainbow On';
    rainbow = true;
}
const rainbowOff = () => {
    rainbowBtn.textContent = 'Rainbow Off';
    rainbow = false;
}
rainbowBtn.onclick = function () {
    console.log('rainbow clicked');
    removeBtnStyle();
    if (rainbow === false) {
        rainbowOn();
    }
    else {
        rainbowOff();
    }

    rainbowBtn.style.cssText = 'border: 2px solid #c26060';
}

eraseBtn.onclick = function () {
    console.log('erase clicked');
    removeBtnStyle();
    rainbowOff();
    penColor = document.documentElement.style.background;
    displayPenColor();

    eraseBtn.style.cssText = 'border: 2px solid #c26060';
}


// get the grid-container
const grid = document.querySelector('.grid');

// clear button clears all the grid color
clearBtn.onclick = function () {
    console.log('clear clicked');
    const gridItems = Array.from(document.querySelectorAll('.grid-item'));
    gridItems.forEach((e) => {
        e.style.background = '';
    })
}

resizeBtn.onclick = function () {
    console.log('resize clicked');

    // delete all grid first if any
    const gridItem = Array.from(document.querySelectorAll('.grid-item'));
    gridItem.forEach((e) => grid.removeChild(e));

    // ask for new size
    let usrInput = parseInt(prompt('Enter a new grid size [1-64]: '));
    if (usrInput <= 0) {
        usrInput = 1;
    }
    else if (usrInput >= MAX_GRID_SIZE) {
        usrInput = MAX_GRID_SIZE;
    }

    makeGrid(usrInput);
}



// makeGrid()
//  argument: accepts the grid size, Integer Only (eg 16 for 16x16 grid)
//  -- Function to make the grid box of curGridSize**2
//      and add it to the gridContainer
const makeGrid = (size = 16) => {
    if (size < 0 || size > MAX_GRID_SIZE) {
        console.log('ERROR. NOT POSSIBLE');
        return;
    }

    grid.style.setProperty('--grid-item-length', size);

    const gridSize = size * size;
    for (let index = 0; index < gridSize; index++) {
        // create a new div element
        const div = document.createElement('div');
        div.classList.add('grid-item');

        div.addEventListener('mouseover', (e) => {
            console.log(e.target);
            if (rainbow) {
                penColor = colorList[Math.floor(Math.random() * colorList.length)];
                displayPenColor();
            }
            e.target.style.background = penColor;
        });

        // append it to the grid
        grid.appendChild(div);
    }
}

makeGrid();