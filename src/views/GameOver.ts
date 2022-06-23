import { Game, GameProps } from "../models/Game";
import { View } from "./common/View";

export class GameOver extends View<Game, GameProps> {
  template(): string {
    const winner = this.model.get("winner");
    const score = this.model.get("score");
    return `
    <div> 
      <h3>${winner} Win! Your score is ${score}
    </h3>
    </div>`;
  }
}
