const board = document.getElementById('board');
const playerIndicator = document.getElementById('player-indicator');
const boardCols = 7;
const boardRows = 6;


// Setup Board
// bounds: i j
// direction: i j
let boardHTML = '';
for (let row = boardRows - 1; row >= 0; row--) {
    for(let col = 0; col < boardCols; col++){
        // prettier-ignore
        boardHTML += `
        <div class="slot">
            <label for="slot${col}${row}">
                <input onChange="runTurn(this)" type="checkbox" ${row > 0 ? 'disabled' : ''} name="slot${col}${row}" 
                id="slot${col}${row}" data-row="${row}" data-col="${col}">
            </label>
        </div>
        `;
    }
}

// Set the html
board.innerHTML = boardHTML;

let player1Turn = true;
let playerSwitch = true;
function runTurn(input){
    // Change color of the label
    input.parentElement.className = player1Turn ? 'player1' : 'player2';

    // change who's turn it is
    player1Turn = !player1Turn; 

    // Update player-indicator text
    if (player1Turn) {
        playerIndicator.innerText = 'Player 1';
        playerIndicator.className = 'player1';
    } else {
        playerIndicator.innerText = "Player 2";
        playerIndicator.className = 'player2';
    }

    // Change what's disabled
    // disable the input
    input.disabled = true;

    // Enable the slot at (row + 1, col)
    // const row = input.dataset.row;
    // const col = input.dataset.col;
    const { row,col } = input.dataset;
    // console.log(row, col);
    if (row < boardRows - 1) {
    const neighbor = document.getElementById(`slot${col}${parseInt(row) + 1}`);
    // console.log(neighbor);
    neighbor.disabled = false;
    }
}