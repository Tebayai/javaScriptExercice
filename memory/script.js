const cards = document.querySelectorAll(".card");
const resetBtn = document.querySelector(".restart-button");

let firstCard = null;
let scndCard = null;
let lockBoard = false;
let nombreCard = 0;
let currentPlayer = 1;
let scores = {1: 0, 2: 0};

window.addEventListener("DOMContentLoaded", () => {
    shuffleCards();
});

cards.forEach((card) => {
    card.addEventListener("click", (e) => {
        if(lockBoard) return; //si le tableau est lock, on ne fait rien
        if(e.currentTarget === firstCard) return; // si la card est déjà cliqué, on ne fait rien

        const revealImage = e.currentTarget.querySelector(".reveal");
        revealImage.style.display = "flex";
        e.currentTarget.classList.add("flipped");

        // check si un card est joué
        if(!firstCard){
            firstCard = card;
            return;
        }
        // check la scnd card
        scndCard = e.currentTarget;
        lockBoard = true;

        // stock les valeurs
        const firstCardValue = firstCard.dataset.card;
        const scndCardValue = scndCard.dataset.card;

        if(firstCardValue === scndCardValue){
            nombreCard ++;
            firstCard.classList.remove("flipped");
            scndCard.classList.remove("flipped");
            firstCard.querySelector(".reveal").classList.add("valid");
            scndCard.querySelector(".reveal").classList.add("valid");
            firstCard = null;
            scndCard = null;
            lockBoard = false;
            updateScore();
        }else{
            setTimeout(()=>{
                firstCard.classList.remove("flipped");
                scndCard.classList.remove("flipped");
                firstCard.querySelector(".reveal").style.display="none";
                scndCard.querySelector(".reveal").style.display="none";
                firstCard=null;
                scndCard=null;
                lockBoard = false;
            }, 500)
            switchPlayer()
        }
        isOver();
    });
});


function shuffleCards(){
    const container = document.querySelector(".card-container");
    const cardArray = Array.from(cards);

    cardArray.sort(() => Math.random()-0.5);

    cardArray.forEach((card) =>{
        container.appendChild(card);
    })
}

function isOver (){
    if(nombreCard == cards.length/2){
        const player1Score = scores[1];
        const player2Score = scores[2];

        const victoryText = document.querySelector(".victory-text");

        if (player1Score > player2Score) {
            victoryText.textContent = "Player 1 won!";
        } else if (player1Score < player2Score) {
            victoryText.textContent = "Player 2 won!";
        } else {
            victoryText.textContent = "It's a draw!";
        }
        const victory = document.querySelector(".victory");
        const blur = document.querySelector(".overlay");
        victory.style.display="flex";
        blur.style.display="flex";
    }
}

function resetGame(){
    firstCard = null;
    scndCard = null;
    nombreCard = 0;
    scores = {1: 0, 2: 0};

    cards.forEach((card) =>{
        const reveal = card.querySelector(".reveal");
        reveal.style.display="none"
        reveal.classList.remove("valid");
    })
    shuffleCards();
    const victory = document.querySelector(".victory");
    const blur = document.querySelector(".overlay");
    victory.style.display="none";
    blur.style.display="none";
    document.getElementById("score1").textContent = "0";
    document.getElementById("score2").textContent = "0";
}

function updateScore(){
    scores[currentPlayer]++;
    document.getElementById(`score${currentPlayer}`).textContent = scores[currentPlayer];
}

function switchPlayer(){
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    document.getElementById("player1").classList.toggle("active", currentPlayer === 1); // toggle i currentPlayer === 1, alors on ajoute la classe "active" à l’élément avec l’id player1.
    document.getElementById("player2").classList.toggle("active", currentPlayer === 2);
}

resetBtn.addEventListener("click", () =>{
    resetGame();
});
