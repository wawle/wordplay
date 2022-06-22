import { WordProps, Game, GameProps } from "../models/Game";
import { Level, Type } from "../utils/enum";
import { GameInitUI } from "./GameInitUI";
import { View } from "./View";
import nameList from "../../data/names.json";
import { Timer } from "../models/Timer";
import { WordList } from "./WordList";
import { Collection } from "../models/Collection";
import { Word } from "../models/Word";

export class GameStart extends View<Game, GameProps> {
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

  gameOver() {}

  wordListHandler(word: string, type: Type): void {
    const currentWord = {
      word,
      type,
    };

    const wordList = this.model.get("words") as WordProps[];
    this.model.set({ words: [...wordList, currentWord] });

    const userWordList = document.querySelector("#user-word-list");
    const cpWordList = document.querySelector("#cp-word-list");

    if (!userWordList || !cpWordList) {
      throw new Error("Word List Error");
    }

    if (type === Type.User) {
      const userWords = this.model
        .get("words")
        .filter((word) => word.type === Type.User);

      const wordList = userWords.map((word) => Word.build(word));
      const userWordCollection = new Collection<Word, WordProps>(wordList);
      const userWordHistory = new WordList(cpWordList, userWordCollection);
      userWordHistory.render();
    }

    if (type === Type.Computer) {
      const computerWords: WordProps[] = this.model
        .get("words")
        .filter((word) => word.type === Type.Computer);

      const wordList = computerWords.map((word) => Word.build(word));
      const computerWordCollection = new Collection<Word, WordProps>(wordList);
      const cpWordHistory = new WordList(cpWordList, computerWordCollection);
      cpWordHistory.render();
    }
  }

  playWord(word: string): void {
    const utterance = new SpeechSynthesisUtterance(word);
    const language = this.model.get("recognition").lang;
    utterance.rate = 1;
    utterance.lang = language;
    speechSynthesis.speak(utterance);
  }

  wordIsCorrect(word: string): boolean {
    const words = this.model.get("words") as WordProps[];
    // check if it is first word then return true
    if (words.length === 0) {
      return true;
    }

    // get last word from words
    const lastword = words[words.length - 1];

    // check last char of word and first char of last word is the same
    return word.charAt(word.length - 1) === lastword.word.charAt(0);
  }

  pickRandomWord(): string {
    const words = nameList;
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  }

  disableElementHandler(): void {
    const startBtn = document.querySelector(".game-start-btn");

    if (startBtn) {
      startBtn.setAttribute("disabled", "true");
    }
  }

  elementHandlerByTurnOwner(owner: Type) {
    const turnTitle = document.querySelector("#turn-title");
    const ownerName = owner === Type.Computer ? "Computer" : "User";
    if (turnTitle) {
      turnTitle.innerHTML = `${ownerName} Turn`;
    }
  }

  computerTurn(): void {
    this.elementHandlerByTurnOwner(Type.Computer);
    const computerWord = this.pickRandomWord();
    const isValidWord = this.wordIsCorrect(computerWord);

    if (!isValidWord) {
      return this.gameOver();
    }

    this.playWord(computerWord);

    this.wordListHandler(computerWord, Type.Computer);
    const computerInput = document.querySelector("#computer-input");

    if (computerInput) {
      computerInput.setAttribute("value", computerWord);
    }

    return this.userTurn();
  }

  userTurn(): void {
    const turnTitle = document.querySelector("#turn-title");
    const timerEl = document.querySelector("#timer");
    if (turnTitle) {
      turnTitle.innerHTML = "User Turn";
    }

    const recognition = this.model.get("recognition");
    recognition.start();

    const timer = Timer.build({
      remainingTime: 7,
      timerElement: timerEl,
      title: turnTitle,
    });

    timer.init();

    recognition.addEventListener("result", (e) => {
      const word = e.results[0][0].transcript;
      console.log({ e, word });
      const isValidword = this.wordIsCorrect(word);
      timer.onStop();
    });
  }

  onGameStartClick = (): void => {
    this.computerTurn();
    this.disableElementHandler();
  };

  template(): string {
    return `
    <div> 
      <button class="play-again-btn">Play Again</button>
      <h1 id="title">Word Play</h1>
      <h2 id="turn-title"></h2>
      <h3 id="timer"></h3>
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
