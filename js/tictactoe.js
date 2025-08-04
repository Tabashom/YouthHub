const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("resetBtn");

// Game state
let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];
let level = 1;
let score = 0;

// Create level & score display
const infoPanel = document.createElement("div");
infoPanel.style.marginTop = "20px";
infoPanel.style.fontSize = "18px";
infoPanel.innerHTML = `
  <strong>Level:</strong> <span id="level">1</span> |
  <strong>Score:</strong> <span id="score">0</span>
`;
document.querySelector("main")?.appendChild(infoPanel);
const levelDisplay = document.getElementById("level");
const scoreDisplay = document.getElementById("score");

// Create level-up message box
const levelUpBox = document.createElement("div");
levelUpBox.id = "levelUpBox";
levelUpBox.style.display = "none";
levelUpBox.style.position = "fixed";
levelUpBox.style.top = "50%";
levelUpBox.style.left = "50%";
levelUpBox.style.transform = "translate(-50%, -50%)";
levelUpBox.style.padding = "30px 40px";
levelUpBox.style.background = "#fff";
levelUpBox.style.color = "#333";
levelUpBox.style.fontSize = "22px";
levelUpBox.style.border = "2px solid navy";
levelUpBox.style.borderRadius = "10px";
levelUpBox.style.zIndex = "999";
levelUpBox.style.textAlign = "center";
levelUpBox.style.boxShadow = "0 0 20px rgba(0, 0, 0, 0.3)";
levelUpBox.style.transition = "opacity 0.6s ease";
document.body.appendChild(levelUpBox);

const winConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

// Animate a cell when clicked
function animateCell(cell) {
  cell.style.transition = "transform 0.2s ease";
  cell.style.transform = "scale(1.2)";
  setTimeout(() => {
    cell.style.transform = "scale(1)";
  }, 200);
}

function handleCellClick(event) {
  const cell = event.target;
  const index = parseInt(cell.dataset.index);

  if (gameState[index] !== "" || !gameActive) return;

  animateCell(cell);
  makeMove(index, currentPlayer);

  if (!gameActive) return;

  setTimeout(() => {
    aiMove();
  }, 500);
}

function makeMove(index, player) {
  if (gameState[index] !== "") return;

  gameState[index] = player;
  cells[index].textContent = player;

  if (checkWin(player)) {
    if (player === "X") {
      statusText.textContent = `🎉 Player ${player} wins!`;
      score++;
      level++;
      updateStats();
      showLevelUp();
    } else {
      statusText.textContent = `💻 AI wins! Try again!`;
    }
    gameActive = false;
    return;
  }

  if (gameState.every(cell => cell !== "")) {
    statusText.textContent = "😐 It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = currentPlayer === "X" ? `Player X's turn` : `AI's turn`;
}

function aiMove() {
  if (!gameActive) return;

  const emptyIndices = gameState
    .map((val, idx) => (val === "" ? idx : null))
    .filter(idx => idx !== null);

  if (emptyIndices.length === 0) return;

  const aiIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  const cell = cells[aiIndex];
  animateCell(cell);
  makeMove(aiIndex, "O");
}

function checkWin(player) {
  return winConditions.some(condition => {
    const [a, b, c] = condition;
    return (
      gameState[a] === player &&
      gameState[b] === player &&
      gameState[c] === player
    );
  });
}

function resetGame() {
  gameState = ["", "", "", "", "", "", "", "", ""];
  cells.forEach(cell => {
    cell.textContent = "";
    cell.style.transform = "scale(1)";
  });
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = `Player X's turn`;
}

function updateStats() {
  levelDisplay.textContent = level;
  scoreDisplay.textContent = score;
}

function showLevelUp() {
  levelUpBox.innerHTML = `🎉 Level Up! You're now at Level ${level} 🎮`;
  levelUpBox.style.opacity = "0";
  levelUpBox.style.display = "block";

  setTimeout(() => {
    levelUpBox.style.opacity = "1";
  }, 100);

  setTimeout(() => {
    levelUpBox.style.opacity = "0";
    setTimeout(() => {
      levelUpBox.style.display = "none";
    }, 500);
  }, 2000);
}

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetBtn.addEventListener("click", resetGame);
