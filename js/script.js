// Game state
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset');
const colorXInput = document.getElementById('color-x');
const colorOInput = document.getElementById('color-o');

let currentPlayer = 'X';
let gameActive = true;
let board = ['', '', '', '', '', '', '', '', ''];
let colorX = colorXInput.value;
let colorO = colorOInput.value;

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
  event.target.style.color = currentPlayer === 'X' ? colorX : colorO;
  event.target.classList.add('taken');

  checkGameStatus();
}

// Reset game
function resetGame() {
  currentPlayer = 'X';
  gameActive = true;
  board = ['', '', '', '', '', '', '', '', ''];
  cells.forEach(cell => {
    cell.textContent = '';
    cell.style.color = '';
    cell.classList.remove('taken');
  });
  updateStatus('Player X\'s turn');
}

// Update colors when changed
colorXInput.addEventListener('change', () => {
  colorX = colorXInput.value;
});

colorOInput.addEventListener('change', () => {
  colorO = colorOInput.value;
});

// Attach event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
