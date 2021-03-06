import {
  readNumber,
  populateWinningTitlesPrices,
  populateBoard,
  newGame,
  manual,
  automatic,
  undoMove,
  toggleSpeaker,
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
const randBtn = document.getElementById("rand");
if (randBtn) {
  randBtn.addEventListener("click", () => {
    readNumber();
  });
}

// Calculates the prices for each winning title depending on the collected amount
document.getElementById("calculate").addEventListener("click", () => {
  populateWinningTitlesPrices();
});

// This will check for all the winners and end the game
document.getElementById("end-game").addEventListener("click", () => {
  endGame();
});

// Adding the event listener for calling the numbers on keypress instead of clicking the button
document.onkeydown = (event) => {
  const randBtnExists = document.getElementById("rand");

  if (event.ctrlKey && event.key === " " && randBtnExists) {
    randBtn.click();
  }
};

const optionsContainer = document.querySelector(".options-container");
if (optionsContainer) {
  optionsContainer.addEventListener("mouseover", () => {
    optionsContainer.style.transform = "translateX(-50%) translateY(0)";
    optionsContainer.style.transitionDelay = "0.1s";
    optionsContainer.style.opacity = 1;
  });

  optionsContainer.addEventListener("mouseleave", () => {
    optionsContainer.style.transform = "";
    optionsContainer.style.transitionDelay = "1s";
    optionsContainer.style.opacity = "";
  });
}

const undoBtn = document.getElementById("undo");
if (undoBtn) {
  undoBtn.addEventListener("click", () => {
    undoMove();
  });
}

const speaker = document.getElementById("speaker");
if (speaker) {
  speaker.addEventListener("click", () => {
    const status = speaker.dataset.status;
    status
      ? ((speaker.dataset.status = ""),
        (speaker.firstElementChild.src = "./svg/mute.svg"))
      : ((speaker.dataset.status = "on"),
        (speaker.firstElementChild.src = "./svg/speaker.svg"));

    toggleSpeaker();
  });
}

const playersDropdown = document.getElementById("dropdown");
if (playersDropdown) {
  playersDropdown.addEventListener("click", (event) => {
    let childWhichWasClicked = event.target;

    if (childWhichWasClicked.className === "player-name") {
      let sibilingInput =
        childWhichWasClicked.offsetParent.previousElementSibling;

      sibilingInput.value = sibilingInput.value
        ? `${sibilingInput.value.trim()} & ${childWhichWasClicked.textContent}`
        : childWhichWasClicked.textContent;
    }
  });
}

const callDB = () => {
  const prevData = JSON.stringify(GAME_DATA);
  localStorage.removeItem("TAMBOLA_STORAGE_DATA");
  localStorage.setItem("TAMBOLA_STORAGE_DATA", prevData);
};

// CODE FOR POPULATING THE PREVIOUS GAME DATA TO LOCAL STORAGE
window.callDB = callDB;
