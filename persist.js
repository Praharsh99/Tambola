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
  const localData = getLocalStorage("TAMBOLA_STORAGE_DATA");

  if (localData) {
    console.log(localData);
  } else {
    showAlert("Sorry! There is no data to display 😥😥", "info");
  }
};
