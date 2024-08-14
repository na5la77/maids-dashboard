import {createSelector} from '@ngrx/store';
import {UserState} from './user.reducer';
import {AppState} from "../app.state";

export const selectUserState = (state: AppState) => state.users;

export const selectTestContent = createSelector(
  selectUserState,
  (state: UserState) => state.testText
);
