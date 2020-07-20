import { showWinnersBoard } from "./modal.js";
import showAlert from "./alerts.js";

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
  const winners = Object.keys(titlesAndPrizes).map((title) =>
    document.getElementById(`${title}_`).value.trim()
  );

  localData = {
    ...localData,
    [key]: {
      playedAt,
      moneyCollected,
      gameData: {
        titlesAndPrizes,
        winners,
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
    // boardContainer -> modal black background
    const boardContainer = document.createElement("div");
    boardContainer.className = "game-board-container";

    Object.keys(localData).forEach((game) => {
      const { playedAt, gameData } = localData[game];

      const title = `<span class="sub-title sub-title-1">${
        playedAt.split(",")[0]
      }</span> <span>🏆 GAME ${game} 🏆</span> <span class="sub-title sub-title-2">${
        playedAt.split(",")[1]
      }</span>`;

      const childElement = showWinnersBoard(
        title,
        gameData.titlesAndPrizes,
        gameData.winners,
        false
      );

      boardContainer.appendChild(childElement);
    });

    // Appending modal to the DOM
    document.querySelector("body").appendChild(boardContainer);
  } else {
    showAlert("Sorry! There is no data to display 😥😥", "info");
  }
};
