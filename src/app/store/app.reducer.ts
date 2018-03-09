import { Action, ActionReducer } from '@ngrx/store';
import * as actions from './app.actions';
import * as game from '../lib/game';

interface State {
  grid: Number[];
}

const initState: State = {
  grid: game.setupInitialCells()
};

export const appReducer: ActionReducer<State, Action> = (state: State = initState, action: Action) => {
  switch(action.type) {
    case actions.SWIPE_LEFT: {
      let grid = [...state.grid];
      grid = game.merge(grid, 'LEFT');
      grid = game.addRandomNumber(grid);
      return {...state, grid}
    }
    case actions.SWIPE_RIGHT: {
      let grid = [...state.grid];
      grid = game.merge(grid, 'RIGHT');
      grid = game.addRandomNumber(grid);
      return {...state, grid}
    }
    case actions.SWIPE_UP: {
      let grid = [...state.grid];
      grid = game.merge(grid, 'UP');
      grid = game.addRandomNumber(grid);
      return {...state, grid}
    }
    case actions.SWIPE_DOWN: {
      let grid = [...state.grid];
      grid = game.merge(grid, 'DOWN');
      grid = game.addRandomNumber(grid);
      return {...state, grid}
    }
    default:
      return {...state};
  }
}
