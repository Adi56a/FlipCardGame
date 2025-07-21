const grid  = document.getElementById('grid');
const timerDisplay  = document.getElementById('timer');
const restartButton  = document.getElementById('restartButton');

let cards  = [];
let flippedCards  = [];
let matchedCards  = [];
let time  =  0 ; 

const cardValues  = ['🍇','🍈','🍉','🍊','🍌','🍍','🍎','🍏'];
const shuffledCards  = [...cardValues , ...cardValues].sort(() => Math.random() - 0.5);

function generateCards() {
    cards = shuffledCards.map((value, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.id = index;
        card.dataset.value = value;

        
        card.addEventListener('click', flipCard);
        
        grid.appendChild(card);
        console.log(shuffledCards) 
        return card;

    });
}

function flipCard(event) {
    const card  = event.target;

    
    if (flippedCards.length < 2  && !card.classList.contains('flipped') && !card.classList.contains('matched')) {
        card.classList.add('flipped');
        card.textContent = card.dataset.value;
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            checkforMatch();
        }
    }
}

function checkforMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.value === card2.dataset.value) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCards.push(card1, card2);
        flippedCards.length = 0; 

        checkGameOver();
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.textContent = '';
            card2.textContent = '';
            flippedCards.length = 0; 
        }, 1000); 
    }
}

function checkGameOver() {
    if (matchedCards.length === shuffledCards.length) {
        gameStarted = false;
        alert('You win the game!');
    }
}


function startTimer(){
      setInterval(() => {
            time++; 
            timerDisplay.textContent = `Timer ${time}s`

      }, 1000);
}



function startGame(){
      generateCards()
      startTimer()
}


startGame()




// 1. if Win  >> timer stop 
// 2. make restart button functional 
