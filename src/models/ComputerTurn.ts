import { ApiSync } from "./ApiSync";
import { Attributes } from "./Attributes";
import { Events } from "./Events";
import { Model } from "./Model";
import nameList from "../../data/names.json";

export type ComputerTurnProps = {};

export class ComputerTurn extends Model<ComputerTurnProps> {
  onPickWord() {
    const words = nameList;
    const randomIndex = Math.floor(Math.random() * words.length);
    this.setProp([...this.get("words"), words[randomIndex]]);
  }
}
