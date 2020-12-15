'use strict';

// DOM Manipulation
// same way we'd select it in css
// console.log(document.querySelector('.message').textContent);

// document.querySelector('.message').textContent = "Correct Number!"
// document.querySelector('.number').textContent = 13;
// document.querySelector('.score').textContent = 10;

// document.querySelector('.guess').value = 23;


let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;

const displayMessage = function (message) {
    document.querySelector('.message').textContent = message;
};

// Event Listener
// check button element
// event listener needs an action, and a function to do once action is performed
document.querySelector('.check').addEventListener('click', function () {
    const guess = Number(document.querySelector('.guess').value);
    console.log(guess);

    // guess will be 0 if nothing is in the box
    if (!guess) {
        displayMessage("⛔️ No Number!");
    } else if (guess === secretNumber) {
        displayMessage("🎉 Correct Number!");
        document.querySelector('body').style.backgroundColor = '#60b347';
        document.querySelector('.number').style.width = '30rem';
        document.querySelector('.number').textContent = secretNumber;

        if (score > highScore) {
            highScore = score;
            document.querySelector('.highscore').textContent = highScore
        }
    } else if (guess > secretNumber && score > 0) {
        displayMessage("📈 Too High!");
        score--;
    } else if (guess < secretNumber && score > 0) {
        displayMessage("📉 Too Low!");
        score--;
    }

    if (score === 0) {
        displayMessage("💥 You Lost the Game");
    }

    document.querySelector('.score').textContent = score;
});

document.querySelector('.again').addEventListener('click', function () {
    score = 20;
    secretNumber = Math.trunc(Math.random() * 20) + 1;

    displayMessage('Start guessing...');
    document.querySelector('.score').textContent = score;
    document.querySelector('.number').textContent = '?';
    document.querySelector('.guess').value = '';
    document.querySelector('body').style.backgroundColor = '#222';
    document.querySelector('.number').style.width = '15rem';
});