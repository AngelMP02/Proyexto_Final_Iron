let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
let startTime;
let endTime;

function handleClick(index) {
  if (gameBoard[index] === "" && gameActive) {
    gameBoard[index] = currentPlayer;
    document.getElementsByClassName("cell")[index].innerText = currentPlayer;

    if (!startTime) {
      startTime = new Date();
    }

    checkWinner();
    switchPlayer();
  }
}

function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkWinner() {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (
      gameBoard[a] &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    ) {
      endGame(`Player ${currentPlayer} wins!`);
      return;
    }
  }

  if (!gameBoard.includes("")) {
    endGame("It's a draw!");
  }
}

function endGame(result) {
  endTime = new Date();
  const duration = (endTime - startTime) / 1000;
  document.getElementById("result-text").innerText = result;
  document.getElementById("time-text").innerText = `Time: ${duration} seconds`;
  gameActive = false;
  showResult();
}

function showResult() {
  const resultContainer = document.querySelector(".result");
  resultContainer.style.display = "flex";
  document.getElementById("restart-button").style.display = "block";
}

function resetGame() {
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  startTime = null;
  endTime = null;

  const cells = document.getElementsByClassName("cell");
  for (const cell of cells) {
    cell.innerText = "";
  }

  document.querySelector(".result").style.display = "none";
  document.getElementById("restart-button").style.display = "none";
}