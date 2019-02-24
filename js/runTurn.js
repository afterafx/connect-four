import checkWin from './win-logic.js';
import {
  BOARDCOLS,
  BOARDROWS
} from './constants.js';

// ======================================================

const playerIndicator = document.getElementById("player-indicator");

// ======================================================

let player1Turn = true;

export default function runTurn(event) {
  // eslint-disable-next-line no-unused-vars

  // change color of label
  const input = event.target;
  input.parentElement.className = player1Turn ? "player1" : "player2";

  // disable the input
  input.disabled = true;

  // enable the slot at (row + 1, col)
  const {
    col,
    row
  } = input.dataset;

  // check if input is on the top row
  if (row < BOARDROWS - 1) {
    const neighbor = document.getElementById(`slot${col}${parseInt(row) + 1}`);
    neighbor.disabled = false;
  }

  // check if it's a win
  const isWin = checkWin(
    parseInt(col),
    parseInt(row),
    player1Turn ? "player1" : "player2"
  );

  if (isWin) {
    // update win text
    const turnIndicator = document.getElementById("turn-indicator");

    const player = player1Turn ? "player1" : "player2";
    turnIndicator.innerHTML = `🎉 <span class="${player}" id="player-indicator">Player 1</span> wins 🎉`;

    // get all checkboxs
    const checkboxes = document.querySelectorAll(".slot input[type=checkbox]");

    // and disable all of them
    checkboxes.forEach(checkbox => {
      checkbox.disabled = true;
    });

    return;
  }

  // change whose turn it is
  player1Turn = !player1Turn;

  // update player-indicator text
  if (player1Turn) {
    playerIndicator.innerText = "Player 1";
    playerIndicator.className = "player1";
  } else {
    playerIndicator.innerText = "Player 2";
    playerIndicator.className = "player2";
  }

  window.runTurn = runTurn;

}