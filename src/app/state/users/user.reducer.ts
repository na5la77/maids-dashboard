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
  users: User[];
  error: string | null;
  status: AppStatusEnum;
}

export const initialState: UserState = {
  users: [],
  error: null,
  status: AppStatusEnum.pending,
};

export const userReducer = createReducer(
  initialState,
  on(addUser, (state, {content}) => ({
    ...state,
    users: [
      ...state.users,
      {
        id: content.id,
        first_name: content.first_name,
        email: content.email,
        last_name: content.last_name,
        avatar: content.avatar,
      },
    ],
  })),
  on(removeUser, (state, {id}) => ({
    ...state,
    users: state.users.filter((user) => user.id !== id),
  })),

  on(loadUsers, (state) => ({...state, status: AppStatusEnum.loading})),

  on(loadUsersSuccess, (state, {users}) => ({
    ...state,
    users: users,
    error: null,
    status: AppStatusEnum.success,
  })),
  on(loadUsersFailure, (state, {error}) => ({
    ...state,
    error: error,
    status: AppStatusEnum.error,
  }))
);
