import setupBoard from './setupBoard.js';
import runTurn from './runTurn.js';
import resetBoard from './resetBoard.js'
import './form.js';

// ======================================================

const board = document.getElementById("board");

// ======================================================

// Event listeners
document.getElementById("reset-button").addEventListener("click", resetBoard);

// document.getElementById("open-button").addEventListener("click", openForm);

// document.getElementById("btn-cancel").addEventListener("click", closeForm);

// document.getElementById('submit').addEventListener('submit', submitForm);

// ======================================================

function initalize() {

  // document.getElementById(
  //   "turn-indicator"
  // ).innerHTML = `<span class="player1" id="player-indicator">Player 1</span> turn`;

  // set the board's HTML
  board.innerHTML = setupBoard();

  // adds listeners to each slot
  document
    .querySelectorAll("input")
    .forEach(input => input.addEventListener("change", runTurn));

}

// ======================================================

// Initalize the board
initalize();

// ======================================================