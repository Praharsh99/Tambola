import { reqToStoreData } from "./utils.js";
import { toggleBoard } from "./reusable.functions.js";

// THIS WILL GENERATE THE FINAL LIST OF WINNERS
export const showWinnersBoard = (title, winTitles, winners, showSaveButton) => {
  // winnersBoard -> modal blue gradient background
  const board = document.createElement("div");
  board.className = "winners-board";

  // This will get the calculated price for each title and store in "winnersPrize"
  const winnersPrize = Object.keys(winTitles).map((title) => winTitles[title]);

  // This will get the titles to display and store in "winnerTitles"
  const winnerTitles = Object.keys(winTitles).map((title) =>
    title.replace("_", " ").trim().split("_").join(" ")
  );

  // Filling the content in the winners board starts here 👇🏻👇🏻👇🏻
  // Congratulations title
  const titleElement = document.createElement("h1");
  titleElement.innerHTML = title;
  titleElement.className = "board-title";

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
    toggleBoard(e.target.offsetParent);
  });
  btnDiv.appendChild(closeButton);

  // SAVE BUTTON to save it to the local storage
  if (showSaveButton) {
    const saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.className = "btn";
    saveButton.addEventListener("click", (e) => {
      reqToStoreData(e);
    });
    btnDiv.appendChild(saveButton);
  }

  // Finally appending all the main contents to the modal
  board.appendChild(titleElement);
  board.appendChild(winnersContainer);
  board.appendChild(btnDiv);

  return board;
};
