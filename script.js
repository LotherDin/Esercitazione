let colors = ['red', 'blue', 'green'];
let cards = [];
let flippedCards = [];
let foundPairs = 0;
let score = 0;
let timer = 10;
let timerId;
let shuffledBoard;

function createCard(color) {
    const card = document.createElement('div');
    card.classList.add('card');

    const inner = document.createElement('div');
    inner.classList.add('inner');

    const front = document.createElement('div');
    front.classList.add('front');
    front.textContent = "?";

    const back = document.createElement('div');
    back.classList.add('back');
    back.style.backgroundColor = color;

    inner.appendChild(front);
    inner.appendChild(back);

    card.appendChild(inner);

    card.addEventListener('click', () => flipCard(card, color));
    return card;
}

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createGameBoard(isNew) {
    const gameBoard = document.getElementById('game-board');
    const shuffledColors = shuffle(colors.concat([...colors])); // Duplica i colori per ottenere le coppie

    if (isNew) {
        shuffledBoard = shuffle(shuffledColors);

    }



    shuffledBoard.forEach(color => {
        const card = createCard(color);
        cards.push({ color, element: card });
        gameBoard.appendChild(card);
    });
}

function flipCard(card, color) {
    if (flippedCards.length === 2) {
        return
    }
    if (!card.classList.contains('flipped') && flippedCards.length < 2) {
        card.classList.add('flipped', 'clicked'); // Aggiungi la classe 'clicked'
        flippedCards.push({ color, element: card });

        if (flippedCards.length === 2) {
            checkMatch();
        }
    }

    // Aggiorna il colore della carta iniziale
    card.style.backgroundColor = color;
    card.querySelector('.front').textContent = ''; // Rimuovi il punto ?
}

function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.color === card2.color) {
        foundPairs++;
        flippedCards = [];
        if (foundPairs === colors.length) {
            document.getElementById('win-message').style.display = 'block';
            clearInterval(timerId);
        }
    } else {
        // In caso di combinazione errata, ritarda il reset del gioco di 1 secondo
        setTimeout(() => resetGame(false), 1000);
    }


}

function updateTimer() {
    document.getElementById('timer').textContent = `Time: ${timer}`;
    if (timer === 0 && foundPairs < colors.length) {
        alert('Tempo scaduto! Gioco terminato.');
        resetGame(true);
    } else {
        timer--;
    }
}

function resetGame(isEnd) {
    cards = [];
    flippedCards = [];
    foundPairs = 0;
    timer = 10;
    document.getElementById('timer').textContent = 'Time: 10';

    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    document.getElementById('win-message').style.display = 'none'; // Nascondi il messaggio di vittoria
    createGameBoard(isEnd);

    clearInterval(timerId);
    timerId = setInterval(() => {
        updateTimer();
        if (timer === 0 && foundPairs < colors.length) {
            alert('Tempo scaduto! Gioco terminato.');
            resetGame(true);
        }
    }, 1000);
}

// Aggiungi un evento click al messaggio "Hai vinto!" per iniziare una nuova partita
document.getElementById('win-message').addEventListener('click', () => {
    resetGame(true);
    score++; // Incrementa lo score solo quando clicchi su "Hai vinto!"
    document.getElementById('score').textContent = `Score: ${score}`;
});

createGameBoard(true);
updateTimer();