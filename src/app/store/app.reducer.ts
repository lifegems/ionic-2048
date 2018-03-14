import { Action, ActionReducer } from '@ngrx/store';
import * as actions from './app.actions';
import { Game2048, Direction } from '../lib/game2048';

interface State {
  grid: Array<number>;
  points: number;
  gameover: any;
}

let MyGame: Game2048 = new Game2048();

const initState: State = {
  grid: MyGame.getBoardArray(),
  points: 0,
  gameover: null,
};


export const appReducer: ActionReducer<State, Action> = (state: State = initState, action: Action) => {
  switch(action.type) {
    case actions.NEW_GAME: {
      return initState;
    }
    case actions.SWIPE_LEFT: {
      MyGame.move(Direction.Left);
      return {
        ...state,
        grid: MyGame.getBoardArray(),
        gameover: MyGame.GameOver(),
        points: MyGame.getPoints(),
      };
    }
    case actions.SWIPE_RIGHT: {
      MyGame.move(Direction.Right);
      return {
        ...state,
        grid: MyGame.getBoardArray(),
        gameover: MyGame.GameOver(),
        points: MyGame.getPoints(),
      };
    }
    case actions.SWIPE_UP: {
      MyGame.move(Direction.Up);
      return {
        ...state,
        grid: MyGame.getBoardArray(),
        gameover: MyGame.GameOver(),
        points: MyGame.getPoints(),
      };
    }
    case actions.SWIPE_DOWN: {
      MyGame.move(Direction.Down);
      return {
        ...state,
        grid: MyGame.getBoardArray(),
        gameover: MyGame.GameOver(),
        points: MyGame.getPoints(),
      };
    }
    default:
      return {...state};
  }
}
