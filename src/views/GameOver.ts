import { Game, GameProps } from "../models/Game";
import { View } from "./common/View";

export class GameOver extends View<Game, GameProps> {
  template(): string {
    return `
    <div> 
      <h3>${this.model.get("winner")} Win! Your score is ${this.model.get(
      "score"
    )}
    </h3>
    </div>`;
  }
}
