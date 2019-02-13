/* eslint-env browser */
const board = document.getElementById('board');
const playerIndicator = document.getElementById('player-indicator');
const boardCols = 7;
const boardRows = 6;


// Setup Board
// bounds: i j
// direction: i j
let boardHTML = '';
for (let row = boardRows - 1; row >= 0; row -= 1) {
  for (let col = 0; col < boardCols; col += 1) {
    boardHTML += `
      <div class="slot">
        <label for="slot${col}${row}">
            <input onChange="runTurn(this)" type="checkbox" ${row > 0 ? 'disabled' : ''} name="slot${col}${row}" 
                d="slot${col}${row}" data-row="${row}" data-col="${col}">
        </label>
      </div>
    `;
  }
}

// Set the html
board.innerHTML = boardHTML;

let player1Turn = true;

function runTurn(input) {
  // Change color of the label
  input.parentElement.className = player1Turn ? 'player1' : 'player2';

  // Change what's disabled
  // disable the input
  input.disabled = true;

  // Enable the slot at (row + 1, col)
  // const row = input.dataset.row;
  // const col = input.dataset.col;
  const { row, col } = input.dataset;
  if (row < boardRows - 1) {
    const neighbor = document.getElementById(`slot${col}${parseInt(row) + 1}`);
    neighbor.disabled = false;
  }

  // check if it's a win
  const isWin = checkWin(parseInt(col), parseInt(row), player1Turn ? 'player1' : 'player2');
  if (isWin) {
    alert('Winner!');
    return;
  }

  // update win text

  // change who's turn it is
  player1Turn = !player1Turn;

  // Update player-indicator text
  if (player1Turn) {
    playerIndicator.innerText = 'Player 1';
    playerIndicator.className = 'player1';
  } else {
    playerIndicator.innerText = 'Player 2';
    playerIndicator.className = 'player2';
  }
}

function checkWin(col, row, currPlayer) {
  // check down
  return checkDown(col, row, currPlayer) || checkAcross(col, row, currPlayer)
   || checkDiagonal(col, row, currPlayer);
  // check across
  // check diagonal
}

function checkDown(col, row, currPlayer) {
  if (row < 3) return false;

  for (let j = row - 1; j > row - 4; j -= 1) {
    const currSlotPlayer = document.getElementById(`slot${col}${j}`).parentElement.className;
    if (currSlotPlayer !== currPlayer) return false;
  }
  return true;
}

function checkAcross(col, row, currPlayer) {
  let sameColorNeighbors = 0;

  // Check to the right
  for (let i = col + 1; i < col + 4; i += 1) {
  // break if out of bounds
    if (i >= boardCols) break;
    const currSlotPlayer = document.getElementById(`slot${i}${row}`).parentElement.className;
    if (currSlotPlayer === currPlayer) sameColorNeighbors += 1;
    else break;
  }

  // Check to the left
  for (let i = col - 1; i > col - 4; i -= 1) {
  // break if out of bounds
    if (i < 0) break;
    const currSlotPlayer = document.getElementById(`slot${i}${row}`).parentElement.className;
    if (currSlotPlayer === currPlayer) sameColorNeighbors += 1;
    else break;
  }

  return sameColorNeighbors >= 3;
}

function checkDiagonal(col, row, currPlayer) {
  return checkUpLeft(col, row, currPlayer) || checkUpRight(col, row, currPlayer);
}

function checkUpLeft(col, row, currPlayer) {
  let sameColorNeighbors = 0;
  // Search Up Left
  for (let i = 1; i < 4; i += 1) {
    if (col - i < 0 || row + i >= boardCols) break;
    const currSlotPlayer = document.getElementById(`slot${col - i}${row + i}`).parentElement.className;
    if (currSlotPlayer === currPlayer) sameColorNeighbors += 1;
    else break;
  }

  // Search Down Right
  for (let i = 1; i < 4; i += 1) {
    if (col + i >= boardCols || row - i < 0) break;
    const currSlotPlayer = document.getElementById(`slot${col + i}${row - i}`).parentElement.className;
    if (currSlotPlayer === currPlayer) sameColorNeighbors += 1;
    else break;
  }

  return sameColorNeighbors >= 3;
}

function checkUpRight(col, row, currPlayer) {
  let sameColorNeighbors = 0;
  // Search Up Right
  for (let i = 1; i < 4; i += 1) {
    if (col + i >= boardCols || row + i >= boardRows) break;
    const currSlotPlayer = document.getElementById(`slot${col + i}${row + i}`).parentElement.className;
    if (currSlotPlayer === currPlayer) sameColorNeighbors += 1;
    else break;
  }

  // Search Down Right
  for (let i = 1; i < 4; i += 1) {
    if (col - i < 0 || row - i < 0) break;
    const currSlotPlayer = document.getElementById(`slot${col - i}${row - i}`).parentElement.className;
    if (currSlotPlayer === currPlayer) sameColorNeighbors += 1;
    else break;
  }

  return sameColorNeighbors >= 3;
}
