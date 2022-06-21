import { Game } from './models/Game';
import { Level } from './utils/enum';
import { WordPlay } from './views/WordPlay';

const root = document.getElementById('root');
const newGame = Game.build({ level: Level.Easy });

if (root) {
  const wordPlay = new WordPlay(root, newGame);
  wordPlay.render();
}
