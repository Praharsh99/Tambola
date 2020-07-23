import { showWinnersBoard } from "./modal.js";
import { toggleBoard } from "./reusable.functions.js";
import showAlert from "./alerts.js";

// GLOBAL VARIABLES
// This variable stores all the player's prize money in a key, value pair
let playerData = {};

// GETS DATA FROM LOCAL STORAGE
const getLocalStorage = (storageName) => {
  return localStorage.getItem(storageName);
};

// SETS DATA TO LOCAL STORAGE
const setLocalStorage = (storageName, storageData) => {
  storageData = JSON.stringify(storageData);
  localStorage.setItem(storageName, storageData);
};

// This function stores the sent data in the local storage
// Called by the save button in the modal, reqToStoreData() more precisely.
export const storeLocally = (moneyCollected, titlesAndPrizes) => {
  let localData = getLocalStorage("TAMBOLA_STORAGE_DATA");

  localData = localData ? JSON.parse(localData) : {};

  const key = Object.keys(localData).length + 1;
  const playedAt = new Date(Date.now()).toLocaleString();

  localData = {
    ...localData,
    [key]: {
      playedAt,
      moneyCollected,
      gameData: {
        titlesAndPrizes,
      },
    },
  };

  setLocalStorage("TAMBOLA_STORAGE_DATA", localData);

  return true;
};

// Generates the all the game stats
export const gameStats = () => {
  const localData = JSON.parse(getLocalStorage("TAMBOLA_STORAGE_DATA"));

  if (localData) {
    const modalElement = document.getElementById("game-board-container");

    if (!modalElement) {
      // boardContainer -> modal black background
      const boardContainer = document.createElement("div");
      boardContainer.className = "game-board-container";
      boardContainer.id = "game-board-container";

      Object.keys(localData).forEach((game) => {
        const { playedAt, gameData } = localData[game];

        const title = `<span class="sub-title sub-title-1">${
          playedAt.split(",")[0]
        }</span>🏆&nbsp;<span class="main-title">GAME ${game}</span>&nbsp;🏆<span class="sub-title sub-title-2">${
          playedAt.split(",")[1]
        }</span>`;

        const childElement = showWinnersBoard(
          title,
          gameData.titlesAndPrizes,
          false,
          false
        );

        boardContainer.appendChild(childElement);
      });

      // Appending modal to the DOM
      document.querySelector("body").appendChild(boardContainer);
    } else {
      toggleBoard(modalElement);
    }
  } else {
    showAlert("Sorry! There is no data to display 😥😥", "info");
  }
};

// This function just updates the playerData object
// Checking if the player's name is already in the player's data list
// if not creating new entry, if there, updating with new value(old + new)
const addToPlayerData = (playerName, moneyToBeAdded) => {
  playerData[playerName]
    ? (playerData[playerName].earned =
        playerData[playerName].earned + moneyToBeAdded)
    : (playerData[playerName] = {
        earned: moneyToBeAdded,
        invested: undefined,
      });
};

// Generates all the player stats
export const playerStats = () => {
  const playerElement = document.getElementById("player-board-container");

  if (JSON.stringify(playerData) === "{}" && !playerElement) {
    const localData = JSON.parse(getLocalStorage("TAMBOLA_STORAGE_DATA"));

    // Looping over every game to get all titles(titlesAndPrizes object) of that game
    Object.keys(localData).forEach((game) => {
      // Looping over every title(jaldi_5, 1st_line,...) to get the player data and prize money({ winner, prizeMoney })
      Object.keys(localData[game].gameData.titlesAndPrizes).forEach((title) => {
        // Grabbing the winner and prizeMoney for the current title
        let { winner, prizeMoney } = localData[game].gameData.titlesAndPrizes[
          title
        ];

        // Checking if the winner for a title has multiple winners
        // Updating the playerData object
        winner.includes("&")
          ? ((winner = winner.split(" & ")),
            winner.forEach((name) =>
              addToPlayerData(name, Math.floor(prizeMoney / winner.length))
            ))
          : addToPlayerData(winner, prizeMoney);
      });
    });

    // boardContainer -> modal black background
    const boardContainer = document.createElement("div");
    boardContainer.className = "game-board-container";
    boardContainer.id = "player-board-container";

    const title = `🏆&nbsp;<span class="main-title">PLAYER STATS</span>&nbsp;🏆`;
    const childElement = showWinnersBoard(title, playerData, true, false);
    boardContainer.appendChild(childElement);

    // Appending modal to the DOM
    document.querySelector("body").appendChild(boardContainer);
  } else {
    toggleBoard(playerElement);
  }
};
