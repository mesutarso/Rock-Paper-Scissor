let scorePlayer = 0;
let scoreComputer = 0;
const scoreHeading = document.getElementById("score__section__heading");
const gameOverDiv = document.querySelector(".isGameover");
const buttonsIcons = document.querySelectorAll(".btnPlay");
const restartBtn = document.querySelector(".restart");

for (let buttonIcon of buttonsIcons) {
  buttonIcon.addEventListener("click", playRound);
}

function playRound(e) {
  if (isGameOver()) {
    gameOverDiv.classList.add("showElement", "isGameover");
  }

  let buttonId;
  if (e.target.tagName.toLowerCase() === "i") {
    buttonId = e.target.parentNode.id;
  } else {
    buttonId = e.target.id;
  }

  const playerSelection = convertIdToSign(buttonId);
  const computerSelection = getRandomChoice();
  updateScore(getWinner(playerSelection, computerSelection));
  updateChoices(playerSelection, computerSelection);
}

function updateScore(winner) {
  const playerScoreSpan = document.getElementById("playerScore");
  const computerScoreSpan = document.getElementById("computerScore");

  if (winner === "nul") {
    scoreHeading.textContent = "Match Nul";
  } else if (winner === "joueur") {
    scoreHeading.textContent = "Vous avez gagné !!!";
    scorePlayer++;
  } else if (winner === "ordinateur") {
    scoreHeading.textContent = "Vous avez perdu!";
    scoreComputer++;
  }

  playerScoreSpan.textContent = scorePlayer;
  computerScoreSpan.textContent = scoreComputer;

  if (isGameOver()) setFinalMessage();
}

function updateChoices(playerSelection, computerSelection) {
  const playerSign = document.getElementById("player-sign");
  const computerSign = document.getElementById("computer-sign");

  playerSign.classList.add("active");
  computerSign.classList.add("active_computer");

  const playerSignClassName = `fa-hand-${playerSelection.toLowerCase()}`;
  const computerSignClassName = `fa-hand-${computerSelection.toLowerCase()}`;

  playerSign.classList = `fas ${playerSignClassName} active`;
  computerSign.classList = `fas ${computerSignClassName} active_computer`;
}

function setFinalMessage() {
  return scorePlayer > scoreComputer
    ? (scoreHeading.textContent = "Match Terminé, vous avez gagné ")
    : (scoreHeading.textContent = "Match Terminé, Vous avez perdu");
}

function getWinner(playerSelection, computerSelection) {
  if (playerSelection === computerSelection) {
    return "nul";
  }
  if (
    (playerSelection === "ROCK" && computerSelection === "SCISSORS") ||
    (playerSelection === "SCISSORS" && computerSelection === "PAPER") ||
    (playerSelection === "PAPER" && computerSelection === "ROCK")
  ) {
    return "joueur";
  }
  if (
    (computerSelection === "ROCK" && playerSelection === "SCISSORS") ||
    (computerSelection === "SCISSORS" && playerSelection === "PAPER") ||
    (computerSelection === "PAPER" && playerSelection === "ROCK")
  ) {
    return "ordinateur";
  }
}

function getRandomChoice() {
  let randomNumber = Math.floor(Math.random() * 3);
  switch (randomNumber) {
    case 0:
      return "ROCK";
    case 1:
      return "PAPER";
    case 2:
      return "SCISSORS";
  }
}

function convertIdToSign(buttonId) {
  return buttonId.split("-")[0].toUpperCase();
}

function isGameOver() {
  return scorePlayer === 5 || scoreComputer === 5;
}
