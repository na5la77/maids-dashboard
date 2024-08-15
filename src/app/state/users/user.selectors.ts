import {createSelector} from '@ngrx/store';
import {UserState} from './user.reducer';
import {AppState} from '../app.state';
import {User} from '../../core/models/user.model';

export const selectUsers = (state: AppState) => state.users;

export const selectUsersMap = createSelector(
  selectUsers,
  (state: UserState) => state.users,
);

export const selectAllUsers = createSelector(
  selectUsersMap,
  (usersMap: Map<number, User[]>) => Array.from(usersMap.values()).flat(),
);
export const selectUserError = createSelector(
  selectUsers,
  (state: UserState) => state.error,
);
export const selectUserStatus = createSelector(
  selectUsers,
  (state: UserState) => state.status,
);
