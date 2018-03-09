import { Action, ActionReducer } from '@ngrx/store';
import * as actions from './app.actions';
import * as game from '../lib/game';

interface State {
  grid: Number[];
  points: number;
  gameover: any;
}

const initState: State = {
  grid: game.setupInitialCells(),
  points: 0,
  gameover: null,
};

export const appReducer: ActionReducer<State, Action> = (state: State = initState, action: Action) => {
  switch(action.type) {
    case actions.NEW_GAME: {
      return initState;
    }
    case actions.SWIPE_LEFT: {
      let grid = [...state.grid];
      grid = game.merge(grid, 'LEFT');
      let points = state.points + game.getRoundScore(grid, state.grid);
      if (!game.doGridsMatch(grid, state.grid)) {
        grid = game.addRandomNumber(grid);
      }
      let gameover = game.getEndGameState(grid);
      return {...state, grid, points, gameover};
    }
    case actions.SWIPE_RIGHT: {
      let grid = [...state.grid];
      grid = game.merge(grid, 'RIGHT');
      let points = state.points + game.getRoundScore(grid, state.grid);
      if (!game.doGridsMatch(grid, state.grid)) {
        grid = game.addRandomNumber(grid);
      }
      let gameover = game.getEndGameState(grid);
      return {...state, grid, points, gameover};
    }
    case actions.SWIPE_UP: {
      let grid = [...state.grid];
      grid = game.merge(grid, 'UP');
      let points = state.points + game.getRoundScore(grid, state.grid);
      if (!game.doGridsMatch(grid, state.grid)) {
        grid = game.addRandomNumber(grid);
      }
      let gameover = game.getEndGameState(grid);
      return {...state, grid, points, gameover};
    }
    case actions.SWIPE_DOWN: {
      let grid = [...state.grid];
      grid = game.merge(grid, 'DOWN');
      let points = state.points + game.getRoundScore(grid, state.grid);
      if (!game.doGridsMatch(grid, state.grid)) {
        grid = game.addRandomNumber(grid);
      }
      let gameover = game.getEndGameState(grid);
      return {...state, grid, points, gameover};
    }
    default:
      return {...state};
  }
}
