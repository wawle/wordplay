import { Collection } from "../models/Collection";

export abstract class CollectionView<T, K> {
  constructor(public parent: Element, public collection: Collection<T, K>) {}

  abstract renderItem(model: T, itemParent: Element): void;

  render(): void {
    this.parent.innerHTML = "";
    const templateElement = document.createElement("template");
    console.log(this);
    for (let model of this.collection.models) {
      const itemElement = document.createElement("div");
      this.renderItem(model, itemElement);
      templateElement.content.append(itemElement);
    }

    this.parent.append(templateElement.content);
  }
}
