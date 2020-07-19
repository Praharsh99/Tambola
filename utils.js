import { winTitles, numbersRead } from "./variables.js";
import { storeLocally } from "./persist.js";
import showAlert from "./alerts.js";

// GLOBAL VARIABLES THESE ARE FILLED BY THE showWinnersBoard() method!!!
let winners;

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
const calculateMoney = (moneyCollected) => {
  winTitles._jaldi_5 = (moneyCollected * 10) / 100;
  winTitles._1st_line = (moneyCollected * 15) / 100;
  winTitles._2nd_line = (moneyCollected * 15) / 100;
  winTitles._3rd_line = (moneyCollected * 15) / 100;
  winTitles._housefull_1 = (moneyCollected * 25) / 100;
  winTitles._housefull_2 = (moneyCollected * 20) / 100;
};

// This function will generate the amount won by each title and updates the [AMOUNT: NONE] HTML TEXT in DOM
export const populateWinningTitlesPrices = () => {
  const moneyCollected = document.getElementById("money").value;

  if (moneyCollected) {
    calculateMoney(moneyCollected);

    Object.keys(winTitles).forEach((title) => {
      document.getElementById(
        title
      ).textContent = `Amount: ${winTitles[title]}`;
    });

    document.getElementById("calculate").setAttribute("calculated", "yeah");
  } else {
    showAlert("Please enter the amount to calculate!!", "error");
  }
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
export const readNumber = () => {
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
  } else {
    showAlert(
      "All the numbers are read! Start a new game to play again",
      "success"
    );
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
    readNumber();
  }, timer * 1000);

  return clearId;
};

// MANUAL GAMEPLAY
export const manual = () => {
  let autoButton = document.getElementById("auto");

  if (autoButton) {
    autoButton.id = "rand";
    autoButton.textContent = "Call";
    autoButton.removeAttribute("timer-id");

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

const buttonActions = () => {
  let actionButton = document.getElementById("auto");
  let attr = actionButton.getAttribute("timer-id");

  if (!attr) {
    let timer = 4;
    let clearId = startInterval(timer);

    actionButton.textContent = "Pause";

    if (attr === null) {
      actionButton.addEventListener("click", () => {
        buttonActions();
      });
    }

    actionButton.setAttribute("timer-id", clearId);
  } else {
    let clearId = +actionButton.getAttribute("timer-id");
    actionButton.textContent = "Resume";
    actionButton.setAttribute("timer-id", "");

    clearInterval(clearId);
  }
};

// THIS WILL GENERATE THE FINAL LIST OF WINNERS
const showWinnersBoard = () => {
  // winnersBoardContainer -> modal black background
  const winnersBoardContainer = document.createElement("div");
  winnersBoardContainer.className = "winners-board-container";

  // winnersBoard -> modal blue gradient background
  const winnersBoard = document.createElement("div");
  winnersBoard.className = "winners-board";

  // This will get the names of the players from the input boxes and store in "winners" array
  winners = Object.keys(winTitles).map((title) =>
    document.getElementById(`${title}_`).value.trim()
  );

  // This will get the calculated price for each title and store in "winnersPrize"
  const winnersPrize = Object.keys(winTitles).map((title) => winTitles[title]);

  // This will get the titles to display and store in "winnerTitles"
  const winnerTitles = Object.keys(winTitles).map((title) =>
    title.replace("_", " ").trim().split("_").join(" ")
  );

  // Filling the content in the winners board starts here 👇🏻👇🏻👇🏻
  // Congratulations title
  const titleElement = document.createElement("h1");
  titleElement.textContent = "🎉 Congratulations 🎉";
  titleElement.className = "congo-title";

  // THE MAIN DIV which contains all the winners and their prize money
  const winnersContainer = document.createElement("div");
  winnersContainer.className = "winners-container";

  // THIS LOOP is for each winner which creates a DIV that contains (TITLE, NAME, & PRICE)
  winners.forEach((winner, idx) => {
    // THIS DIV contains all the details for each winner
    let newWinnerElement = document.createElement("div");
    // SPAN which has title (eg: "Jaldi 5", "House Full 1",...)
    let titleElement = document.createElement("span");
    // SPAN which has name of the winner (eg: "Praharsh", "Scooby",...)
    let nameElement = document.createElement("span");
    // SPAN which has the prize money (eg: "₹15", "₹47.5",...)
    let prizeElement = document.createElement("span");

    // Logic for populating the created elements with respective values
    titleElement.textContent = winnerTitles[idx];
    titleElement.className = "winner-title";

    nameElement.textContent = winner;
    nameElement.className = "winner-name";

    prizeElement.textContent = `₹${winnersPrize[idx]}`;
    prizeElement.className = "winner-prize";

    // appending the elements to THE DIV
    newWinnerElement.appendChild(titleElement);
    newWinnerElement.appendChild(nameElement);
    newWinnerElement.appendChild(prizeElement);
    newWinnerElement.className = "winner";

    // Appending the newly created winner to THE MAIN DIV
    winnersContainer.appendChild(newWinnerElement);
  });

  // DIV that contains two buttons
  const btnDiv = document.createElement("div");
  btnDiv.className = "action-buttons";
  btnDiv.style.width = "80%";

  // CLOSE BUTTON to close the winners board
  const closeButton = document.createElement("button");
  closeButton.textContent = "Close";
  closeButton.className = "btn";
  closeButton.addEventListener("click", (e) => {
    closeBoard(e.target.offsetParent);
  });

  // SAVE BUTTON to save it to the local storage
  const saveButton = document.createElement("button");
  saveButton.textContent = "Save";
  saveButton.className = "btn";
  saveButton.addEventListener("click", () => {
    reqToStoreData();
  });

  // Append those btns to btnDiv
  btnDiv.appendChild(closeButton);
  btnDiv.appendChild(saveButton);

  // Finally appending all the main contents to the modal
  winnersBoard.appendChild(titleElement);
  winnersBoard.appendChild(winnersContainer);
  winnersBoard.appendChild(btnDiv);
  winnersBoardContainer.appendChild(winnersBoard);

  // Appending modal to the DOM
  document.querySelector("body").appendChild(winnersBoardContainer);
};

// THIS WILL END THE GAME 😥😥
export const endGame = () => {
  // Checking if money is calculated
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
    showWinnersBoard();
  }
};

// THIS FUNCTION WILL CLOSE THE WINNERS BOARD
export const closeBoard = (target) => {
  target.classList.toggle("visibility");
};

// THIS WILL STORE THE DATA LOCALLY
export const reqToStoreData = () => {
  const moneyCollected = document.getElementById("money").value.trim();
  let response = null;

  moneyCollected
    ? (response = storeLocally(moneyCollected, winTitles, winners))
    : showAlert(
        "Please enter the amount in the money collected field 😕😕",
        "error"
      );

  response
    ? showAlert("Data stored successfully!", "success")
    : showAlert("Something went wrong! Try again later 😵😵", "error");
};
