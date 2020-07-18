import {
  readNumber,
  populateWinningTitlesPrices,
  populateBoard,
  manual,
  automatic,
} from "./utils.js";

// EVENT LISTENERS

// This call will generate the numbers [1 - 90] and create a block element for that numbers and put those on the board
document.addEventListener("DOMContentLoaded", () => {
  populateBoard();
});

// This will start a new game
document
  .getElementById("newgame")
  .addEventListener("click", () => location.reload());

// MANUAL GAME
document.getElementById("manual").addEventListener("click", () => {
  manual();
});

// AUTOMATIC GAME
document.getElementById("automatic").addEventListener("click", () => {
  automatic();
});

// Get a random number and edits the style for that number, updates history board
document.getElementById("rand").addEventListener("click", () => {
  readNumber();
});

// Calculates the prices for each winning title depending on the collected amount
document.getElementById("calculate").addEventListener("click", () => {
  populateWinningTitlesPrices();
});
