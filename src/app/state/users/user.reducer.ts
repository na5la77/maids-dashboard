import {createReducer, on} from '@ngrx/store';
import {User} from '../../core/models/user.model';
import {
  addUser,
  loadUsers,
  loadUsersFailure,
  loadUsersSuccess,
  removeUser,
} from './user.actions';
import {AppStatusEnum} from '../../core/models/enums/app-status.enum';

export interface UserState {
  users: Map<number, User[]>;
  error: string | null;
  status: AppStatusEnum;
  totalUsers: number;

}

export const initialState: UserState = {
  users: new Map<number, User[]>(), 
  error: null,
  status: AppStatusEnum.pending,
  totalUsers: 0
};

export const userReducer = createReducer(
  initialState,

  on(loadUsers, (state) => ({...state, status: AppStatusEnum.loading})),

  on(loadUsersSuccess, (state, { users, page }) => ({
    ...state,
    users: new Map(state.users).set(page, users),
    error: null,
    status: AppStatusEnum.success,
  })),
  on(loadUsersFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: AppStatusEnum.error,
  }))
);
