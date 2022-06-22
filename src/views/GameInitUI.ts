import { Game, GameProps } from "../models/Game";
import { GameStart } from "./GameStart";
import { View } from "./View";

export class GameInitUI extends View<Game, GameProps> {
  eventsMap(): { [key: string]: () => void } {
    return {
      "click:.ready-btn": this.onReadyClick,
    };
  }

  onInitSpeechRecognition(language: string): any {
    const speechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!speechRecognition) {
      throw new Error("Speech recognition not available");
    }

    const recognition = new speechRecognition({
      continuous: false,
      interimResults: false,
      maxAlternatives: 1,
    });

    // configure language
    recognition.lang = language;

    return recognition;
  }

  onReadyClick = (): void => {
    const checkedLevel = this.parent.querySelector(
      'input[name="level"]:checked'
    ) as HTMLInputElement;
    const speaker = document.getElementById("speaker") as HTMLSelectElement;

    if (!checkedLevel || !speaker) {
      throw new Error("Missing required fields ( level or speaker )");
    }

    const language = speaker.options[speaker.selectedIndex].value;
    const level = parseInt(checkedLevel.value, 10);
    const recognition = this.onInitSpeechRecognition(language);

    const newGame = Game.build({
      level: level,
      recognition: recognition,
      words: [],
    });

    const gameStartUI = new GameStart(this.parent, newGame);

    gameStartUI.render();
  };

  template(): string {
    return `
      <form name="form" class="form">
        <label for="level">Level: </label>
        <input class="level-radio" type="radio" name="level" value=30 data-level="easy" checked>Easy</input>
        <input class="level-radio" type="radio" name="level" value=20 data-level="medium">Medium</input>
        <input class="level-radio" type="radio" name="level" value=10 data-level="hard">Hard</input>
        <br />
        <label for="level">Speaker Language: </label>
        <select name="speaker" id="speaker">
          <option value="en-US">English</option>
          <option value="tr-TR">Turkish</option>
        </select>
         <br />
        <button class="ready-btn">Ready</button>
      </form> 
    `;
  }
}
