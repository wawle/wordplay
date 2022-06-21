import { Game, GameProps } from '../models/Game';
import { GameInitUI } from './GameInitUI';
import { View } from './View';

export class WordPlay extends View<Game, GameProps> {
  regionsMap(): { [key: string]: string } {
    return {
      gameInit: '.game-init',
    };
  }

  onRender(): void {
    const gameInitUI = new GameInitUI(this.regions.gameInit, this.model);
    gameInitUI.render();
  }

  template(): string {
    return `
    <div> 
      <div class="game-init"></div>
    </div>`;
  }
}
