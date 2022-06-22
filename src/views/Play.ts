import { WordProps, Game, GameProps } from "../models/Game";
import { Level, PlayerType } from "../utils/enum";
import { GameInitUI } from "./GameInitUI";
import nameList from "../../names.json";
import { Word } from "../models/Word";
import { View } from "./common/View";
import { Collection } from "../models/common";
import { WordList } from "./word/WordList";

export class Play extends View<Game, GameProps> {
  eventsMap(): { [key: string]: () => void } {
    return {
      "click:.play-again-btn": this.onPlayAgainClick,
      "click:.game-start-btn": this.onGameStartClick,
    };
  }

  onPlayAgainClick = (): void => {
    const newGame = Game.build({
      level: Level.Easy,
      words: [],
    });
    const gameInitUI = new GameInitUI(this.parent, newGame);
    gameInitUI.render();
  };

  wordListHandler(word: string, type: PlayerType): void {
    const currentWord = {
      word: word.toLocaleLowerCase(),
      type,
    };

    const wordList = this.model.get("words") as WordProps[];
    this.model.set({ words: [...wordList, currentWord] });

    const userWordListEl = document.querySelector("#user-word-list");
    const cpWordListEl = document.querySelector("#cp-word-list");

    if (!userWordListEl || !cpWordListEl) {
      throw new Error("Word List Error");
    }

    const userWords = this.model
      .get("words")
      .filter((word) => word.type === PlayerType.User);

    const userWordList = userWords.map((word) => Word.build(word));
    const userWordCollection = new Collection<Word, WordProps>(userWordList);
    const userWordHistory = new WordList(userWordListEl, userWordCollection);
    userWordHistory.render();

    const computerWords: WordProps[] = this.model
      .get("words")
      .filter((word) => word.type === PlayerType.Computer);

    const cpWordList = computerWords.map((word) => Word.build(word));
    const computerWordCollection = new Collection<Word, WordProps>(cpWordList);
    const cpWordHistory = new WordList(cpWordListEl, computerWordCollection);
    cpWordHistory.render();
  }

  playWord(word: string): void {
    const utterance = new SpeechSynthesisUtterance(word);
    const language = this.model.get("recognition").lang;
    utterance.rate = 1;
    utterance.lang = language;
    speechSynthesis.speak(utterance);
  }

  gameOver(winner) {
    this.model.set({ gameOver: true });
    this.model.get("recognition").abort();
    // get word count by user
    const userWordCount = this.model
      .get("words")
      .filter((word) => word.type === PlayerType.User).length;

    const winnerTitle = document.querySelector("#title");
    const turnTitle = document.querySelector("#turn-title");
    turnTitle.innerHTML = "";
    //this.saveHighScoreLocally();
    //this.gameDiv.insertBefore(winnerTitle, this.turnTitle);
    if (winner === PlayerType.Computer) {
      winnerTitle.innerHTML = `Computer Win! Your score is ${userWordCount}`;
    }
    if (winner === PlayerType.User) {
      winnerTitle.innerHTML = `You Win! Your score is ${userWordCount}`;
    }
  }

  checkUserAnswer() {
    const userWord = this.model.get("userWord");
    const computerWord = this.model.get("computerWord");

    // get all words except last word of user
    const words = this.model.get("words").map((item) => item.word);
    words.splice(-1);

    // get last char of the computer word
    const lastChar = computerWord[computerWord.length - 1];
    // get first char of the user word
    const firstChar = userWord?.charAt(0);

    if (lastChar === firstChar && !words.includes(userWord)) {
      return true;
    } else {
      return false;
    }
  }

  changeTurn() {
    // get last word of computer from word list
    const words = this.model.get("words");
    const lastWord = words[words.length - 1].word;
    const computerWord = this.computerAnswer(lastWord);
    this.model.set({ computerWord });

    this.playWord(computerWord);

    const computerInput = document.querySelector("#computer-input");

    if (computerInput) {
      computerInput.setAttribute("value", computerWord);
    }

    setInterval(() => {
      if (!this.model.get("recognize") && !this.model.get("gameOver")) {
        this.recordUser();
      }
    }, 1000);
  }

