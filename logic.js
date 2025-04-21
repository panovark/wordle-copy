// global const variables
const ANSWER_LENGTH = 5; // contains maximum answer length
const MAX_ROWS = 6; // contains maximum rows
const MAX_CELLS = ANSWER_LENGTH * MAX_ROWS; // contains maximum cells to fill

// here is the main function to launch the programm
async function main() {
  // const variables
  const CELLS = document.querySelectorAll(".cell"); // all cells a user will use using DOM
  const LOADER = document.querySelector(".loader"); // accesses to the loader element using DOM

  const API_POST = "https://words.dev-apis.com/validate-word"; // for validateWord() async function (POST)
  const API_GET = "https://words.dev-apis.com/word-of-the-day"; // for initWord() async function (GET)

  // let variables
  let isFinished = false; // to check if a user finished a game
  let isValid = false; // to check a validity of a word

  let todayWord = ""; // contains today's word a user wants to guess
  let guessedWord = ""; // contains a word that a user typed

  let currentCell = 0; // contains a current cell number
  let currentRow = 0; // contains a current row where a user types

  await initWord();
  
  document.addEventListener("keydown", function(event) {
    if (isFinished) return;
    const key = event.key;
    input(key);
  });

  // functions

  // initializes enter and backspace input
  function deleteAndConfirm(key) {
    if (key === "Enter") {
      confirmInput();
    }
    if (key === "Backspace") {
      deleteLast();
    }
  }

  // adds a leter into a cell
  function addLetter(letter) {
    letter = letter.toLowerCase();
    CELLS[currentCell].textContent = letter;
    guessedWord += letter;
    currentCell++;
  }

  // logic of letters + enter + backspace input
  function input(key) {
    if (isLetter(key)) {
      if (currentCell < (ANSWER_LENGTH * (currentRow + 1)) && currentCell < MAX_CELLS) {
        addLetter(key);
      }
    } else {
      deleteAndConfirm(key);
    }
  }

  // shows loader icon while working with the API
  function showLoader() {
    LOADER.style.display = "block";
  }

  // hides loader icon when we've got everything wee need from the API
  function hideLoader() {
    LOADER.style.display = "none";
  }

  // checks if the user's input is a letter
  function isLetter(letter) {
    return /^[a-zA-Z]$/.test(letter);
  }

  // confirms user input and shows the loader icon
  async function confirmInput() { 
    if (guessedWord.length !== ANSWER_LENGTH) return;

    showLoader();
    await validateWord();

    if (isValid) {
      if (guessedWord !== todayWord) {

        if ((currentRow + 1) < MAX_ROWS) {
          paintCells(lettersColorPosition());
          currentRow++;
          guessedWord = "";
        } else {
          isFinished = true;
          paintCells(lettersColorPosition());
          document.querySelector(".answer").textContent = `The right word is ${todayWord}`;
        }

      } else if (guessedWord === todayWord) {
        isFinished = true;
        paintCells(lettersColorPosition());
        document.querySelector(".answer").textContent = `Congrats! :)`;
      }

    } else {
      paintCells(lettersColorPosition());
    }

    hideLoader();
  }

  // logic of deleting the last letter of a user's input
  function deleteLast() {
    if (guessedWord === "") {
      return;
    }
    currentCell--;
    guessedWord = guessedWord.slice(0, -1);
    CELLS[currentCell].textContent = "";
  }

  // returns a status array that contains color and index information
  // example: ["green", "gray", "gray", "yellow", "gray"]
  function lettersColorPosition() {
    let status = new Array(ANSWER_LENGTH).fill("gray");
    const letterCount = {};

    for (let letter of todayWord) {
      letterCount[letter] = (letterCount[letter] || 0) + 1;
    }

    for (let i = 0; i < ANSWER_LENGTH; i++) {
      if (guessedWord[i] === todayWord[i]) {
        status[i] = "green";
        letterCount[guessedWord[i]]--;
      }
    }

    for (let i = 0; i < ANSWER_LENGTH; i++) {
      if (status[i] === "gray" && letterCount[guessedWord[i]] > 0) {
        status[i] = "yellow";
        letterCount[guessedWord[i]]--;
      }
    }

    return status;
  }

  // colors cells using the status (returned) variable from the lettersColorPosition() function
  function paintCells(status) {
    const startIndex = currentRow * ANSWER_LENGTH;
    
    for (let i = 0; i < ANSWER_LENGTH; i++) {
      const cell = CELLS[startIndex + i];
      cell.classList.remove("red");

      if (isValid) {
        cell.classList.add(status[i]);
      } else {
        void cell.offsetWidth;
        cell.classList.add("red");
      }

    }
  }

  // sends a word to the API and true or false returns
  async function validateWord() {
    const promise = await fetch(API_POST, {
      method: "POST",
      body: JSON.stringify({
        word: guessedWord
      })
    });

    const data = await promise.json();
    isValid = data.validWord;
  }

  // initializes a todayWord variable
  async function initWord() {
    const promise = await fetch(API_GET, {
    method: "GET"
    });

    const data = await promise.json();
    todayWord = data.word.toLowerCase();
  }
}

// entry point to the programm
main();