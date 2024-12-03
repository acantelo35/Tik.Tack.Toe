// Game state
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset');
const xColorPicker = document.getElementById('xColor');
const oColorPicker = document.getElementById('oColor');

let currentPlayer = 'X';
let gameActive = true;
let board = ['', '', '', '', '', '', '', '', ''];
let xColor = xColorPicker.value; // Default color for X
let oColor = oColorPicker.value; // Default color for O

// Winning conditions
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Update game status
function updateStatus(message) {
  statusText.textContent = message;
}

// Check for win or draw
function checkGameStatus() {
  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameActive = false;
      updateStatus(`Player ${currentPlayer} wins!`);
      return;
    }
  }

  if (!board.includes('')) {
    gameActive = false;
    updateStatus('It\'s a draw!');
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  updateStatus(`Player ${currentPlayer}'s turn`);
}

// Cell click event handler
function handleCellClick(event) {
  const index = event.target.getAttribute('data-index');

  if (!gameActive || board[index]) {
    return;
  }

  board[index] = currentPlayer;
  event.target.textContent = currentPlayer;
  event.target.style.color = currentPlayer === 'X' ? xColor : oColor;
  event.target.classList.add('taken');

  checkGameStatus();
}

// Reset game
function resetGame() {
  currentPlayer = 'X';
