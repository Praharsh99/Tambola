import { winTitles, numbersRead } from "./variables.js";
import { showWinnersBoard } from "./modal.js";
import { toggleBoard } from "./reusable.functions.js";
import { storeLocally } from "./persist.js";
import showAlert from "./alerts.js";
import speak from "./speak.js";

// GLOBAL VARIABLES

// I declared this variable to prevent a number to appear after clicking the pause button
// This variable is manipulated in the buttonActions(), button eventListener more precisely
// This variable is used as a argument in the setInterval()'s readNumber([iWillDecide]) call;
// This variable becomes "0" when the pause button is clicked and "1" when resume button is clicked
// So, when the setInterval() method is about to call the readNumber(arg) method "0" is passed to the method
// Hence prevents the number overflow bug
let iWillDecide = 1;

// POPULATES NUMBERS TO BOARD USE THIS FOR NEW GAME!!!
const tambolaBoard = document.querySelector(".board");

export const populateBoard = () => {
  for (var i = 1; i < 91; i++) {
    // Creating the number block and inserting the number into it
    const numberBlock = document.createElement("span");
    numberBlock.className = "number-block";
    numberBlock.id = i;
    numberBlock.textContent = i;

    // Adding it to the board
    tambolaBoard.appendChild(numberBlock);
  }
};

// Calculate the money for title based on percentages
// winTitles -> prizeMoney prop is set here
const calculateMoney = (moneyCollected) => {
  winTitles._jaldi_5.prizeMoney = (moneyCollected * 10) / 100;
  winTitles._1st_line.prizeMoney = (moneyCollected * 15) / 100;
  winTitles._2nd_line.prizeMoney = (moneyCollected * 15) / 100;
  winTitles._3rd_line.prizeMoney = (moneyCollected * 15) / 100;
  winTitles._housefull_1.prizeMoney = (moneyCollected * 25) / 100;
  winTitles._housefull_2.prizeMoney = (moneyCollected * 20) / 100;
};

// This function will generate the amount won by each title and updates the [AMOUNT: NONE] HTML TEXT in DOM
export const populateWinningTitlesPrices = () => {
  const moneyCollected = document.getElementById("money").value;

  if (moneyCollected) {
    calculateMoney(moneyCollected);

    // "WINTITLES" IS USED HERE TO GRAB THE AMOUNT AND REPLACE THIS "AMOUNT:NONE"
    Object.keys(winTitles).forEach((title) => {
      document.getElementById(
        title
      ).textContent = `Amount: ${winTitles[title].prizeMoney}`;
    });

    document.getElementById("calculate").setAttribute("calculated", "yeah");
  } else {
    showAlert("Please enter the amount to calculate!!", "error");
  }
};

// CALL READ NUMBER FUNCTION FOR MANUAL CALLING READ NUMBER
export const callReadNumber = () => {
  readNumber(iWillDecide);
};

// CREATES A RANDOM NUMBER
const getRandomNumber = () => {
  let randNumForKeys = parseInt(Math.random() * 10);
  let randNumForValues = parseInt(Math.random() * 10);

  randNumForKeys =
    randNumForKeys === 9 && randNumForValues !== 0
      ? randNumForKeys - 1
      : randNumForKeys;

  return { randNumForKeys, randNumForValues };
};

// UPDATES THE NUMBER HISTORY BOARD WITH CURRENT NUMBER
const updateHistoryBoard = (current, prev, prev_2) => {
  document.querySelector("#current").textContent = current;
  document.querySelector("#prev").textContent = prev;
  document.querySelector("#prev-2").textContent = prev_2;
};

//  Call the random number generator and changes the style for that number on board
export const readNumber = (shouldIExecute) => {
  if (shouldIExecute) {
    if (numbersRead.length < 90) {
      let currentNumber;
      let isNewNumber = true;

      // Get a random number untill it is a new one!
      while (isNewNumber) {
        let { randNumForKeys, randNumForValues } = getRandomNumber();

        // randNumForKeys -> decides the tens place
        // randNumForValues -> decides the units place
        currentNumber = +`${randNumForKeys}${randNumForValues}`;

        if (!currentNumber) isNewNumber = true;
        else isNewNumber = numbersRead.includes(currentNumber);
      }

      // Push that number to the read list
      numbersRead.push(currentNumber);

      // Update the number on the board with new style
      document.getElementById(currentNumber).classList.add("number-highlight");

      // Update the previous highlighted element with red color
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

      speak();
    } else {
      showAlert(
        "All the numbers are read! Start a new game to play again",
        "success"
      );
    }
  }
};

