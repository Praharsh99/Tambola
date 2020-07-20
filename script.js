import {
  callReadNumber,
  populateWinningTitlesPrices,
  populateBoard,
  newGame,
  manual,
  automatic,
  endGame,
} from "./utils.js";

// EVENT LISTENERS

// This call will generate the numbers [1 - 90] and create a block element for that numbers and put those on the board
document.addEventListener("DOMContentLoaded", () => {
  populateBoard();
});

// This will start a new game
document.getElementById("newgame").addEventListener("click", () => {
  newGame();
});

// MANUAL GAME
document.getElementById("manual").addEventListener("click", () => {
  manual();
});

// AUTOMATIC GAME
document.getElementById("automatic").addEventListener("click", () => {
  // automatic();
});

// Get a random number and edits the style for that number, updates history board
document.getElementById("rand").addEventListener("click", () => {
  callReadNumber();
});

// Calculates the prices for each winning title depending on the collected amount
document.getElementById("calculate").addEventListener("click", () => {
  populateWinningTitlesPrices();
});

// This will check for all the winners and end the game
document.getElementById("end-game").addEventListener("click", () => {
  endGame();
});
