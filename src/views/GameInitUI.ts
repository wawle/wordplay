import { Game, GameProps } from "../models/Game";
import { Play } from "./Play";
import { View } from "./common/View";

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
      computerWord: "",
      userWord: "",
      turnTitle: "",
      gameStart: false,
    });

    const play = new Play(this.parent, newGame);

    play.render();
  };

  template(): string {
    return `
    <div>
      <ul>
        <li> Easy: </li>
        
      </ul>
      <form name="form" class="form">
        <label for="level">Level: </label>
        <input class="level-radio" type="radio" name="level" value=30 data-level="easy" checked>Easy</input>
        <input class="level-radio" type="radio" name="level" value=20 data-level="medium">Medium</input>
        <input class="level-radio" type="radio" name="level" value=10 data-level="hard">Hard</input>
        <br />
        <label for="level">Speaker Language: </label>
        <select name="speaker" id="speaker">
          <option value="tr-TR">Turkish</option>
          <option value="en-US">English</option>
        </select>
         <br />
        <button class="ready-btn">Ready</button>
      </form> 
      </div>`;
  }
}
