import { Game, GameProps } from "../models/Game";
import { GameInitUI } from "./GameInitUI";
import { View } from "./common/View";

import axios from "axios";

export class WordPlay extends View<Game, GameProps> {
  regionsMap(): { [key: string]: string } {
    return {
      gameInit: ".game-init",
    };
  }

  onInit(): void {
    const gameInitUI = new GameInitUI(this.regions.gameInit, this.model);
    gameInitUI.render();
  }

  onRender(): void {
    const rootUrl = "http://localhost:3000/high-scores";

    axios
      .get(rootUrl)
      .then((res) => {
        this.model.set({ highScores: res.data });
      })
      .then(() => {
        this.onInit();
      })
      .catch((err) => {
        alert(
          "Please, start the database, to detailed information go to readme file!"
        );

        this.model.set({ highScores: { easy: 0, normal: 0, veteran: 0 } });
        this.onInit();
        throw new Error(err);
      });
  }

  template(): string {
    return `
    <div> 
      <div class="game-init"></div>
    </div>`;
  }
}
