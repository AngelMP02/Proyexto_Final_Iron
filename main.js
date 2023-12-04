let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
let startTime;
let endTime;
let gameTimeLimit = 300000; // 5 minutes in milliseconds

function handleClick(index) {
  if (gameBoard[index] === "" && gameActive) {
    gameBoard[index] = currentPlayer;
    document.getElementsByClassName("cell")[index].innerText = currentPlayer;
    //use of setInterval
    if (!startTime) { 
      startTime = new Date();
      // Start the timer interval
      setInterval(updateTime, 1000);
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
    endGame("It's a tie!");
  }
}

function endGame(message) {
  gameActive = false;
  endTime = new Date();
  clearInterval(updateTime); // Stop the timer interval
  alert(message);
}

function updateTime() {
  const currentTime = new Date();
  const elapsedTime = currentTime - startTime;


  const minutes = Math.floor(elapsedTime / 60000);
  const seconds = Math.floor((elapsedTime % 60000) / 1000);
  document.getElementById("time-text").innerText = `Time: ${minutes}:${seconds}`;

  // Check if the game has reached the time limit
  if (elapsedTime >= gameTimeLimit) {
    endGame("Time's up! The game is over.");
  }
}

