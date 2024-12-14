let cards = [];
let flippedCards = [];
let matchedCards = 0;
let moveCount = 0;
let currentPlayer = 1;
let player1Score = 0;
let player2Score = 0;

const startButton = document.getElementById("startButton");
const gameBoard = document.getElementById("gameBoard");
const moveCountDisplay = document.getElementById("moveCount");
const scorePlayer1Display = document.getElementById("scorePlayer1");
const scorePlayer2Display = document.getElementById("scorePlayer2");
const winnerOverlay = document.getElementById("winnerOverlay");
const winnerMessage = document.getElementById("winnerMessage");
const restartButton = document.getElementById("restartButton");
const playerInput = document.getElementById("playerInput");
const gameBoardContainer = document.getElementById("gameBoardContainer");
const homeButton = document.getElementById("homeButton");
const difficultySelect = document.getElementById("difficulty");

const player1NameInput = document.getElementById("player1Name");
const player2NameInput = document.getElementById("player2Name");

let player1Name = "Player 1";
let player2Name = "Player 2";

const symbols = ['★', '▲', '●', '♦', '✿', '♣', '☀', '♡', '⚡', '☁', '✈', '♠', '♤', '☘', '♪'];

let gameCards = [];
let gridDimension = 4;

function shuffleCards() {
    gameCards = [];
    const selectedSymbols = symbols.slice(0, (gridDimension * gridDimension) / 2);
    gameCards = [...selectedSymbols, ...selectedSymbols];
    gameCards.sort(() => Math.random() - 0.5);
}

function createCard(cardValue, index) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-id', index);
    card.setAttribute('data-value', cardValue);
    card.addEventListener('click', flipCard);
    return card;
}

function flipCard(event) {
    const clickedCard = event.target;
    if (flippedCards.length === 2 || clickedCard.classList.contains('flipped') || clickedCard.classList.contains('matched')) {
        return;
    }

    clickedCard.classList.add('flipped');
    clickedCard.innerText = clickedCard.getAttribute('data-value');
    flippedCards.push(clickedCard);

    if (flippedCards.length === 2) {
        moveCount++;
        moveCountDisplay.innerText = moveCount;
        checkForMatch();
    }
}

function checkForMatch() {
    const [firstCard, secondCard] = flippedCards;

    if (firstCard.getAttribute('data-value') === secondCard.getAttribute('data-value')) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matchedCards++;

        if (currentPlayer === 1) {
            player1Score++;
            scorePlayer1Display.innerText = player1Score;
        } else {
            player2Score++;
            scorePlayer2Display.innerText = player2Score;
        }

        if (matchedCards === gridDimension * gridDimension / 2) {
            setTimeout(() => declareWinner(), 500);
        }

        flippedCards = [];
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            flippedCards = [];
            currentPlayer = currentPlayer === 1 ? 2 : 1;
        }, 1000);
    }
}

function declareWinner() {
    let winnerText = "";
    if (player1Score > player2Score) {
        winnerText = `🎉 Congratulations, ${player1Name}! You win! 🎉`;
    } else if (player2Score > player1Score) {
        winnerText = `🎉 Congratulations, ${player2Name}! You win! 🎉`;
    } else {
        winnerText = `🤝 It's a tie! Well played, ${player1Name} and ${player2Name}!`;
    }
    winnerMessage.innerHTML = `<h3>${winnerText}</h3>`;
    winnerOverlay.classList.remove('hidden');
}

function restartGame() {
    winnerOverlay.classList.add('hidden');
    startNewGame();
}

function startNewGame() {
    gameBoard.innerHTML = '';
    gridDimension = parseInt(difficultySelect.value);
    matchedCards = 0;
    moveCount = 0;
    player1Score = 0;
    player2Score = 0;
    currentPlayer = 1;

    moveCountDisplay.innerText = moveCount;
    scorePlayer1Display.innerText = player1Score;
    scorePlayer2Display.innerText = player2Score;

    shuffleCards();
    gameCards.forEach((value, index) => {
        const card = createCard(value, index);
        gameBoard.appendChild(card);
    });

    gameBoard.style.gridTemplateColumns = `repeat(${gridDimension}, 1fr)`;
}

function goHome() {
    gameBoardContainer.style.display = 'none';
    playerInput.style.display = 'flex';
}

startButton.addEventListener('click', () => {
    player1Name = player1NameInput.value || "Player 1";
    player2Name = player2NameInput.value || "Player 2";

    playerInput.style.display = 'none';
    gameBoardContainer.style.display = 'block';
    startNewGame();
});

homeButton.addEventListener('click', goHome);
restartButton.addEventListener('click', restartGame);
