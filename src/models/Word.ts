import { ApiSync } from "./ApiSync";
import { Attributes } from "./Attributes";
import { Events } from "./Events";
import { Model } from "./Model";
import { Type } from "../utils/enum";

export type WordProps = {
  word: string;
  type: Type.Computer | Type.User;
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
