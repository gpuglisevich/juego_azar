const gameBoard = document.getElementById('game-board');
const cards = [
  { type: 'igual', img: 'carta_igual.jpg' },
  { type: 'igual', img: 'carta_igual.jpg' },
  { type: 'igual', img: 'carta_igual.jpg' },
  { type: 'igual', img: 'carta_igual.jpg' },
  { type: 'igual', img: 'carta_igual.jpg' },
  { type: 'diferente', img: 'carta_diferente.jpg' },
];

let score = 0;
let mistakes = 0;
let isClickable = true;

function shuffleCards(cards) {
  const shuffledCards = [...cards];
  for (let i = shuffledCards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
  }
  return shuffledCards;
}

function renderCards(cards) {
  const shuffledCards = shuffleCards(cards);
  const cardElements = gameBoard.querySelectorAll('.card');
  cardElements.forEach((cardElement, index) => {
    const card = shuffledCards[index];
    cardElement.style.backgroundImage = `url('carta_reverso.jpg')`;
    cardElement.removeEventListener('click', cardElement.clickHandler);
    cardElement.clickHandler = () => {
      if (!isClickable) return;

      cardElement.style.backgroundImage = `url('${card.img}')`;
      checkCard(card, shuffledCards);
    };
    cardElement.addEventListener('click', cardElement.clickHandler);
  });
  return shuffledCards;
}

function checkCard(card, shuffledCards) {
  if (!isClickable) return;
  isClickable = false;

  const cardElements = gameBoard.querySelectorAll('.card');

  setTimeout(() => {
    cardElements.forEach((cardElement, index) => {
      const revealedCard = shuffledCards[index];
      cardElement.style.backgroundImage = `url('${revealedCard.img}')`;
    });
  }, 500);

  setTimeout(() => {
    if (card.type === 'diferente') {
      alert('¡Muy bien! Anday de suerte.');
      score += 1;
    } else {
      alert('¡Esta mal! Cuek');
      mistakes += 1;
    }
    updateScore();
    if (mistakes >= 3) {
      alert('La vendiste mas de 3 veces. Chaolin. Game Over');
      gameOver();
    } else {
      resetGame();
    }
  }, 1500);
}

function startGame() {
  document.getElementById('instructions-dialog').style.display = 'none';
  document.getElementById('game').style.display = 'block';
  isClickable = true; // Asegurarse de que las cartas sean clickeables al iniciar el juego de nuevo
  renderCards(cards);
}

function initializeGame() {
  renderCards(cards);
  updateScore();
}

function updateScore() {
  document.getElementById('score').innerText = score;
}

function resetGame() {
  setTimeout(() => {
    const cardElements = gameBoard.querySelectorAll('.card');
    animateShuffle(cardElements);
  }, 1000);

  setTimeout(() => {
    renderCards(cards);
    isClickable = true;
  }, 2000);
}

function animateShuffle(cardElements) {
  cardElements.forEach((cardElement) => {
    cardElement.classList.add('mix');
  });

  setTimeout(() => {
    cardElements.forEach((cardElement) => {
      cardElement.classList.remove('mix');
      cardElement.style.backgroundImage = `url('carta_reverso.jpg')`;
    });
  }, 1000);
}

function gameOver() {
  score = 0;
  mistakes = 0;
  updateScore();
  document.getElementById('game').style.display = 'none';
  document.getElementById('dialog').style.display = 'block';
  Object.keys(codes).forEach((code) => {
    codes[code].used = false;
  });
}

window.addEventListener('DOMContentLoaded', () => {
  renderCards(cards);
  document.getElementById('instructions-dialog').style.display = 'block';
  
  // mover este código aquí
  document.getElementById('close-instructions').addEventListener('click', () => {
    document.getElementById('instructions-dialog').style.display = 'none';
    startGame();  
  });
});

