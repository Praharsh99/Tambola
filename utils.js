import { winTitles, numbersList, numbersRead } from "./variables.js";
import showAlert from "./alerts.js";

// POPULATES NUMBERS TO BOARD USE THIS FOR NEW GAME!!!
const tambolaBoard = document.querySelector(".board");

export const populateBoard = () => {
  var j = 1;
  for (var i = 1; i < 91; i++) {
    // Creating the number block and inserting the number into it
    const numberBlock = document.createElement("span");
    numberBlock.className = "number-block";
    numberBlock.id = i;
    numberBlock.textContent = i;

    // Adding all number to numbersRead list
    numbersList[j].push(i);

    if (i % 10 === 0) {
      j += 1;
    }

    // Adding it to the board
    tambolaBoard.appendChild(numberBlock);
  }
};

// This function will generate the amount won by each title
export const populateWinningTitlesPrices = () => {
  const moneyCollected = document.getElementById("money").value;

  if (moneyCollected) {
    winTitles["Jaldi-5"] = (moneyCollected * 10) / 100;
    winTitles["1st Line"] = (moneyCollected * 15) / 100;
    winTitles["2nd Line"] = (moneyCollected * 15) / 100;
    winTitles["3rd Line"] = (moneyCollected * 15) / 100;
    winTitles["House Full 1"] = (moneyCollected * 25) / 100;
    winTitles["House Full 2"] = (moneyCollected * 20) / 100;

    Object.keys(winTitles).forEach((title) => {
      document.getElementById(
        title
      ).textContent = `Amount: ${winTitles[title]}`;
    });
  } else {
    showAlert("Please enter the amount to calculate!!", "error");
  }
};

// CREATES A RANDOM NUMBER
const getRandomNumber = () => {
  let randNumForKeys = parseInt(Math.random() * 10);
  let randNumForValues = parseInt(Math.random() * 10);

  randNumForKeys = randNumForKeys === 0 ? randNumForKeys + 1 : randNumForKeys;

  return { randNumForKeys, randNumForValues };
};

// UPDATES THE HISTORY BOARD WITH NEW VALUES
const updateHistoryBoard = (current, prev, prev_2) => {
  document.querySelector("#current").textContent = current;
  document.querySelector("#prev").textContent = prev;
  document.querySelector("#prev-2").textContent = prev_2;
};

//  Call the random number generator and changes the style for that number on board
export const readNumber = () => {
  if (numbersRead.length < 90) {
    let currentNumber;
    let isNewNumber = true;

    // Get a random number untill it is a new one!
    while (isNewNumber) {
      let { randNumForKeys, randNumForValues } = getRandomNumber();
      currentNumber = numbersList[randNumForKeys][randNumForValues];

      isNewNumber = numbersRead.includes(currentNumber);
    }

    // Push that number to the read list and add a style to it
    numbersRead.push(currentNumber);
    document.getElementById(currentNumber).classList.add("number-highlight");
    if (numbersRead[numbersRead.length - 2]) {
      document.getElementById(numbersRead[numbersRead.length - 2]).className =
        "number-block number-read";
    }
    // Update the history board
    updateHistoryBoard(
      currentNumber,
      numbersRead[numbersRead.length - 2] || "-",
      numbersRead[numbersRead.length - 3] || "-"
    );
  } else {
    console.log("Game over");
  }
};
