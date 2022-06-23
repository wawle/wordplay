import { ApiSync, Events, Attributes, Model } from "./common";
import { Level, PlayerType } from "../utils/enum";

export type WordProps = {
  word: string;
  type: PlayerType;
};

export type HighScores = {
  easy: number;
  normal: number;
  veteran: number;
};

export type GameProps = {
  level?: Level;
  recognition?: any;
  words?: WordProps[];
  interval?: number;
  userWord?: string;
  computerWord?: string;
  recognize?: boolean;
  gameOver?: boolean;
  highScores?: HighScores;
  winner?: string;
  score?: number;
};

export class Game extends Model<GameProps> {
  static build(attrs: GameProps): Game {
    return new Game(
      new Attributes<GameProps>(attrs),
      new Events(),
      new ApiSync("high-scores")
    );
  }
}
