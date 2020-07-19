const getLocalStorage = (storageName) => {
  return localStorage.getItem(storageName);
};

const setLocalStorage = (storageName, storageData) => {
  storageData = JSON.stringify(storageData);
  localStorage.setItem(storageName, storageData);
};

export const storeLocally = (moneyCollected, titlesAndPrizes, winners) => {
  let localData = getLocalStorage("TAMBOLA_STORAGE_DATA");

  localData = localData ? JSON.parse(localData) : {};

  const key = Object.keys(localData).length + 1;
  const playedAt = new Date().toJSON().split("T");
  playedAt[1] = playedAt[1].split(".")[0];

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
