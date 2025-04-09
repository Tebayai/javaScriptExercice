const scorePlayerSpan = document.getElementById('player-score');
const scoreComputerSpan = document.getElementById('computer-score');
const roundResultMsg = document.getElementById('results-msg');
const winnerMsg = document.getElementById('winner-msg')
const optionContainer = document.querySelector(".options-container");
const resetBtn = document.getElementById('reset-game-btn');

let scorePlayer = 0;
let scoreComputer = 0;

const rock = document.getElementById('rock-btn');
const paper = document.getElementById('paper-btn');
const scissor = document.getElementById('scissors-btn');



function getRandomComputerChoice(){
    const choice = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * choice.length);
    return choice[randomIndex];
}


function hasPlayerWon(player,computer){
    if((player === 'rock' && computer === 'scissors') || (player==='scissors' && computer === 'paper') || (player === 'paper' && computer === 'rock')){
        return true
    }
    else{
        return false
    }
}

console.log(hasPlayerWon("scissors","paper"));

function won(userOption){
    const computerResult = getRandomComputerChoice();

    if(hasPlayerWon(userOption,computerResult) === true){
        scorePlayer ++;
        return `Le joueur gagne ! ${userOption} bat ${computerResult}`;
    }
    else if (computerResult === userOption){
        return 'égalité';
    }
    else{
        scoreComputer ++;
        return `L'ordinateur gagne ! ${computerResult} bat ${userOption}`;
    }
}

function showResult(userOption){
    roundResultMsg.innerText = won(userOption);
    scoreComputerSpan.innerText = scoreComputer;
    scorePlayerSpan.innerText = scorePlayer;

    if(scorePlayer === 3 || scoreComputer === 3){
        winnerMsg.innerText = `${scorePlayer === 3 ? "player" : "Computer"} a gagné !`;
        resetBtn.style.display = 'block';
        optionContainer.style.display = 'none';
    }
};

function resetScore(){
    scorePlayer = 0;
    scoreComputer = 0;
    roundResultMsg.innerText = "";
    scoreComputerSpan.innerText = scoreComputer;
    scorePlayerSpan.innerText = scorePlayer;
    winnerMsg.innerText = "";
    resetBtn.style.display = 'none';
    optionContainer.style.display = 'block';
};

resetBtn.addEventListener('click', function(){
    resetScore();
});


rock.addEventListener('click', function(){
    showResult("rock");
    console.log(rock);
});

paper.addEventListener('click', function(){
    showResult("paper");
});

scissor.addEventListener('click', function(){
    showResult("scissors")
});

console.log(won("paper"));