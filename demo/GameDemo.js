import { names } from './names.js';

export default class Game {
  constructor(recognition, difficultyLevel) {
    this.difficultyLevel = difficultyLevel;

    this.recognition = recognition;
    recognition.continuous = false;
    recognition.lang = 'tr-TR';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    this.currentLastChar = '';
    this.userAnswer = '';
    this.prevUserAnswer = '';
    this.recognize = false;
    this.gameOver = false;
    this.computerAnswers = [];
    this.userAnswers = [];

    this.gameStartBtn = null;
    this.computerInput = null;
    this.userInput = null;
    this.turnTitle = null;
  }

  initUI() {
    const body = document.body;
    const div = document.createElement('div');
    div.setAttribute('class', 'game-div');
    div.innerHTML = `<h1 id="turn-title">Welcome to speech game!</h1>
                      <input type="text" value="-" name="user-input" id="user-input" />
                      <br />
                      <hr />
                      <button id="game-start-btn">Start Game</button>
                      <br />
                      <hr />
                      <input type="text" value="-" name="computer-input" id="computer-input" />
                      <ol id="user-answers-list"></ol>
                      <ol id="cp-answers-list"></ol>`;
    body.appendChild(div);
  }

  initSelectors() {
    this.gameStartBtn = document.querySelector('#game-start-btn');
    this.computerInput = document.querySelector('#computer-input');
    this.gameDiv = document.querySelector('.game-div');
    this.userInput = document.querySelector('#user-input');
    this.turnTitle = document.querySelector('#turn-title');
    this.userAnswersList = document.querySelector('#user-answers-list');
    this.computerAnswersList = document.querySelector('#cp-answers-list');
    this.difficultyForm = document.querySelector('.difficulty-form');
    this.difficultyLevelElement = document.querySelector(
      'input[name="level"]:checked'
    );
  }

  initEventListeners() {
    this.gameStartBtn.addEventListener('click', () => {
      let initialComputerAnswer =
        names[Math.floor(Math.random() * names.length)];

      this.currentLastChar = initialComputerAnswer.charAt(
        initialComputerAnswer.length - 1
      );
      this.computerAnswers.push(initialComputerAnswer);
      this.createNewLi('pc', initialComputerAnswer);
      this.computerInput.value = initialComputerAnswer;
      this.playText(this.computerInput.value);
      this.recordUser();
    });

    this.recognition.addEventListener('result', (e) => {
      this.prevUserAnswer = this.userAnswer;
      this.userAnswer = e.results[0][0].transcript.toLowerCase().split(' ')[0];
      this.userInput.value = this.userAnswer;
      this.turnTitle.textContent = 'Computer Turn!';
    });
  }

  recordUser() {
    this.recognition.start();
    this.recognize = true;
    this.turnTitle.textContent = 'Your Turn!';
    this.gameStartBtn.disabled = true;
    const timeH2 = document.createElement('h2');
    this.turnTitle.prepend(timeH2);
    let remainingSecond = 7;
    let interval = setInterval(function () {
      timeH2.textContent = `Remaining Time: ${remainingSecond}`;
      remainingSecond--;
      if (remainingSecond === -1) {
        clearInterval(interval);
      }
    }, 1000);
    setTimeout(() => {
      this.recognition.stop();
      this.recognize = false;
      if (this.checkUserAnswer(this.userAnswer)) {
        this.changeTurn();
      } else if (this.prevUserAnswer === this.userAnswer) {
        this.endGame('user');
      } else {
        this.endGame('user');
      }
    }, 8000);
  }

  changeTurn() {
    this.computerInput.value = this.computerAnswer(this.userAnswer);
    this.playText(this.computerInput.value);
    setInterval(() => {
      if (!this.recognize && !this.gameOver) {
        this.recordUser();
      }
    }, 1000);
  }

  computerAnswer(result) {
    const answerPossibility = Math.floor(Math.random() * 100);
    console.log(answerPossibility);
    if (answerPossibility < this.difficultyLevel) {
      this.endGame('pc');
    } else {
      const firstChar = result.charAt(result.length - 1);
      const found = names.find(
        (element) =>
          element.charAt(0) === firstChar &&
          !this.computerAnswers.includes(element)
      );
      this.computerAnswers.push(found);
      this.createNewLi('pc', found);
      this.currentLastChar = found.charAt(found.length - 1);
      return found;
    }
  }

  playText(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.lang = 'ru-RU';
    speechSynthesis.speak(utterance);
  }

  checkUserAnswer(result) {
    if (
      this.currentLastChar === result.charAt(0) &&
      !this.userAnswers.includes(result)
    ) {
      this.userAnswers.push(result);
      this.createNewLi('user', result);
      this.currentLastChar = result.charAt(result.length - 1);
      return true;
    } else {
      return false;
    }
  }

  createNewLi(who, value) {
    const li = document.createElement('li');
    li.textContent = value;
    if (who === 'user') {
      this.userAnswersList.appendChild(li);
    }
    if (who === 'pc') {
      this.computerAnswersList.appendChild(li);
    }
  }

  endGame(who) {
    this.gameOver = true;
    this.recognition.abort();
    const winnerTitle = document.createElement('h1');
    this.saveHighScoreLocally();
    this.gameDiv.insertBefore(winnerTitle, this.turnTitle);
    if (who === 'user') {
      winnerTitle.textContent = `Computer Win! Your score is ${this.userAnswers.length}`;
    }
    if (who === 'pc') {
      winnerTitle.textContent = `You Win! Your score is ${this.userAnswers.length}`;
    }
    this.difficultyForm.style.display = 'block';
  }

  saveHighScoreLocally() {
    const highestScore = JSON.parse(localStorage.getItem('highScores'));
    const highestScoreLevel = this.difficultyLevelElement.dataset.level;
    if (this.userAnswers.length > highestScore[highestScoreLevel]) {
      highestScore[highestScoreLevel] = this.userAnswers.length;
      localStorage.setItem('highScores', JSON.stringify(highestScore));
    }
  }

  init() {
    this.initUI();
    this.initSelectors();
    this.initEventListeners();
  }
}
