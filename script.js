// Fade-in memories on scroll
const memories = document.querySelectorAll('.memory');
const reasons = document.querySelectorAll('.reasons li');

const PUZZLE_IMAGE = "images/puzzle1.jpg"; 
const PUZZLE_SIZE = 3;
const TOTAL_PIECES = PUZZLE_SIZE * PUZZLE_SIZE;

const container4 = document.getElementById("puzzle-container");
const shuffleBtn4 = document.getElementById("shuffle-btn");
const message4 = document.getElementById("puzzle-message");

let pieces4 = [];
let emptyIndex4 = TOTAL_PIECES - 1; // last tile empty

// Create puzzle pieces
function createPuzzle4() {
  for (let i = 0; i < TOTAL_PIECES; i++) {
    const piece = document.createElement("div");
    piece.classList.add("puzzle-piece");

    let x = (i % PUZZLE_SIZE) * -100;
    let y = Math.floor(i / PUZZLE_SIZE) * -100;

    piece.style.backgroundImage = `url(${PUZZLE_IMAGE})`;
    piece.style.backgroundPosition = `${x}px ${y}px`;

    piece.dataset.index = i;
    pieces4.push(piece);
  }

  renderPuzzle4();
}

// Render pieces
function renderPuzzle4() {
  container4.innerHTML = "";
  pieces4.forEach((piece, i) => {
    if (i === emptyIndex4) {
      const empty = document.createElement("div");
      empty.classList.add("puzzle-piece");
      empty.style.background = "#fff0f6";
      empty.style.cursor = "default";
      container4.appendChild(empty);
    } else {
      container4.appendChild(piece);
      piece.onclick = () => movePiece4(i);
    }
  });
}

// Check adjacency in grid
function isAdjacent4(a, b) {
  const rowA = Math.floor(a / PUZZLE_SIZE);
  const colA = a % PUZZLE_SIZE;
  const rowB = Math.floor(b / PUZZLE_SIZE);
  const colB = b % PUZZLE_SIZE;
  return Math.abs(rowA - rowB) + Math.abs(colA - colB) === 1;
}

// Move piece
function movePiece4(i) {
  if (isAdjacent4(i, emptyIndex4)) {
    const temp = pieces4[i];
    pieces4[i] = pieces4[emptyIndex4];
    pieces4[emptyIndex4] = temp;

    emptyIndex4 = i;
    renderPuzzle4();
    checkSolved4();
  }
}

// Shuffle algorithm
function shufflePuzzle4() {
  message4.textContent = "";
  for (let i = 0; i < 100; i++) {
    const neighbors = [
      emptyIndex4 - 1,
      emptyIndex4 + 1,
      emptyIndex4 - PUZZLE_SIZE,
      emptyIndex4 + PUZZLE_SIZE
    ].filter(n => n >= 0 && n < TOTAL_PIECES);

    const move = neighbors[Math.floor(Math.random() * neighbors.length)];
    movePiece4(move);
  }
}

shuffleBtn4.onclick = shufflePuzzle4;

// Check if puzzle is solved
function checkSolved4() {
  for (let i = 0; i < pieces4.length; i++) {
    if (pieces4[i].dataset.index != i) return false;
  }
  message4.textContent = "You solved it! ❤️";
   celebratePuzzle();
  return true;
}

// Initialize
createPuzzle4();


function celebratePuzzle() {
  // Add glow around puzzle container
  container4.classList.add("solved-glow");

  // Create confetti + hearts
  for (let i = 0; i < 40; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti-piece");

    // Random position & delay
    confetti.style.left = Math.random() * 100 + "%";
    confetti.style.animationDelay = (Math.random() * 1) + "s";

    document.body.appendChild(confetti);

    // Remove after animation
    setTimeout(() => confetti.remove(), 3000);
  }
}

window.addEventListener('scroll', () => {
  memories.forEach(mem => {
    const rect = mem.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      mem.classList.add('visible');
    }
  });

  reasons.forEach(reason => {
    const rect = reason.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      reason.style.opacity = 1;
      reason.style.transform = 'translateY(0)';
    }
  });
});

// Perfect Date Generator
const activitySelect = document.getElementById('activity');
const foodSelect = document.getElementById('food');
const result = document.getElementById('date-result');
const button = document.getElementById('generate-date');

button.addEventListener('click', () => {
  const activity = activitySelect.value;
  const food = foodSelect.value;

  result.innerHTML = `
    Our perfect date will be <strong>${activity}</strong>, 
    eating <strong>${food}</strong>,
    I can’t wait to share this with you when you’re back. ❤️
  `;
});