  recordUser() {
    const recognition = this.model.get("recognition");
    const turnTitle = document.querySelector("#turn-title");

    recognition.start();
    this.model.set({ recognize: true });

    turnTitle.textContent = "Your Turn!";
    const startBtn = document.querySelector(".game-start-btn");

    if (startBtn) {
      startBtn.setAttribute("disabled", "true");
    }

    const timer = document.createElement("h2");

    turnTitle.prepend(timer);
    let remainingSecond = 7;
    let interval = setInterval(function () {
      timer.textContent = `Remaining Time: ${remainingSecond}`;
      remainingSecond--;
      if (remainingSecond === -1) {
        clearInterval(interval);
      }
    }, 1000);

    setTimeout(() => {
      recognition.stop();
      this.model.set({ recognize: false });
      // get last word of user from word list
      const words = this.model.get("words");
      const isWordValid = this.checkUserAnswer();

      if (isWordValid) {
        this.changeTurn();
      } else {
        this.gameOver(PlayerType.Computer);
      }
    }, 8000);
  }

  initEventListeners() {
    let initialComputerAnswer =
      nameList[Math.floor(Math.random() * nameList.length)];

    this.wordListHandler(initialComputerAnswer, PlayerType.Computer);

    const computerInput = document.querySelector("#computer-input");
    const userInput = document.querySelector("#user-input");
    const turnTitle = document.querySelector("#turn-title");

    if (computerInput) {
      computerInput.setAttribute("value", initialComputerAnswer);
    }
    this.playWord(initialComputerAnswer);
    this.model.set({ computerWord: initialComputerAnswer });
    this.recordUser();

    const recognition = this.model.get("recognition");

    recognition.addEventListener("result", (e) => {
      const userWord = e.results[0][0].transcript.toLocaleLowerCase();
      this.model.set({ userWord });

      if (computerInput) {
        userInput.setAttribute("value", userWord);
      }
      this.wordListHandler(userWord, PlayerType.User);

      turnTitle.innerHTML = "Computer Turn!";
    });
  }

  computerAnswer(result) {
    const answerPossibility = Math.floor(Math.random() * 100);

    if (answerPossibility < this.model.get("level")) {
      this.gameOver(PlayerType.User);
    } else {
      const firstChar = result.charAt(result.length - 1);
      const newWord = nameList.find(
        (element) =>
          element.charAt(0) === firstChar &&
          !this.model.get("words").includes(element)
      );

      this.wordListHandler(newWord, PlayerType.Computer);
      return newWord;
    }
  }

  onGameStartClick = (): void => {
    this.initEventListeners();
  };

  template(): string {
    return `
    <div> 
      <button class="play-again-btn">Play Again</button>
      <h1 id="title">Word Play</h1>
      <h2 id="turn-title"></h2>
      <input type="text" value="-" name="user-input" id="user-input" />
      <br />
      <button class="game-start-btn">Start Game</button>
      <br />
      <input type="text" value="-" name="computer-input" id="computer-input" />
      <ol id="user-word-list"></ol>
      <ol id="cp-word-list"></ol>
    </div>`;
  }
}

// gameOver(winner: string): void {
//   const turnTitle = document.querySelector("#turn-title");
//   const timerEl = document.querySelector("#timer");

//   timerEl.setAttribute("hidden", "true");

//   if (turnTitle) {
//     turnTitle.innerHTML = `${winner} Win`;
//   }
// }

// wordListHandler(word: string, type: PlayerType): void {
//   const currentWord = {
//     word: word.toLocaleLowerCase(),
//     type,
//   };

//   const wordList = this.model.get("words") as WordProps[];
//   this.model.set({ words: [...wordList, currentWord] });

//   const userWordListEl = document.querySelector("#user-word-list");
//   const cpWordListEl = document.querySelector("#cp-word-list");

//   if (!userWordListEl || !cpWordListEl) {
//     throw new Error("Word List Error");
//   }

//   const userWords = this.model
//     .get("words")
//     .filter((word) => word.type === PlayerType.User);

//   const userWordList = userWords.map((word) => Word.build(word));
//   const userWordCollection = new Collection<Word, WordProps>(userWordList);
//   const userWordHistory = new WordList(userWordListEl, userWordCollection);
//   userWordHistory.render();

//   const computerWords: WordProps[] = this.model
//     .get("words")
//     .filter((word) => word.type === PlayerType.Computer);

