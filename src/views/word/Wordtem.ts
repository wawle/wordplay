import { Word, WordProps } from "../../models/Word";
import { View } from "../common/View";

export class WordItem extends View<Word, WordProps> {
  template(): string {
    return `
    <div> 
      <li>${this.model.get("word")} - ${this.model.get("type")}</li>
    </div>`;
  }
}
