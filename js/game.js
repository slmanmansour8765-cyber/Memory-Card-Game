let startBtn = document.getElementById("start-btn");
let startScreen = document.getElementById("start-screen");
let gameScreen = document.getElementById("game-screen");
let playerNameInput = document.getElementById("player-name");
let playerNameDisplay = document.getElementById("player-name-display");
let timerDisplay = document.getElementById("timer-display");
let movesDisplay = document.getElementById("moves-display");

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let movesCount = 0;
let timerInterval = null;
let totalSeconds = 0;
let matchedPairs = 0;
let totalPairs = 8;

let animalIcons = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];
let fruitIcons  = ['🍎', '🍌', '🍇', '🍊', '🍓', '🍉', '🍍', '🍒'];
let spaceIcons  = ['🚀', '🛸', '🪐', '🌟', '👨‍🚀', '🛰️', '🌙', '☄️'];

let cardIcons = [];

startBtn.onclick = function () {
  let nameValue = playerNameInput.value;
  if (nameValue === "") {
    nameValue = "Player 1";
  }
  playerNameDisplay.textContent = nameValue;

  let categorySelect = document.getElementById("category-select");
  let chosenCategory = categorySelect.value;

  if (chosenCategory === "animals") {
    cardIcons = animalIcons;
  } else if (chosenCategory === "fruits") {
    cardIcons = fruitIcons;
  } else if (chosenCategory === "vehicles") {
    cardIcons = spaceIcons;
  }

  let difficultySelect = document.getElementById("difficulty-select");
  let chosenDifficulty = difficultySelect.value;

  if (chosenDifficulty === "easy") {
    totalPairs = 6;
  } else if (chosenDifficulty === "medium") {
    totalPairs = 8;
  } else if (chosenDifficulty === "hard") {
    totalPairs = 10;
    }
      startScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");

  setupBoard();
  startTimer();
};;

function setupBoard() {
  movesCount = 0;
  matchedPairs = 0;
  totalSeconds = 0;
  firstCard = null;
  secondCard = null;
  lockBoard = false;

  movesDisplay.textContent = "0";
  timerDisplay.textContent = "00:00";

  let selectedIcons = cardIcons.slice(0, totalPairs);
  let cardsArray = selectedIcons.concat(selectedIcons);

  for (let i = cardsArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = cardsArray[i];
    cardsArray[i] = cardsArray[j];
    cardsArray[j] = temp;
  }

  let boardContainer = document.getElementById("board-container");
  if (boardContainer === null) {
    boardContainer = document.createElement("div");
    boardContainer.id = "board-container";
    gameScreen.appendChild(boardContainer);
  }
  boardContainer.innerHTML = "";

  if (totalPairs === 6) {
    boardContainer.style.gridTemplateColumns = "repeat(4, 1fr)";
  } else if (totalPairs === 8) {
    boardContainer.style.gridTemplateColumns = "repeat(4, 1fr)";
  } else if (totalPairs === 10) {
    boardContainer.style.gridTemplateColumns = "repeat(5, 1fr)";
  }

  for (let i = 0; i < cardsArray.length; i++) {
    let cardElement = document.createElement("div");
    cardElement.className = "card";
    cardElement.setAttribute("data-symbol", cardsArray[i]);
    cardElement.textContent = "?";

    cardElement.onclick = function () {
      flipCard(cardElement);
    };

    boardContainer.appendChild(cardElement);
  }
}
function flipCard(card) {
  if (lockBoard === true) return;
  if (card === firstCard) return;
  if (card.classList.contains("matched")) return;
  playFlipSound();

  card.textContent = card.getAttribute("data-symbol");
  card.classList.add("flipped");

  if (firstCard === null) {
    firstCard = card;
  } else {
    secondCard = card;
    movesCount = movesCount + 1;
    movesDisplay.textContent = movesCount;
    checkMatch();
  }
}

function checkMatch() {
  let symbol1 = firstCard.getAttribute("data-symbol");
  let symbol2 = secondCard.getAttribute("data-symbol");

  if (symbol1 === symbol2) {
    // التطابق
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    matchedPairs = matchedPairs + 1;
    playMatchSound();
    resetTurn();

    if (matchedPairs === totalPairs) {
      stopTimer();
      playWinSound();
        
      let finalScore = 1000 - movesCount * 10 - totalSeconds * 2;
      if (finalScore < 0) {
        finalScore = 0;
      }

        
        
    setTimeout(function () {
      document.getElementById("modal-player").textContent =
        playerNameDisplay.textContent;
      document.getElementById("modal-score").textContent = finalScore;
      document.getElementById("modal-moves").textContent = movesCount;
      document.getElementById("modal-time").textContent =
        timerDisplay.textContent;

      document.getElementById("win-modal").classList.remove("hidden");

      saveScore(playerNameDisplay.textContent, totalSeconds, movesCount);
      displayScores();
    }, 300);
    }
  } else {
    lockBoard = true;
    setTimeout(function () {
      firstCard.textContent = "?";
      secondCard.textContent = "?";
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      resetTurn();
    }, 1000);
  }
}

function resetTurn() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

function startTimer() {
  totalSeconds = 0;
  timerInterval = setInterval(function () {
    totalSeconds = totalSeconds + 1;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    timerDisplay.textContent = minutes + ":" + seconds;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}
let backBtn = document.getElementById('back-btn');
let restartBtn = document.getElementById('restart-btn');

backBtn.onclick = function() {
  stopTimer();
  gameScreen.classList.add('hidden');
  startScreen.classList.remove('hidden');
};

restartBtn.onclick = function() {
  stopTimer();
  movesCount = 0;
  matchedPairs = 0;
  movesDisplay.textContent = '0';
  setupBoard();
  startTimer();
};
document.getElementById("modal-play-again").onclick = function () {
  document.getElementById("win-modal").classList.add("hidden");
  setupBoard();
  startTimer();
};

