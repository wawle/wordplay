import { ApiSync } from './ApiSync';
import { Attributes } from './Attributes';
import { Events } from './Events';
import { Model } from './Model';
import nameList from '../../data/names.json';
import { Type } from '../utils/enum';

export type Answer = {
  word: string;
  type: Type.Computer | Type.User;
};

export type GameProps = {
  level?: number;
  recognition?: string;
  answers?: Answer[];
};

export class Game extends Model<GameProps> {
  static build(attrs: GameProps): Game {
    return new Game(
      new Attributes<GameProps>(attrs),
      new Events(),
      new ApiSync('games')
    );
  }
}
