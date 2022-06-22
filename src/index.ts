import { Game } from "./models/Game";
import { WordPlay } from "./views/WordPlay";

const newGame = Game.build({});

const root = document.getElementById("root");

if (root) {
  const wordPlay = new WordPlay(root, newGame);
  wordPlay.render();
}
