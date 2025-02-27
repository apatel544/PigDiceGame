'use strict';

// Selecting Elements - Allows us to declare once and reuse throughout the code
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

// DRY implementation - Re-initializing the components of the game
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  current0El.textContent = 0;
  current1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

// initialize the game parameters
init();

// DRY implementation - Switch Player Function
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling Dice Functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. generate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice); // Delete Later
    // 2. display roll
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. check if a 1 is rolled, if true switch to next player
    if (dice !== 1) {
      // add current dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

// Hold Current Score Functionality
btnHold.addEventListener('click', function () {
  if (playing) {
    //1. Add Current score to the active players score
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. check if the players score is >= 100
    if (scores[activePlayer] >= 15) {
      playing = false;
      current0El;
      diceEl.classList.add('hidden');
      // Assign player--winner styling
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      // removes active--player class to apply winner css
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

// DRY implementation - New Game Button Functionality
btnNew.addEventListener('click', init);
