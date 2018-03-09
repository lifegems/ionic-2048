import { Action } from '@ngrx/store';

export const SWIPE_LEFT  = '[App] Swipe Left';
export const SWIPE_RIGHT = '[App] Swipe Right';
export const SWIPE_UP    = '[App] Swipe Up';
export const SWIPE_DOWN  = '[App] Swipe Down';
export const NEW_GAME    = '[App] New Game';

export class SwipeLeftAction implements Action {
  public type = SWIPE_LEFT;
}

export class SwipeRightAction implements Action {
  public type = SWIPE_RIGHT;
}

export class SwipeUpAction implements Action {
  public type = SWIPE_UP;
}

export class SwipeDownAction implements Action {
  public type = SWIPE_DOWN;
}

export class NewGameAction implements Action {
  public type = NEW_GAME;
}
