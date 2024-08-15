import {createAction, props} from '@ngrx/store';
import {User} from '../../core/models/user.model';

export const addUser = createAction(
  '[Users Page] Add User',
  props<{ content: User }>()
);
export const removeUser = createAction(
  '[User Page] Remove User',
  props<{ id: number }>()
);
export const loadUsers = createAction(
  '[User Page] Load Users',
  props<{ page: number }>()
);

export const loadUsersSuccess = createAction(
  '[Users API] Users Loaded Successfully',
  props<{ users: User[], page: number }>()
);

export const loadUsersFailure = createAction(
  '[User API] Users Failed to Load',
  props<{ error: string }>()
);
