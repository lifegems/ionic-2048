import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { appReducer } from './app.reducer';

export interface State {

}

export const reducers: ActionReducerMap<State> = {
  app: appReducer
};


export const metaReducers: MetaReducer<State>[] = [];
