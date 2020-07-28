import {
  readNumber,
  populateWinningTitlesPrices,
  populateBoard,
  newGame,
  manual,
  automatic,
  endGame,
} from "./utils.js";

import GAME_DATA from "./gameData.js";
import { gameStats, playerStats } from "./persist.js";

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
  automatic();
});

// GAME STATS
document.getElementById("game-stats").addEventListener("click", () => {
  gameStats();
});

// PLAYER STATS
document.getElementById("player-stats").addEventListener("click", () => {
  playerStats();
});

// Get a random number and edits the style for that number, updates history board
document.getElementById("rand").addEventListener("click", () => {
  readNumber();
});

// Calculates the prices for each winning title depending on the collected amount
document.getElementById("calculate").addEventListener("click", () => {
  populateWinningTitlesPrices();
});

// This will check for all the winners and end the game
document.getElementById("end-game").addEventListener("click", () => {
  endGame();
});

// document.getElementById("btnn").onclick = function () {
//   speak();
// };

const callDB = () => {
  const prevData = JSON.stringify(GAME_DATA);
  localStorage.setItem("TAMBOLA_STORAGE_DATA", prevData);
};

// CODE FOR POPULATING THE PREVIOUS GAME DATA TO LOCAL STORAGE
window.callDB = callDB;
