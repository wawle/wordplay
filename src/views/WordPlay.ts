import { Game, GameProps } from "../models/Game";
import { Ready } from "./Ready";
import { View } from "./common/View";

import axios from "axios";

export class WordPlay extends View<Game, GameProps> {
  regionsMap(): { [key: string]: string } {
    return {
      ready: ".ready",
    };
  }

  onInit(): void {
    const ready = new Ready(this.regions.ready, this.model);
    ready.render();
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
      <div class="ready"></div>
    </div>`;
  }
}
