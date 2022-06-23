import { WordProps, Game, GameProps, HighScores } from "../models/Game";
import { Language, Level, PlayerType } from "../utils/enum";
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

  onGameStartClick = (): void => {
    this.initEventListeners();
  };

  onPlayAgainClick = (): void => {
    // build a Game model to new Game
    const newGame = Game.build({
      level: Level.easy,
      words: [],
      highScores: this.model.get("highScores"),
      gameOver: false,
      userWord: "",
      recognize: false,
      computerWord: "",
    });

    const gameInitUI = new GameInitUI(this.parent, newGame);
    gameInitUI.render();
  };

  initEventListeners() {
    // pick a random word for computer
    let initialComputerAnswer =
      nameList[Math.floor(Math.random() * nameList.length)];

    // add initialWord to word history list
    this.wordListHandler(initialComputerAnswer, PlayerType.Computer);

    // select inputs and title
    const computerInput = document.querySelector("#computer-input");
    const userInput = document.querySelector("#user-input");
    const turnTitle = document.querySelector("#turn-title");

    // check selected Elements are exists
    if (!computerInput || !userInput || !turnTitle) {
      throw new Error("Computer Input || Turn Title || User Input Error");
    }

    // set the initialWord to computer input value
    computerInput.setAttribute("value", initialComputerAnswer);
    // play the initial word
    this.playWord(initialComputerAnswer);
    // set the computer inital word to model
    this.model.set({ computerWord: initialComputerAnswer });

    // listen the user
    this.recordUser();

    const recognition = this.model.get("recognition");

    recognition.addEventListener("result", (e) => {
      // get user word
      const userWord = e.results[0][0].transcript.toLocaleLowerCase();
      // set user word to model
      this.model.set({ userWord });

      // check computer input is exists then set user word value
      if (computerInput) {
        userInput.setAttribute("value", userWord);
      }
      // generate user word history list
      this.wordListHandler(userWord, PlayerType.User);

      // check user word is valid
      const isWordValid = this.checkUserAnswer();

      // user word is not valid
      if (!isWordValid) {
        // then game over
        this.gameOver(PlayerType.Computer);
        // hide the title
        turnTitle.setAttribute("hidden", "true");
      }

      // otherwise set turn title to next turns
      turnTitle.innerHTML = "Computer Turn!";
    });
  }

  playWord(word: string): void {
    const utterance = new SpeechSynthesisUtterance(word);
    // get language of recognition
    const language = this.model.get("recognition").lang;
    utterance.rate = 1;
    utterance.lang = language;
    speechSynthesis.speak(utterance);
  }

  recordUser() {
    const recognition = this.model.get("recognition");
    const turnTitle = document.querySelector("#turn-title");

    recognition.start();
    this.model.set({ recognize: true });

    if (!turnTitle) {
      throw new Error("Title Error");
    }

    turnTitle.innerHTML = "Your Turn!";
    const startBtn = document.querySelector(".game-start-btn");

    if (startBtn) {
      startBtn.setAttribute("disabled", "true");
    }

    const timer = document.createElement("h2");

    turnTitle.prepend(timer);
    // set the time for next turn
    let remainingSecond = 7;
    let interval = setInterval(function () {
      // update timer element by remainingSecond
      timer.innerHTML = `Remaining Time: ${remainingSecond}`;
      // decrease one on each second
      remainingSecond--;
      // when time is up clear interval
      if (remainingSecond === -1) {
        clearInterval(interval);
      }
    }, 1000);

    setTimeout(() => {
      // when turn time is up stop the recognition
      recognition.stop();
      this.model.set({ recognize: false });

      const isWordValid = this.checkUserAnswer();
      // check user word is valid then change turn otherwise game over
      if (isWordValid) {
        this.changeTurn();
      } else {
        this.gameOver(PlayerType.Computer);
      }
    }, 8000);
  }

  wordListHandler(word: string, type: PlayerType): void {
    const currentWord = {
      word: word.toLocaleLowerCase(),
      type,
    };

    // get word history list
    const wordList = this.model.get("words") as WordProps[];
    // add current word to word history list
    this.model.set({ words: [...wordList, currentWord] });

    const userWordListEl = document.querySelector("#user-word-list");
    const cpWordListEl = document.querySelector("#cp-word-list");

    if (!userWordListEl || !cpWordListEl) {
      throw new Error("Word List Error");
    }

    // get user word history list
    const userWords = this.model
      .get("words")
      .filter((word) => word.type === PlayerType.User);

    const userWordList = userWords.map((word) => Word.build(word));
    // create a User word List Collection to render
    const userWordCollection = new Collection<Word, WordProps>(userWordList);
    // create a WordList component to render user word history list
    const userWordHistory = new WordList(userWordListEl, userWordCollection);
    userWordHistory.render();

    // get computer word history list
    const computerWords: WordProps[] = this.model
      .get("words")
      .filter((word) => word.type === PlayerType.Computer);

    const cpWordList = computerWords.map((word) => Word.build(word));
    const computerWordCollection = new Collection<Word, WordProps>(cpWordList);
    const cpWordHistory = new WordList(cpWordListEl, computerWordCollection);
    cpWordHistory.render();
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

  computerAnswer(result) {
    const answerPossibility = Math.floor(Math.random() * 100);

    if (answerPossibility < this.model.get("level")) {
      const unknownWord = this.getUnknownWord();
      this.playWord(unknownWord);
      this.gameOver(PlayerType.User);
    }

    if (!this.model.get("gameOver")) {
      const firstChar = result.charAt(result.length - 1);
      const wordHistoryList = this.model
        .get("words")
        .map((word: WordProps) => word.word);

      let newWord = nameList.find(
        (element) =>
          element.charAt(0) === firstChar && !wordHistoryList.includes(element)
      );

      newWord = newWord ? newWord : "";

      this.wordListHandler(newWord, PlayerType.Computer);
      return newWord;
    }
  }

  changeTurn() {
    // get last word of computer from word list
    const words = this.model.get("words");
    const lastWord = words[words.length - 1].word;
    const computerWord = this.computerAnswer(lastWord);
    const recognition = this.model.get("recognition");
    const unknownWord = this.getUnknownWord();

    const conditionalWord = computerWord ? computerWord : unknownWord;

    this.model.set({ computerWord });
    if (!this.model.get("gameOver")) {
      this.playWord(conditionalWord);
    }

    const computerInput = document.querySelector("#computer-input");

    if (computerInput) {
      computerInput.setAttribute("value", conditionalWord);
    }

    setInterval(() => {
      if (!this.model.get("recognize") && !this.model.get("gameOver")) {
        this.recordUser();
      }
    }, 1000);
  }

  getUnknownWord(): string {
    const recognition = this.model.get("recognition");
    const unknownWord =
      recognition.lang === Language.Turkish
        ? "bilemedim"
        : "I did not find a word to say";
    return unknownWord;
  }

  saveHighScore(userWordCount) {
    const highScores: HighScores = this.model.get("highScores");
    const level = this.model.get("level");

    // get Level type from level value
    const levelType = Object.keys(Level).find((key) => Level[key] === level);

    if (!levelType) {
      throw new Error("Level Type Error");
    }

    if (highScores[levelType] < userWordCount) {
      highScores[levelType] = userWordCount;
      this.model.set({ highScores });
      this.model.save("highScores");
    }
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

    if (!turnTitle || !winnerTitle) {
      throw new Error("Title Error");
    }

    turnTitle.innerHTML = "";
    //this.saveHighScoreLocally();
    //this.gameDiv.insertBefore(winnerTitle, this.turnTitle);
    if (winner === PlayerType.Computer) {
      winnerTitle.innerHTML = `Computer Win! Your score is ${userWordCount}`;
    }
    if (winner === PlayerType.User) {
      winnerTitle.innerHTML = `You Win! Your score is ${userWordCount}`;
    }

    this.saveHighScore(userWordCount);
  }

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
