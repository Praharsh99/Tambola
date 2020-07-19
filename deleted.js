// Test
// export const numbersList = {
//   1: [],
//   2: [],
//   3: [],
//   4: [],
//   5: [],
//   6: [],
//   7: [],
//   8: [],
//   9: [],
// };

// Adding all number to numbersRead list
// numbersList[j].push(i);

// if (i % 10 === 0) {
//   j += 1;
// }

// export const readNumber = () => {
//   if (numbersRead.length < 90) {
//     let currentNumber;
//     let isNewNumber = true;

//     // Get a random number untill it is a new one!
//     while (isNewNumber) {
//       let { randNumForKeys, randNumForValues } = getRandomNumber();
//       currentNumber = numbersList[randNumForKeys][randNumForValues];

//       isNewNumber = numbersRead.includes(currentNumber);
//     }

//     // Push that number to the read list and add a style to it
//     numbersRead.push(currentNumber);
//     document.getElementById(currentNumber).classList.add("number-highlight");
//     if (numbersRead[numbersRead.length - 2]) {
//       document.getElementById(numbersRead[numbersRead.length - 2]).className =
//         "number-block number-read";
//     }
//     // Update the history board
//     updateHistoryBoard(
//       currentNumber,
//       numbersRead[numbersRead.length - 2] || "-",
//       numbersRead[numbersRead.length - 3] || "-"
//     );
//   } else {
//     showAlert(
//       "All the numbers are read! Start a new game to play again",
//       "success"
//     );
//     console.log("Game over");
//   }
// };