//   const cpWordList = computerWords.map((word) => Word.build(word));
//   const computerWordCollection = new Collection<Word, WordProps>(cpWordList);
//   const cpWordHistory = new WordList(cpWordListEl, computerWordCollection);
//   cpWordHistory.render();
// }

// wordIsCorrect(word: string): boolean {
//   const words = this.model.get("words") as WordProps[];
//   // check if it is first word then return true
//   if (words.length === 0) {
//     return true;
//   }

//   // get last word from words
//   const lastWord = words[words.length - 1].word;
//   const firstCharOfLastWord = word.charAt(0).toLocaleLowerCase();

//   // get last char of last word
//   const lastCharOfLastWord = lastWord
//     .charAt(lastWord.length - 1)
//     .toLocaleLowerCase();

//   // get last char of current word
//   const lastCharOfCurrentWord = word.charAt(word.length - 1);

//   if (lastCharOfCurrentWord === "ğ") {
//     return false;
//   }

//   // check last char of word and first char of last word is the same
//   return lastCharOfLastWord === firstCharOfLastWord;
// }

// pickWord(): string {
//   const words = this.model.get("words");
//   // only first pick word
//   if (words.length === 0) {
//     const randomIndex = Math.floor(Math.random() * nameList.length);
//     return nameList[randomIndex];
//   }

//   const wordPossibility = Math.floor(Math.random() * 100);
//   // if this model level greater than wordPossibility then end the game
//   if (this.model.get("level") > wordPossibility) {
//     return "";
//   }

//   const lastWord = words[words.length - 1].word;
//   const lastChar = lastWord.charAt(lastWord.length - 1);
//   // pick a word that starts with last char of last word
//   const filteredWords = nameList.filter(
//     (word) => word.charAt(0).toLocaleLowerCase() === lastChar
//   );

//   const randomIndex = Math.floor(Math.random() * filteredWords.length);
//   return filteredWords[randomIndex];
// }

// disableElementHandler(): void {
//   const startBtn = document.querySelector(".game-start-btn");

//   if (startBtn) {
//     startBtn.setAttribute("disabled", "true");
//   }
// }

// elementHandlerByTurnOwner(owner: PlayerType) {
//   const turnTitle = document.querySelector("#turn-title");
//   const ownerName = owner === PlayerType.Computer ? "Computer" : "User";
//   if (turnTitle) {
//     turnTitle.innerHTML = `${ownerName} Turn`;
//   }
// }

// computerTurn(): void {
//   this.elementHandlerByTurnOwner(PlayerType.Computer);
//   const computerWord = this.pickWord();
//   const isValidWord = this.wordIsCorrect(computerWord);

//   if (!isValidWord) {
//     return this.gameOver(PlayerType.User);
//   }

//   this.playWord(computerWord);

//   this.wordListHandler(computerWord, PlayerType.Computer);
//   const computerInput = document.querySelector("#computer-input");

//   if (computerInput) {
//     computerInput.setAttribute("value", computerWord);
//   }

//   return this.userTurn();
// }

// userTurn(): void {
//   const timerEl = document.querySelector("#timer");
//   const turnTitle = document.querySelector("#turn-title");

//   if (turnTitle) {
//     turnTitle.innerHTML = "User Turn";
//   }

//   const recognition = this.model.get("recognition");
//   recognition.start();

//   let remainingSecond = 7;

//   let timerInterval = setInterval(function () {
//     timerEl.textContent = `Remaining Time: ${remainingSecond}`;
//     remainingSecond--;
//     if (remainingSecond === -1) {
//       clearInterval(timerInterval);
//     }
//   }, 1000);

//   const timerTimeOut = setTimeout(() => {
//     recognition.stop();
//   }, 8000);

//   recognition.addEventListener("result", (e) => {
//     const word = e.results[0][0].transcript;
//     console.log(word);

//     clearInterval(timerInterval);
//     clearTimeout(timerTimeOut);
//     const isValidword = this.wordIsCorrect(word);

//     if (!isValidword) {
//       return this.gameOver(PlayerType.Computer);
//     }

//     this.wordListHandler(word, PlayerType.User);

//     const userInput = document.querySelector("#user-input");

//     if (userInput) {
//       userInput.setAttribute("value", word);
//     }

//     recognition.stop();
//     return this.computerTurn();
//   });
// }
