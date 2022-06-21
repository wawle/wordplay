import { Answer, Game, GameProps } from '../models/Game';
import { Level, Type } from '../utils/enum';
import { GameInitUI } from './GameInitUI';
import { View } from './View';
import nameList from '../../data/names.json';

export class GameStart extends View<Game, GameProps> {
  eventsMap(): { [key: string]: () => void } {
    return {
      'click:.play-again-btn': this.onPlayAgainClick,
      'click:.game-start-btn': this.onGameStartClick,
    };
  }

  answerListHandler(answer: string, type: Type): void {
    const currentAnswer = {
      word: answer,
      type: type,
    };

    const answerList = this.model.get('answers') as Answer[];
    answerList.push(currentAnswer);
    this.model.set({ answers: answerList });
    this.createNewLine(answer, type);
  }

  createNewLine(value: string, type: Type): void {
    const userAnswersList = document.querySelector(
      '.user-answers-list'
    ) as HTMLElement;
    const computerAnswersList = document.querySelector(
      '.computer-answers-list'
    ) as HTMLElement;

    const li = document.createElement('li');
    li.textContent = value;
    if (type === Type.User) {
      userAnswersList.appendChild(li);
    }

    if (type === Type.Computer) {
      computerAnswersList.appendChild(li);
    }
  }

  answerIsCorrect(answer: string): boolean {
    // get last word from answers
    const answers = this.model.get('answers') as Answer[];
    const lastAnswer = answers[answers.length - 1];

    // check last char of answer and first char of last answer is the same
    return answer.charAt(answer.length - 1) === lastAnswer.word.charAt(0);
  }

  pickRandomWord(): string {
    const words = nameList;
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  }

  onGameStartClick = (): void => {
    const computerAnswer = this.pickRandomWord();
    this.answerListHandler(computerAnswer, Type.Computer);
    console.log(computerAnswer);
    console.log(this.model);
  };

  onPlayAgainClick = (): void => {
    const newGame = Game.build({
      level: Level.Easy,
      answers: [],
    });
    const gameInitUI = new GameInitUI(this.parent, newGame);
    gameInitUI.render();
  };

  template(): string {
    return `
    <div> 
      <button class="play-again-btn">Play Again</button>
      <h1 id="title">Word Play</h1>
      <input type="text" value="-" name="user-input" id="user-input" />
      <br />
      <button class="game-start-btn">Start Game</button>
      <br />
      <input type="text" value="-" name="computer-input" id="computer-input" />
      <ol class="user-answers-list"></ol>
      <ol class="computer-answers-list"></ol>
    </div>`;
  }
}
