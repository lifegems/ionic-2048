import { Action, ActionReducer } from '@ngrx/store';
import * as actions from './app.actions';
import * as game from '../lib/game';
import { Game2048, Direction } from '../lib/game2048';

interface State {
  grid: Array<number>;
  points: number;
  gameover: any;
}

// let MyGame: Game2048 = new Game2048();
// MyGame.newGame();

const initState: State = {
  grid: game.setupInitialCells(), // MyGame.getGridArray(),
  points: 0,
  gameover: null,
};


export const appReducer: ActionReducer<State, Action> = (state: State = initState, action: Action) => {
  switch(action.type) {
    case actions.NEW_GAME: {
      return initState;
    }
    case actions.SWIPE_LEFT: {
      // MyGame.merge(Direction.Left);
      // let grid = MyGame.getGridArray();
      // return {...state, grid};
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
      // MyGame.merge(Direction.Right);
      // let grid = MyGame.getGridArray();
      // return {...state, grid};
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
      // MyGame.merge(Direction.Up);
      // let grid = MyGame.getGridArray();
      // return {...state, grid};
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
      // MyGame.merge(Direction.Down);
      // let grid = MyGame.getGridArray();
      // return {...state, grid};
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
