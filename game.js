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
const winnerDisplay = document.getElementById("winner");
const gameBoardContainer = document.getElementById("gameBoardContainer");
const playerInput = document.getElementById("playerInput");
const player1NameInput = document.getElementById("player1Name");
const player2NameInput = document.getElementById("player2Name");
const difficultySelect = document.getElementById("difficulty");

const symbols = ['★', '▲', '●', '♦', '✿', '♣', '☀', '♡', '⚡', '☁', '✈', '✿', '♠', '♤', '☘', '♪'];

let gameCards = [];
let gridSize = 4;
let gridDimension = 4;

function shuffleCards() {
    gameCards = [];
    const selectedSymbols = symbols.slice(0, gridDimension * gridDimension / 2);
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
            setTimeout(() => {
                declareWinner();
            }, 500);
        }

        flippedCards = [];
        currentPlayer = currentPlayer === 1 ? 2 : 1;
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
    if (player1Score > player2Score) {
        winnerDisplay.innerHTML = `<h3>${player1NameInput.value} Wins!</h3>`;
    } else if (player2Score > player1Score) {
        winnerDisplay.innerHTML = `<h3>${player2NameInput.value} Wins!</h3>`;
    } else {
        winnerDisplay.innerHTML = "<h3>It's a Tie!</h3>";
    }
}

function startNewGame() {
    const player1Name = player1NameInput.value;
    const player2Name = player2NameInput.value;
    if (!player1Name || !player2Name) {
        alert("Please enter both player names.");
        return;
    }

    playerInput.style.display = 'none';
    gameBoardContainer.style.display = 'block';
    matchedCards = 0;
    moveCount = 0;
    player1Score = 0;
    player2Score = 0;
    currentPlayer = 1;
    scorePlayer1Display.innerText = player1Score;
    scorePlayer2Display.innerText = player2Score;
    moveCountDisplay.innerText = moveCount;

    gridDimension = parseInt(difficultySelect.value);
    shuffleCards();
    gameBoard.innerHTML = '';
    gameBoard.style.gridTemplateColumns = `repeat(${gridDimension}, 80px)`; // Adjust grid to make it square

    gameCards.forEach((value, index) => {
        const card = createCard(value, index);
        gameBoard.appendChild(card);
    });
}

startButton.addEventListener('click', startNewGame);
