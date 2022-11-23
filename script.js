'use strict';
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const playerActiveEl0 = document.querySelector('.player--0');
const playerActiveEl1 = document.querySelector('.player--1');

diceEl.classList.add('hidden');
// Starting conditions
let currentScore = 0;
let flag = true;
let totalScore0 = 0;
let totalScore1 = 0;
let gameOver = false;

const newGame = function () {
  if (totalScore0 >= 100) playerActiveEl0.classList.remove('player--winner');
  else if (totalScore1 >= 100)
    playerActiveEl1.classList.remove('player--winner');
  if (flag !== true) {
    playerActiveEl0.classList.toggle('player--active');
    playerActiveEl1.classList.toggle('player--active');
  }
  currentScore = 0;
  totalScore0 = 0;
  totalScore1 = 0;
  current0El.textContent = 0;
  score0El.textContent = 0;
  current1El.textContent = 0;
  score1El.textContent = 0;
  gameOver = false;
  flag = true;
  diceEl.classList.add('hidden');
};

const Hold = function () {
  if (!gameOver) {
    if (flag) {
      totalScore0 += currentScore;
      current0El.textContent = 0;
      score0El.textContent = totalScore0;
      playerActiveEl1.classList.toggle('player--active');
      playerActiveEl0.classList.toggle('player--active');
      flag = !flag;
      currentScore = 0;
    } else {
      totalScore1 += currentScore;
      current1El.textContent = 0;
      score1El.textContent = totalScore1;
      playerActiveEl1.classList.toggle('player--active');
      playerActiveEl0.classList.toggle('player--active');
      flag = !flag;
      currentScore = 0;
    }
  }
  if (totalScore0 >= 100 || totalScore1 >= 100) {
    gameOver = true;
    diceEl.classList.add('hidden');
    if (totalScore0 >= 100) playerActiveEl0.classList.add('player--winner');
    else if (totalScore1 >= 100)
      playerActiveEl1.classList.add('player--winner');
  }
};
// Rolling dice functionality
const Roll = function () {
  if (!gameOver) {
    diceEl.classList.remove('hidden');
    // Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.src = `dice-${dice}.png`;
    //checking and switching active players
    if (dice != 1) currentScore += dice;
    else {
      currentScore = 0;
      flag = !flag;
      playerActiveEl0.classList.toggle('player--active');
      playerActiveEl1.classList.toggle('player--active');
    }

    if (flag) {
      current0El.textContent = currentScore;
      current1El.textContent = 0;
    } else {
      current1El.textContent = currentScore;
      current0El.textContent = 0;
    }
  }
};

score0El.textContent = 0;
score1El.textContent = 0;

btnRoll.addEventListener('click', Roll);
btnHold.addEventListener('click', Hold);
btnNew.addEventListener('click', newGame);
