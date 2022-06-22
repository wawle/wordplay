import { Word, WordProps } from "../../models/Word";
import { CollectionView } from "../common/CollectionView";
import { WordItem } from "./Wordtem";

export class WordList extends CollectionView<Word, WordProps> {
  renderItem(model: Word, itemParent: Element): void {
    const wordItem = new WordItem(itemParent, model);
    wordItem.render();
  }
}
