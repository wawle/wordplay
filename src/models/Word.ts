import { ApiSync } from "./common/ApiSync";
import { Attributes } from "./common/Attributes";
import { Events } from "./common/Events";
import { Model } from "./common/Model";
import { PlayerType } from "../utils/enum";

export type WordProps = {
  word: string;
  type: PlayerType;
};

export class Word extends Model<WordProps> {
  static build(attrs: WordProps): Word {
    return new Word(
      new Attributes<WordProps>(attrs),
      new Events(),
      new ApiSync("words")
    );
  }
}