// NEW GAME FUNCTION
export const newGame = () => {
  let response = confirm(
    "This will reset the game and the stats. Are you sure you want to reset! 😲😲"
  );

  response ? location.reload() : showAlert("Good Choice 😎", "success");
};

// TIMER FUNCTION
const startInterval = (timer) => {
  let clearId = setInterval(() => {
    readNumber(iWillDecide);
  }, timer * 1000);

  return clearId;
};

// MANUAL GAMEPLAY
export const manual = () => {
  let autoButton = document.getElementById("auto");

  if (autoButton) {
    iWillDecide = 1;
    autoButton.id = "rand";
    autoButton.textContent = "Call";
    autoButton.removeAttribute("timer-id");
    autoButton.removeEventListener("click", handleClickEvent);

    showAlert(
      "Switched to manual mode! To call the next number click the call button 👇🏻",
      "info"
    );
  } else {
    showAlert("Already in manual mode!! 🤦🏻‍♂️", "error");
  }
};

// AUTOMATIC GAMEPLAY
export const automatic = () => {
  showAlert(
    "A NEW NUMBER WILL APPEAR ON THE BOARD FOR EVERY 4 SECONDS ! 👀",
    "info"
  );

  document.getElementById("rand").id = "auto";
  buttonActions();
};

// THIS FUNCTION WILL RESUME AND PAUSE THE GAME
const handleClickEvent = () => {
  iWillDecide = iWillDecide == 1 ? 0 : 1;
  buttonActions();
};

const buttonActions = () => {
  let actionButton = document.getElementById("auto");
  let attr = actionButton.getAttribute("timer-id");

  if (!attr) {
    let timer = 2;
    let clearId = startInterval(timer);

    actionButton.textContent = "Pause";

    if (attr === null) {
      actionButton.addEventListener("click", handleClickEvent);
    }

    actionButton.setAttribute("timer-id", clearId);
  } else {
    let clearId = +actionButton.getAttribute("timer-id");
    actionButton.textContent = "Resume";
    actionButton.setAttribute("timer-id", "");

    clearInterval(clearId);
  }
};

// THIS WILL END THE GAME 😥😥
export const endGame = () => {
  // Checking if prize money is calculated
  let calculateButtonPressed = document
    .getElementById("calculate")
    .getAttribute("calculated")
    ? true
    : false;

  if (!calculateButtonPressed) {
    showAlert(
      "Please fill the money collected field and calculate 😑😑",
      "error"
    );
    return;
  }

  // Checking if winners for all titles are available
  // "WINTITLES" IS USED HERE JUST USE THE TITLES TO GRAB THE ELEMENTS IN DOM
  // NO MANIPULATION IS DONE HERE
  let somethingEmpty = Object.keys(winTitles).some((title) => {
    let length = document.getElementById(`${title}_`).value.trim().length;
    return length < 1;
  });

  if (somethingEmpty) {
    showAlert(
      "Please fill all the winning titles to end the game! 😑😑",
      "error"
    );
  } else {
    // Checking if winnersBoardContainer is already appended to the body
    // If already there, we just change the style, or we create and append
    const winnersBoardContainer = document.querySelector(
      ".winners-board-container"
    );

    if (winnersBoardContainer) {
      toggleBoard(winnersBoardContainer);
    } else {
      // boardContainer -> modal black background
      const boardContainer = document.createElement("div");
      boardContainer.className = "winners-board-container";

      // "WINTITLES" IS USED HERE TO
      // winTitles ->  winner prop is set below
      Object.keys(winTitles).forEach(
        (title) =>
          (winTitles[title].winner = document
            .getElementById(`${title}_`)
            .value.trim())
      );

      const childElement = showWinnersBoard(
        "🎉 Congratulations 🎉",
        winTitles,
        false,
        true
      );

      boardContainer.appendChild(childElement);

      // Appending modal to the DOM
      document.querySelector("body").appendChild(boardContainer);
    }
  }
};

// THIS WILL STORE THE DATA LOCALLY
export const reqToStoreData = (event) => {
  const element = event.target;
  const attr = element.getAttribute("saved");

  // Checking if data was already stored locally
  if (!attr) {
    const moneyCollected = document.getElementById("money").value.trim();

    const response = storeLocally(moneyCollected, winTitles);

    response
      ? (showAlert("Data stored successfully! 🤘🏻🤘🏻", "success"),
        (event.target.textContent = "Saved"),
        event.target.setAttribute("saved", "done"))
      : showAlert("Something went wrong! Try again later 😵😵", "error");
  } else {
    showAlert("Data already exists! 😅😅", "info");
  }
};
